import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
// import { store } from "./app/store";
import { Provider } from "react-redux";
import "animate.css";
import { CookiesProvider } from "react-cookie";
import store from "./apps/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
);
