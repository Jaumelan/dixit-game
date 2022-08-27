import { AuthContextProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import RoutesConfig from "./routes";
import "./App.css";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <RoutesConfig />
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
