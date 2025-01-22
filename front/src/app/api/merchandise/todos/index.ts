import { NextApiRequest, NextApiResponse } from "next";
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
    firestoreId: string; // Added this line
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

export default async (req: NextApiRequest, res: NextApiResponse) => {
    let todosDB: Todo[] = await retrieveTodosDB();

    const todoData = req.body as Partial<Todo>;

    if (req.method === "POST") {
        if (typeof todoData.text !== "string") {
            return res.status(400).json({ error: "Invalid todo text" });
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

        return res.status(201).json(createdTodo);
    }

    if (req.method === "GET") {
        return res.status(200).json(todosDB.filter(({ active }) => active));
    }

    if (req.method === "PUT") {
        const { id, text, active, done } = todoData;

        if (typeof id !== "number") {
            return res.status(400).json({ error: "Invalid todo id" });
        }

        const todoIndex = todosDB.findIndex((todo) => todo.id === id);
        if (todoIndex === -1) {
            return res.status(404).json({ error: "Todo not found" });
        }

        const updatedTodo = { ...todosDB[todoIndex], ...todoData };
        todosDB[todoIndex] = updatedTodo;

        const todoDoc = doc(db, "todos", updatedTodo.firestoreId);
        await updateDoc(todoDoc, { text, active, done });

        return res.status(200).json(updatedTodo);
    }

    if (req.method === "DELETE") {
        const { id } = todoData;

        if (typeof id !== "number") {
            return res.status(400).json({ error: "Invalid todo id" });
        }

        const todoIndex = todosDB.findIndex((todo) => todo.id === id);
        if (todoIndex === -1) {
            return res.status(404).json({ error: "Todo not found" });
        }

        const todoToDelete = todosDB[todoIndex];
        todosDB.splice(todoIndex, 1);

        const todoDoc = doc(db, "todos", todoToDelete.firestoreId);
        await deleteDoc(todoDoc);

        return res.status(200).json({ message: "Todo deleted successfully" });
    }

    return res.status(405).json({ error: "Method not allowed" });
};
