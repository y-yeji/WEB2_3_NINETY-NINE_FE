import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import Modal from "./components/ui/Modal";
import { useAuthStore } from "./stores/authStore";
import { useEffect } from "react";

function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <BrowserRouter>
      <Router />
      <Modal />
    </BrowserRouter>
  );
}

export default App;
