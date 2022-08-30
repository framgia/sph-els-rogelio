import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.min.css";
import App from "./pages/App";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { store } from "./store/store";
import { Provider } from "react-redux";
import Auth from "./pages/components/auth/Auth";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth>
        <Provider store={store}>
          <App />
        </Provider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Auth>
    </BrowserRouter>
  </React.StrictMode>
);
