import { NextRequest, NextResponse } from "next/server";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/merchandise/database/firebaseStorage";
import { retrieveTodosDB } from "../index/route";

export async function handler(req: NextRequest) {
	const todosDB = await retrieveTodosDB();
	const todoData = await req.json();
	const { id, text, active, done } = todoData || {};

	if (req.method === "POST") {
		return NextResponse.json(
			{ error: "Method Not Implemented" },
			{ status: 405 }
		);
	}

	if (req.method === "GET") {
		if (!id) {
			return NextResponse.json(
				{ error: "Missing 'id' parameter" },
				{ status: 400 }
			);
		}

		const todo = todosDB.find((todo) => todo.id === Number(id));
		if (!todo) {
			return NextResponse.json(
				{ error: "Todo not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json(todo, { status: 200 });
	}

	if (req.method === "PUT") {
		if (!id || !text || active === undefined || done === undefined) {
			return NextResponse.json(
				{ error: "Missing required fields in request body" },
				{ status: 400 }
			);
		}

		const todoUpdate = { id, text, active, done };
		const todoRef = doc(db, "todos", String(id));

		await updateDoc(todoRef, todoUpdate);

		const updatedTodos = todosDB.map((todo) =>
			todo.id === Number(id)
				? {
						...todo,
						...todoUpdate,
					}
				: todo
		);

		return NextResponse.json(
			{
				message: "Todo updated successfully",
				updatedTodo: todoUpdate,
				todos: updatedTodos,
			},
			{ status: 200 }
		);
	}

	if (req.method === "DELETE") {
		if (!id || !text) {
			return NextResponse.json(
				{ error: "Missing 'id' or 'text' parameter" },
				{ status: 400 }
			);
		}

		await deleteDoc(doc(db, "todos", String(id)));

		return NextResponse.json(
			{ message: `Todo with id '${id}' successfully deleted` },
			{ status: 200 }
		);
	}

	return NextResponse.json(
		{ error: `Method ${req.method} Not Allowed` },
		{ status: 405 }
	);
}

export const config = {
	api: {
		bodyParser: false,
	},
};
