interface IDBKeyval {
    get<T>(key: IDBValidKey): Promise<T | undefined>;
    set<T>(key: IDBValidKey, value: T): Promise<void>;
    delete(key: IDBValidKey): Promise<void>;
}

export const idbKeyval: IDBKeyval = (() => {
    let dbInstance: Promise<IDBDatabase> | null = null;

    function getDB(): Promise<IDBDatabase> {
        if (dbInstance) return dbInstance;

        dbInstance = new Promise((resolve, reject) => {
            const openreq = indexedDB.open("svgo-keyval", 1);

            openreq.onerror = () => reject(openreq.error);

            openreq.onupgradeneeded = () => {
                const db = openreq.result;
                db.createObjectStore("keyval");
            };

            openreq.onsuccess = () => resolve(openreq.result);
        });

        return dbInstance;
    }

    async function withStore<T>(
        type: IDBTransactionMode,
        callback: (store: IDBObjectStore) => Promise<T>
    ): Promise<T> {
        const db = await getDB();
        return new Promise<T>((resolve, reject) => {
            const transaction = db.transaction("keyval", type);
            transaction.oncomplete = () => resolve(undefined as unknown as T);
            transaction.onerror = () => reject(transaction.error);
            const store = transaction.objectStore("keyval");
            callback(store).then(resolve).catch(reject);
        });
    }

    return {
        async get<T>(key: IDBValidKey): Promise<T | undefined> {
            return withStore<T | undefined>("readonly", (store) => {
                return new Promise<T | undefined>((resolve, reject) => {
                    const request = store.get(key);
                    request.onsuccess = () =>
                        resolve(request.result as T | undefined);
                    request.onerror = () => reject(request.error);
                });
            });
        },
        async set<T>(key: IDBValidKey, value: T): Promise<void> {
            return withStore<void>("readwrite", (store) => {
                return new Promise<void>((resolve, reject) => {
                    const request = store.put(value, key);
                    request.onsuccess = () => resolve();
                    request.onerror = () => reject(request.error);
                });
            });
        },
        async delete(key: IDBValidKey): Promise<void> {
            return withStore<void>("readwrite", (store) => {
                return new Promise<void>((resolve, reject) => {
                    const request = store.delete(key);
                    request.onsuccess = () => resolve();
                    request.onerror = () => reject(request.error);
                });
            });
        },
    };
})();

export default idbKeyval;
