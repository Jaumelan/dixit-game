import { useState } from "react";
import BoxInitialBody from "../HomeInitial";
import { UserAuth } from "../../context/AuthContext";
import EnterGameSession from "../EnterGameSession";
import SetGame from "../SetGame";
import { useSnackbar } from "notistack";

const BoxBody = () => {
  const { user } = UserAuth();
  const [createGame, setCreateGame] = useState(false);
  const [joinGame, setJoinGame] = useState(false);
  const [gameId, setGameId] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleCreateGame = async () => {
    try {
      if (user) {
        const response = await fetch(
          `http://68.232.175.134:8080/room/${user.email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": user?.accessToken,
            },
          }
        );
        const res = await response.json();
        if (res.messages.length > 0) {
          if (res.messages[0] === "Invalid token") {
            enqueueSnackbar("Faça login, sessão expirada", {
              variant: "error",
            });
            return;
          }
        }
        const id = res.data.toString();
        //console.log('id do server', id);
        setGameId(() => id);

        setCreateGame((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleJoinGame = () => {
    setJoinGame((prev) => !prev);
  };

  return createGame ? (
    <SetGame close={handleCreateGame} gameID={gameId} />
  ) : joinGame ? (
    <EnterGameSession close={handleJoinGame} />
  ) : (
    <BoxInitialBody
      createGameModal={handleCreateGame}
      joinGameModal={handleJoinGame}
    />
  );
};

export default BoxBody;
