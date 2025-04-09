// src/middleware/indexedDBSyncMiddleware.ts
import { Middleware} from "redux";
import { saveAllComponents } from "../services/indexedDBservice";
import { RootState } from "../store/store";

const indexedDBSyncMiddleware: Middleware = (store) => (next) => (action) => {
    const result = next(action);
  
    const state = store.getState() as RootState;
  
    if (state.Components && state.Components.loaded) {
      saveAllComponents(state.Components.Components).catch((error) =>
        console.error("Error IndexedDB :", error)
      );
    }
  
    return result;
  };
  
  export default indexedDBSyncMiddleware;