import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import "./assets/css/master.css";
import Loader from "./components/common/loader/loader.tsx";
import "./index.scss";
import AppRoutes from "./routes/index.tsx";

export const BASE_URL: string = import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.Fragment>
    <Toaster position="top-right" reverseOrder={false} />
    <BrowserRouter>
      <React.Suspense fallback={<Loader />}>
        <AppRoutes />
      </React.Suspense>
    </BrowserRouter>
  </React.Fragment>
);
