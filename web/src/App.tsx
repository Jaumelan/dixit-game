import { AuthContextProvider } from "./context/AuthContext";
import { GameContextProvider } from "./context/GameContext";
import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "./assets/styles/global";
import RoutesConfig from "./routes";
//import "./App.css";

function App() {
  return (
    <>
      <GlobalStyle />
      <AuthContextProvider>
        <GameContextProvider>
          <BrowserRouter>
            <RoutesConfig />
          </BrowserRouter>
        </GameContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
