import { useState, useEffect } from "react";
import Loading from "../Loading";
//import { useSnackbar } from "notistack";

const EnterGameSession = () => {
  const [gameSessions, setGameSessions] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  //const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getGameSessions = async () => {
      try {
        const response = await fetch("http://localhost:8080/game/availables");
        const res = await response.json();
        console.log(res);
        if (res.data.length === 0) {
          setError("Nenhuma sessão disponível, para jogar crie uma sala");
        } else {
          setGameSessions(() => res.data);
          //setIsLoading((prev) => !prev);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getGameSessions();
  }, []);

  useEffect(() => {
    if (gameSessions.length > 0) {
      setIsLoading(false);
    }
  }, [gameSessions]);

  /*const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const response = await fetch("/api/game-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gameSessionId }),
    });
    const data = await response.json();
    if (response.ok) {
      setIsSuccess(true);
      enqueueSnackbar("Game session created!", {
        variant: "success",
        autoHideDuration: 2000,
      });
    } else {
      setError(data.message);
    }
    setIsLoading(false);
  };
  */

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        gameSessions.map((gameSession) => (
          <div key={gameSession}>
            <h3>Sala {gameSession}</h3>
            <button>Entrar</button>
          </div>
        ))
      )}
    </div>
  );
};

export default EnterGameSession;
