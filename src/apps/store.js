import { configureStore, combineReducers } from "@reduxjs/toolkit";
import user from "./features/userSlice";
import cart from "./features/cartSlice";
import products from "./features/productSlice";
import { api } from "./services/api";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [api.reducerPath],
};

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  user,
  cart,
  products,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware().concat(api.middleware),
    getDefaultMiddleware({
      ...api.middleware,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
