// utils/indexedDB.ts
// const DB_NAME = "GaugeChartDB";
// const DB_STORE_NAME = "sliderValues";

// export interface SliderValues {
//     id: string; // Add an ID for each saved set of values
//     artValue: number;
//     metaverseValue: number;
//     musicValue: number;
//     collectiblesValue: number;
//     pfpValue: number;
// }

// export const openDB = (): Promise<IDBDatabase> => {
//     return new Promise((resolve, reject) => {
//         const request = indexedDB.open(DB_NAME, 1);

//         request.onupgradeneeded = (event) => {
//             const db = (event.target as IDBOpenDBRequest).result;
//             db.createObjectStore(DB_STORE_NAME, { keyPath: "id" });
//         };

//         request.onsuccess = (event) => {
//             resolve((event.target as IDBOpenDBRequest).result);
//         };

//         request.onerror = (event) => {
//             reject((event.target as IDBOpenDBRequest).error);
//         };
//     });
// };

// export const saveValues = async (values: SliderValues): Promise<void> => {
//     const db = await openDB();
//     const transaction = db.transaction(DB_STORE_NAME, "readwrite");
//     const store = transaction.objectStore(DB_STORE_NAME);
//     store.put(values);

//     return new Promise((resolve, reject) => {
//         transaction.oncomplete = () => resolve();
//         transaction.onerror = () => reject(transaction.error);
//     });
// };

// export const loadValues = async (
//     id: string
// ): Promise<SliderValues | undefined> => {
//     const db = await openDB();
//     const transaction = db.transaction(DB_STORE_NAME, "readonly");
//     const store = transaction.objectStore(DB_STORE_NAME);
//     const request = store.get(id);

//     return new Promise((resolve, reject) => {
//         request.onsuccess = (event) => {
//             resolve((event.target as IDBRequest<SliderValues>).result);
//         };
//         request.onerror = (event) => {
//             reject((event.target as IDBRequest).error);
//         };
//     });
// };

// export const getAllValues = async (): Promise<SliderValues[]> => {
//     const db = await openDB();
//     const transaction = db.transaction(DB_STORE_NAME, "readonly");
//     const store = transaction.objectStore(DB_STORE_NAME);
//     const request = store.getAll();

//     return new Promise((resolve, reject) => {
//         request.onsuccess = (event) => {
//             resolve((event.target as IDBRequest<SliderValues[]>).result);
//         };
//         request.onerror = (event) => {
//             reject((event.target as IDBRequest).error);
//         };
//     });
// };

// // utils/indexedDB.ts

// const DB_NAME = "GaugeChartDB";
// const DB_STORE_NAME = "sliderValues";

// export interface SliderValues {
//     artValue: number;
//     metaverseValue: number;
//     musicValue: number;
//     collectiblesValue: number;
//     pfpValue: number;
// }

// export const openDB = (): Promise<IDBDatabase> => {
//     return new Promise((resolve, reject) => {
//         const request = indexedDB.open(DB_NAME, 1);

//         request.onupgradeneeded = (event) => {
//             const db = (event.target as IDBOpenDBRequest).result;
//             db.createObjectStore(DB_STORE_NAME, { keyPath: "id" });
//         };

//         request.onsuccess = (event) => {
//             resolve((event.target as IDBOpenDBRequest).result);
//         };

//         request.onerror = (event) => {
//             reject((event.target as IDBOpenDBRequest).error);
//         };
//     });
// };

// export const saveValues = async (values: SliderValues): Promise<void> => {
//     const db = await openDB();
//     const transaction = db.transaction(DB_STORE_NAME, "readwrite");
//     const store = transaction.objectStore(DB_STORE_NAME);
//     store.put({ id: 1, values });

//     return new Promise((resolve, reject) => {
//         transaction.oncomplete = () => resolve();
//         transaction.onerror = () => reject(transaction.error);
//     });
// };

// export const loadValues = async (): Promise<SliderValues | undefined> => {
//     const db = await openDB();
//     const transaction = db.transaction(DB_STORE_NAME, "readonly");
//     const store = transaction.objectStore(DB_STORE_NAME);
//     const request = store.get(1);

//     return new Promise((resolve, reject) => {
//         request.onsuccess = (event) => {
//             resolve(
//                 (event.target as IDBRequest<{ values: SliderValues }>).result
//                     ?.values
//             );
//         };
//         request.onerror = (event) => {
//             reject((event.target as IDBRequest).error);
//         };
//     });
// };

const DB_NAME = "GaugeChartDB";
const DB_STORE_NAME = "portfolioValues";

export interface PortfolioValues {
    artValue: number;
    metaverseValue: number;
    musicValue: number;
    collectiblesValue: number;
    pfpValue: number;
}

export const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            db.createObjectStore(DB_STORE_NAME, { keyPath: "id" });
        };

        request.onsuccess = (event) => {
            resolve((event.target as IDBOpenDBRequest).result);
        };

        request.onerror = (event) => {
            reject((event.target as IDBOpenDBRequest).error);
        };
    });
};

export const saveValues = async (values: PortfolioValues): Promise<void> => {
    const db = await openDB();
    const transaction = db.transaction(DB_STORE_NAME, "readwrite");
    const store = transaction.objectStore(DB_STORE_NAME);
    store.put({ id: 1, ...values });

    return new Promise((resolve, reject) => {
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
    });
};

export const loadValues = async (): Promise<PortfolioValues | undefined> => {
    const db = await openDB();
    const transaction = db.transaction(DB_STORE_NAME, "readonly");
    const store = transaction.objectStore(DB_STORE_NAME);
    const request = store.get(1);

    return new Promise((resolve, reject) => {
        request.onsuccess = (event) => {
            resolve((event.target as IDBRequest<PortfolioValues>).result);
        };
        request.onerror = (event) => {
            reject((event.target as IDBRequest).error);
        };
    });
};
