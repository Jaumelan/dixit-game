import { AuthContextProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "./assets/styles/global";
import RoutesConfig from "./routes";
//import "./App.css";

function App() {
  return (
    <>
    <GlobalStyle />
    <AuthContextProvider>
      <BrowserRouter>
        <RoutesConfig />
      </BrowserRouter>
    </AuthContextProvider>
    </>
    
  );
}

export default App;
