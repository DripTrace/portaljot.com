import { NextRequest, NextResponse } from "next/server";
import {
	collection,
	addDoc,
	updateDoc,
	deleteDoc,
	doc,
	getDocs,
} from "firebase/firestore";
import { db } from "@/lib/merchandise/database/firebaseStorage";

interface Todo {
	id: number;
	text: string;
	active: boolean;
	done: boolean;
	firestoreId: string;
}

export type textValue = string;

export interface Text {
	stringValue: textValue;
}

export interface TodosDoc {
	name?: string;
	fields?: { text: Text };
	createdTime?: string;
	updateTime?: string;
}

export const retrieveTodosDB = async (): Promise<Todo[]> => {
	const todosCollection = collection(db, "todos");
	const todosSnapshot = await getDocs(todosCollection);

	return todosSnapshot.docs.map((doc, index) => {
		const data = doc.data();
		return {
			id: index + 1,
			text: data.text,
			active: data.active,
			done: data.done,
			firestoreId: doc.id,
		} as Todo;
	});
};

export async function handler(req: NextRequest): Promise<NextResponse> {
	const todosDB: Todo[] = await retrieveTodosDB();

	if (req.method === "POST") {
		const todoData = await req.json();

		if (typeof todoData.text !== "string") {
			return NextResponse.json(
				{ error: "Invalid todo text" },
				{ status: 400 }
			);
		}

		const newTodo: Omit<Todo, "firestoreId"> = {
			id: todosDB.length + 1,
			text: todoData.text,
			active: true,
			done: false,
		};

		const docRef = await addDoc(collection(db, "todos"), newTodo);
		const createdTodo: Todo = { ...newTodo, firestoreId: docRef.id };
		todosDB.push(createdTodo);

		return NextResponse.json(createdTodo, { status: 201 });
	}

	if (req.method === "GET") {
		const activeTodos = todosDB.filter(({ active }) => active);
		return NextResponse.json(activeTodos, { status: 200 });
	}

	if (req.method === "PUT") {
		const todoData = await req.json();
		const { id, text, active, done } = todoData;

		if (typeof id !== "number") {
			return NextResponse.json(
				{ error: "Invalid todo id" },
				{ status: 400 }
			);
		}

		const todoIndex = todosDB.findIndex((todo) => todo.id === id);
		if (todoIndex === -1) {
			return NextResponse.json(
				{ error: "Todo not found" },
				{ status: 404 }
			);
		}

		const updatedTodo = { ...todosDB[todoIndex], ...todoData };
		todosDB[todoIndex] = updatedTodo;

		const todoDoc = doc(db, "todos", updatedTodo.firestoreId);
		await updateDoc(todoDoc, { text, active, done });

		return NextResponse.json(updatedTodo, { status: 200 });
	}

	if (req.method === "DELETE") {
		const todoData = await req.json();
		const { id } = todoData;

		if (typeof id !== "number") {
			return NextResponse.json(
				{ error: "Invalid todo id" },
				{ status: 400 }
			);
		}

		const todoIndex = todosDB.findIndex((todo) => todo.id === id);
		if (todoIndex === -1) {
			return NextResponse.json(
				{ error: "Todo not found" },
				{ status: 404 }
			);
		}

		const todoToDelete = todosDB[todoIndex];
		todosDB.splice(todoIndex, 1);

		const todoDoc = doc(db, "todos", todoToDelete.firestoreId);
		await deleteDoc(todoDoc);

		return NextResponse.json(
			{ message: "Todo deleted successfully" },
			{ status: 200 }
		);
	}

	return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export const config = {
	api: {
		bodyParser: false,
	},
};
