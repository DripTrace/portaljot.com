import { NextApiRequest, NextApiResponse } from "next";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { retrieveTodosDB } from ".";
import { db } from "@/lib/merchandise/database/firebaseStorage";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    let [...todosDB] = await retrieveTodosDB();
    const todoData = req.body;
    const { id, text, active, done } = todoData;

    if (req.method === "POST") {
    }

    if (req.method === "GET") {
        return res
            .status(201)
            .json(todosDB.find((todo) => todo.id === parseInt(id)));
    }

    if (req.method === "PUT") {
        const todoUpdate = {
            id,
            text,
            active,
            done,
        };

        const todoRef = doc(db, "todos", id);

        await updateDoc(todoRef, {
            todoUpdate,
        });

        todosDB = todosDB.map((todo) =>
            todo.id === parseInt(id)
                ? {
                      ...todo,
                  }
                : todo
        );

        return res.status(201).json(todoUpdate);
    }

    if (req.method === "DELETE") {
        await deleteDoc(doc(db, text, id));
    }
};
