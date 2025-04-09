import { Component } from "../store/slices/ComponentsSlice";


export function openDatabase() {
    return new Promise((resolve, reject) => {
      const request:IDBOpenDBRequest = indexedDB.open("MyAppDatabase", 2); 
      request.onupgradeneeded = (_event:IDBVersionChangeEvent) => {
        const db = request.result as IDBDatabase;
        if (!db.objectStoreNames.contains("components")) {
          const store = db.createObjectStore("components", { keyPath: "id" });
            store.createIndex("left", "left", { unique: false });
            store.createIndex("top", "top", { unique: false });
            store.createIndex("content", "content", { unique: false });
            store.createIndex("counter", "counter", { unique: false });
            store.createIndex("path", "path", { unique: false });
            store.createIndex("color", "color", { unique: false });
            store.createIndex("name", "name", { unique: false });
            store.createIndex("type", "type", { unique: false });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  

  export function saveAllComponents(components: Component[]): Promise<void> {
    return openDatabase().then((db) => {
      return new Promise<void>((resolve, reject) => {
        const database = db as IDBDatabase; 
        const transaction: IDBTransaction = database.transaction("components", "readwrite");
        const store: IDBObjectStore = transaction.objectStore("components");
  
        const clearRequest: IDBRequest<undefined> = store.clear();
        clearRequest.onsuccess = () => {
          if (components.length === 0) {
            resolve();
            return;
          }
  
          let count = 0;
          components.forEach((component) => {
            const addRequest = store.put(component);
            addRequest.onsuccess = () => {
              count++;
              if (count === components.length) resolve();
            };
            addRequest.onerror = () => reject(addRequest.error);
          });
        };
  
        clearRequest.onerror = () => reject(clearRequest.error);
        transaction.oncomplete = () => database.close();
      });
    });
  }
  

  export function getAllComponents(): Promise<Component[]> {
    return openDatabase().then((db) => {
      return new Promise<Component[]>((resolve, reject) => {
        const database = db as IDBDatabase; 
        const transaction: IDBTransaction = database.transaction("components", "readonly");
        const store: IDBObjectStore = transaction.objectStore("components");
  
        const request: IDBRequest<Component[]> = store.getAll();
  
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
  
        transaction.oncomplete = () => database.close();
      });
    });
  }