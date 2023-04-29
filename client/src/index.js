import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./state";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./state/api.js";

// Configure the Redux store with the global reducer and the middleware required for the API
const store = configureStore({
  reducer: {
    global: globalReducer, // The global state slice
    [api.reducerPath]: api.reducer, // The reducer for the API slice (required for RTK Query)
  },
  middleware: (getDefault) => getDefault().concat(api.middleware), // The middleware required for RTK Query
});

// Set up the listeners for RTK Query
setupListeners(store.dispatch);

// Create the root element for the React app
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the app with the Redux store and wrapped in a Provider component
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
