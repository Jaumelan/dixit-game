import { AuthContextProvider } from "./context/AuthContext";
import { GameContextProvider } from "./context/GameContext";
import { PlayContextProvider } from "./context/PlayContext";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import GlobalStyle from "./assets/styles/global";
import RoutesConfig from "./routes";

//import "./App.css";

function App() {
  return (
    <>
      <GlobalStyle />
      <SnackbarProvider
        maxSnack={3}
        preventDuplicate
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <AuthContextProvider>
          <GameContextProvider>
            <PlayContextProvider>
              <BrowserRouter>
                <RoutesConfig />
              </BrowserRouter>
            </PlayContextProvider>
          </GameContextProvider>
        </AuthContextProvider>
      </SnackbarProvider>
    </>
  );
}

export default App;
