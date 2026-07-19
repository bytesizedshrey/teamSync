import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import AppRoutes from "./app/routes/AppRoutes.jsx";
import {store} from './app/store.js'


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  </StrictMode>,
);
