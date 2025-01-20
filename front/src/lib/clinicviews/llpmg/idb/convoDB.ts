
import { openDB, IDBPDatabase } from "idb";

interface Conversation {
  id?: number;
  transcript: string;
  audioUrl: string | null;
  date: Date;
}

let dbPromise: Promise<IDBPDatabase>;

export const initDB = async () => {
  if (!dbPromise) {
    dbPromise = openDB("LLPMGDB", 1, {
      upgrade(db) {
        db.createObjectStore("conversations", {
          keyPath: "id",
          autoIncrement: true,
        });
      },
    });
  }
  return dbPromise;
};

export const saveConversation = async (conversation: Conversation) => {
  const db = await initDB();
  await db.put("conversations", conversation);
};

export const getConversations = async (): Promise<Conversation[]> => {
  const db = await initDB();
  return await db.getAll("conversations");
};

