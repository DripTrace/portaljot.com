import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { ChatAnthropic } from "@langchain/anthropic";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import pineconeClient from "./pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { PineconeConflictError } from "@pinecone-database/pinecone/dist/errors";
import { Index, RecordMetadata } from "@pinecone-database/pinecone";
import { adminDb } from "../../firebaseAdmin";
import { auth } from "@clerk/nextjs/server";

const model = new ChatOpenAI({
	apiKey: process.env.OPENAI_API_KEY,
	modelName: "gpt-4o-mini",
	// temperature: 0.5,
});

const llm = new ChatAnthropic({
	apiKey: process.env.ANTHROPIC_API_KEY,
	modelName: "claude-3-5-sonnet-20240620",
	temperature: 0.5,
});

export const indexName = "docspure";

async function fetchMessagesFromDB(docId: string) {
	const { userId } = await auth();
	if (!userId) {
		throw new Error("User not found");
	}

	console.log("--- Fetching chat history from Firebase . . . ---");
	// const LIMIT = 6;
	const chats = await adminDb
		.collection(`users`)
		.doc(userId)
		.collection("files")
		.doc(docId)
		.collection("chat")
		.orderBy("createdAt", "desc")
		// .limit(LIMIT)
		.get();

	console.log("fetch results:", chats.docs[0].data());

	const chatHistory = chats.docs.map((doc) =>
		doc.data().role === "human"
			? new HumanMessage(doc.data().message)
			: new AIMessage(doc.data().message)
	);

	console.log(
		`--- Chat history fetched successfully: ${chatHistory.length} recieved ---`
	);

	console.log(chatHistory.map((msg) => msg.content.toString()));

	return chatHistory;
}

export async function generateDocs(docId: string) {
	const { userId } = await auth();

	if (!userId) {
		throw new Error("User not found");
	}

	console.log("--- Fetching the download URL from Firebase . . . ---");
	const firebaseRef = await adminDb
		.collection("users")
		.doc(userId)
		.collection("files")
		.doc(docId)
		.get();

	const downloadUrl = firebaseRef.data()?.downloadUrl;

	if (!downloadUrl) {
		throw new Error("Download URL not found");
	}

	console.log(`--- Download URL fetched successfully: ${downloadUrl} ---`);

	const response = await fetch(downloadUrl);

	const data = await response.blob();

	console.log("--- Loading PDF document . . . ---");
	const loader = new PDFLoader(data);
	const docs = await loader.load();

	console.log("--- Splitting the document into smaller parts . . . ---");
	const splitter = new RecursiveCharacterTextSplitter();
	const splitDocs = await splitter.splitDocuments(docs);
	console.log(
		`--- Splitting complete, ${splitDocs.length} parts generated ---`
	);

	return splitDocs;
}

async function namespaceExists(
	index: Index<RecordMetadata>,
	namespace: string
) {
	if (namespace === null) throw new Error("No namespace value provided.");
	const { namespaces } = await index.describeIndexStats();
	// console.dir(namespaces, { depth: null });
	console.log("THE NAMESPACE: ", namespace);
	return namespaces?.[namespace] !== undefined;
}

export async function generateEmbeddingsInPineconeVectorStore(docId: string) {
	const { userId } = await auth();

	if (!userId) {
		throw new Error("User not found");
	}

	let pineconeVectorStore;

	// Generate embeddings (numerical representations) of the split documents
	console.log("--- Generating embeddings . . . ---");
	const embeddings = new OpenAIEmbeddings();

	const index = await pineconeClient.index(indexName);
	// console.log(`--- Index ${index} created successfully ---`);
	// console.dir(index, { depth: null });
	// console.log("INDEX: ", index);
	const namespaceAlreadyExists = await namespaceExists(index, docId);

	if (namespaceAlreadyExists) {
		console.log(
			`--- Namespace ${docId} already exists, reusing existing embeddings . . . ---`
		);

		pineconeVectorStore = await PineconeStore.fromExistingIndex(
			embeddings,
			{
				pineconeIndex: index,
				namespace: docId,
			}
		);

		return pineconeVectorStore;
	} else {
		// If the namespace does not exist, download the PDF from firestore via the stored Download URL & generate the embeddings and store them in the Pinecon vector store
		const splitDocs = await generateDocs(docId);

		console.log(
			`--- Storing the embeddings in namespace ${docId} in the ${indexName} Pincone vector store . . . ---`
		);

		pineconeVectorStore = await PineconeStore.fromDocuments(
			splitDocs,
			embeddings,
			{
				pineconeIndex: index,
				namespace: docId,
			}
		);

		return pineconeVectorStore;
	}
}

const generateLangchainCompletion = async (docId: string, question: string) => {
	let pineconeVectorStore;

	pineconeVectorStore = await generateEmbeddingsInPineconeVectorStore(docId);
	if (!pineconeVectorStore) {
		throw new Error("Pinecone vector store not found");
	}

	console.log("--- Creating a retriever . . . ---");
	const retriever = pineconeVectorStore.asRetriever();

	const chatHistory = await fetchMessagesFromDB(docId);
	console.log("CHAT HISTORY AFTER RETRIEVAL: ", chatHistory);

	console.log("--- Defining a prompt template . . . ---");
	const historyAwarePrompt = ChatPromptTemplate.fromMessages([
		...chatHistory,
		["user", "{input}"],
		[
			"user",
			"Given the above conversation, generate a search query to look up in order to get information relevant to the conversation",
		],
	]);

	console.log("--- Creating a history-aware retriever . . . ---");
	const historyAwareRetrieverChain = await createHistoryAwareRetriever({
		llm: model,
		retriever,
		rephrasePrompt: historyAwarePrompt,
	});

	console.log(
		"--- Defining a prompt template for answering questions . . . ---"
	);
	const historyAwareRetrievalPrompt = ChatPromptTemplate.fromMessages([
		[
			"system",
			"Answer the user's questions based on the below context:\n\n{context}",
		],
		...chatHistory,
		["user", "{input}"],
	]);

	console.log("--- Creating a document combining chain . . . ---");
	const historyAwareCombineDocsChain = await createStuffDocumentsChain({
		llm: model,
		prompt: historyAwareRetrievalPrompt,
	});

	console.log("--- Creating the main retrieval chain . . . ---");
	const conversationalRetrievalChain = await createRetrievalChain({
		retriever: historyAwareRetrieverChain,
		combineDocsChain: historyAwareCombineDocsChain,
	});

	console.log("CURRENT CHAT HISTORY: ", chatHistory);
	console.log("--- Running the chain with a sample conversation . . . ---");
	const reply = await conversationalRetrievalChain.invoke({
		chat_history: chatHistory,
		input: question,
	});

	console.log("THE REPLY: ", reply.answer);
	return reply.answer;
};

export { model, generateLangchainCompletion };
