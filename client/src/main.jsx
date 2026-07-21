import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

import App from "./App.jsx";
import "./index.css";

import { AuthProvider } from "./context/AuthContext.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <SocketProvider>

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1e293b",
            color: "#fff",
            border: "1px solid #334155",
          },
        }}
      />

      <App />

    </SocketProvider>
  </AuthProvider>
);