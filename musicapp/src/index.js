import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import songsReducers from "./Features/Songs";
import playlistReducers from "./Features/Playlist";
import triggerReducers from "./Features/Trigger";
import displayReducers from "./Features/Display";
import { BrowserRouter } from "react-router-dom";

const store = configureStore({
  reducer: {
    songs: songsReducers,
    playlist: playlistReducers,
    trigger: triggerReducers,
    display: displayReducers,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
