import { NextRequest, NextResponse } from "next/server";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { retrieveTodosDB } from ".";
import { db } from "@/lib/merchandise/database/firebaseStorage";

export async function handler(req: NextRequest, res: NextResponse) {
	const todosDB = await retrieveTodosDB();
	const todoData = await req.json();
	const { id, text, active, done } = todoData || {};

	if (req.method === "POST") {
		return res.status(405).text("Method Not Implemented");
	}

	if (req.method === "GET") {
		if (!id) {
			return res.status(400).json({ error: "Missing 'id' parameter" });
		}
		const todo = todosDB.find((todo) => todo.id === parseInt(id, 10));
		if (!todo) {
			return res.status(404).json({ error: "Todo not found" });
		}
		return res.status(200).json(todo);
	}

	if (req.method === "PUT") {
		if (!id || !text || active === undefined || done === undefined) {
			return res
				.status(400)
				.json({ error: "Missing required fields in request body" });
		}

		const todoUpdate = { id, text, active, done };
		const todoRef = doc(db, "todos", id);

		await updateDoc(todoRef, todoUpdate);

		const updatedTodos = todosDB.map((todo) =>
			todo.id === parseInt(id, 10)
				? {
						...todo,
						...todoUpdate,
					}
				: todo
		);

		return res.status(200).json({
			message: "Todo updated successfully",
			updatedTodo: todoUpdate,
			todos: updatedTodos,
		});
	}

	if (req.method === "DELETE") {
		if (!id || !text) {
			return res
				.status(400)
				.json({ error: "Missing 'id' or 'text' parameter" });
		}

		await deleteDoc(doc(db, "todos", id));

		return res
			.status(200)
			.json({ message: `Todo with id '${id}' successfully deleted` });
	}

	return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}

export const config = {
	api: {
		bodyParser: false,
	},
};
