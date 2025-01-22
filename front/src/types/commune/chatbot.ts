export interface Chatbot {
	id: number;
	name: string;
	created_at: string;
	clerk_user_id: string;
	chatbot_characteristics: ChatbotCharacteristic[];
	chat_sessions: ChatSession[];
}

export interface ChatbotCharacteristic {
	id: number;
	content: string;
	created_at: string;
}

export interface ChatSession {
	id: number;
	created_at: string;
	guest_id: string | null;
	messages: Message[];
}

export interface Message {
	id: number;
	content: string;
	created_at: string;
	chat_session_id: number;
	sender: "user" | "ai";
}

export interface GetChatbotsData {
	chatbotsList: Chatbot[];
}

export interface MessagesByChatSessionIdResponse {
	chat_sessions: {
		messages: Message[];
	};
}

export interface Guest {
	id: number;
	name: string;
	email: string;
	created_at: string;
}

export interface Message {
	id: number;
	chat_session_id: number;
	content: string;
	created_at: string;
	sender: "ai" | "user";
}

export interface GetChatbotsByUserData {
	chatbotsList: Chatbot[];
}

export interface GetChatbotsByUserDataVariables {
	clerk_user_id: string;
}

export interface GetChatbotByIdResponse {
	chatbots: Chatbot;
}

export interface InsertGuestResponse {
	insertGuests: {
		id: number;
	};
}

export interface InsertChatSessionResponse {
	insertChat_sessions: {
		id: number;
	};
}

export interface InsertMessageResponse {
	insertMessages: {
		id: number;
	};
}

export interface GetChatbotCharacteristicsVariables {
	chatbot_id: number;
}

// Define the type for the query response
export interface GetChatbotCharacteristicsResponse {
	chatbot_characteristics: ChatbotCharacteristic[];
}

export interface GetUserChatbotsVariables {
	userId: string;
}

export interface GetUserChatbotsResponse {
	chatbotsByUser: Chatbot[];
}

export interface GetChatSessionMessagesVariables {
	id: number;
}

export interface GetChatSessionMessagesResponse {
	chat_sessions: {
		id: number;
		created_at: string;
		messages: Message[];
		chatbots: {
			name: string;
		};
		guests: {
			name: string;
			email: string;
		};
	};
}
