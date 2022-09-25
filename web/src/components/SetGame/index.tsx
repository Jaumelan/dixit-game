import { FC, useState, useRef, useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Button, { BUTTON_TYPE_CLASSES } from "../Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { useGameContext } from "../../context/GameContext";
import { UserAuth } from "../../context/AuthContext";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import * as S from "./styles";

type SetGameProps = {
  close: () => void;
  gameID: string;
};

const BiggerTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: 14,
  },
}));

const SetGame: FC<SetGameProps> = ({ close, gameID }) => {
  const { user } = UserAuth();
  const { handleGameDataSetter, handlePlayerSetter, handleSendData } =
    useGameContext();
  const [selectFirst, setSelectFirst] = useState(false);
  const [selectedSecond, setSelectedSecond] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [game, setGame] = useState({
    id: gameID,
    numberOfPlayers: 3,
    pointsToWin: 0,
    turns: 0,
  });
  const refInput = useRef<HTMLInputElement>(null);
  const refInput2 = useRef<HTMLInputElement>(null);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleGameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "numberOfPlayers") {
      if (Number(value) < 3 || Number(value) > 5) {
        alert("Players must be between 3 and 5");
        setGame({ ...game, numberOfPlayers: 3 });
        return;
      }
      setGame({ ...game, [name]: Number(value) });
    }
  };

  /* useEffect(() => {
    if (game.id !== "") {
      console.log("game in context", game);
      handleGameSetter(game)
    }
  }, [game]); */

  const handleStartGame = async () => {
    const playersArray = [{ username: user?.username, email: user?.email }];
    for (let i = 0; i < game.numberOfPlayers; i++) {
      if (!playersArray[i]) {
        playersArray[i] = { username: "", email: "" };
      }
    }
    //console.log("playersArray", playersArray);
    const data = {
      ...game,
      players: playersArray,
      email: user?.email,
    };

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (user) {
        const response = await fetch(`http://localhost:8080/game/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": user?.accessToken,
          },
          body: JSON.stringify(data),
        });
        const res = await response.json();
        //console.log("res", res);
        if (res.messages.length > 0) {
          enqueueSnackbar(res.messages[0], { variant: "error" });
          return;
        }
        console.log("res.data", res.data);
        handleGameDataSetter({ ...data, cards: res.data.cardsSrc } as any);
        handlePlayerSetter("CREATOR");
        handleSendData(true);
        navigate(`/game/${game.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectType2 = () => {
    if (refInput2.current) {
      setSelectFirst(true);
      setSelectedSecond(false);
      refInput2.current.click();

      setGame({
        ...game,
        pointsToWin: Number(refInput2.current.value),
        turns: 0,
      });
    }
  };

  const handleSelectType = () => {
    if (refInput.current) {
      setSelectedSecond(true);
      setSelectFirst(false);
      refInput.current.click();

      setGame({
        ...game,
        turns: Number(refInput.current.value),
        pointsToWin: 0,
      });
    }
  };

  useEffect(() => {
    if (game.pointsToWin > 0 || game.turns > 0) {
      setDisableButton(false);
    }
  }, [game]);

  return (
    <S.Container>
      <S.TitleContainer>
        <h2>CONFIGURE O JOGO</h2>
        <AiOutlineCloseCircle
          size={28}
          style={{ cursor: "pointer" }}
          onClick={close}
        />
      </S.TitleContainer>
      <S.GameRoom>
        <h3>ID da Sala: {game.id}</h3>
      </S.GameRoom>
      <S.SettersContainer>
        <S.IndividualSetter>
          <S.PlayerNumberContainer>
            <S.TitleSetterContainer>
              <S.TitleSetter>Número do Jogadores</S.TitleSetter>
              <BiggerTooltip
                title="Escolha entre 3 e 5 jogadores"
                placement="right"
                arrow
              >
                <div>
                  <AiOutlineQuestionCircle
                    size={20}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </BiggerTooltip>
            </S.TitleSetterContainer>

            <Box
              sx={{ width: "100%", justifyContent: "center", display: "flex" }}
            >
              <TextField
                id="outlined-number"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                name="numberOfPlayers"
                value={game.numberOfPlayers}
                onChange={handleGameChange}
                inputRef={(input) => {
                  if (input) {
                    input.setAttribute("min", "3");
                    input.setAttribute("max", "5");
                  }
                }}
              />
            </Box>
          </S.PlayerNumberContainer>
        </S.IndividualSetter>
        <S.IndividualSetter>
          <h2>Selecione o Tipo de Vitória</h2>
          <S.VictoryContainer>
            {selectFirst ? (
              <S.SelectedVictory onClick={handleSelectType2}>
                <S.TitleSetterContainer>
                  <div>
                    <S.TitleSetter>Pontos para</S.TitleSetter>
                    <S.TitleSetter>a Vitória</S.TitleSetter>
                  </div>

                  <BiggerTooltip
                    title={`Ganha quem atingir primeiro pelo menos ${
                      (game.numberOfPlayers + 2) * (game.numberOfPlayers - 1)
                    } pontos`}
                    placement="top"
                    arrow
                  >
                    <div>
                      <AiOutlineQuestionCircle
                        size={20}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </BiggerTooltip>
                </S.TitleSetterContainer>

                <S.InputDisabled
                  disabled
                  type="number"
                  value={
                    (game.numberOfPlayers + 2) * (game.numberOfPlayers - 1)
                  }
                  ref={refInput2}
                />
              </S.SelectedVictory>
            ) : (
              <S.PlayerNumberContainer onClick={handleSelectType2}>
                <S.TitleSetterContainer>
                  <div>
                    <S.TitleSetter>Pontos para</S.TitleSetter>
                    <S.TitleSetter>a Vitória</S.TitleSetter>
                  </div>

                  <BiggerTooltip
                    title={`Ganha quem atingir primeiro pelo menos ${
                      (game.numberOfPlayers + 2) * (game.numberOfPlayers - 1)
                    } pontos`}
                    placement="top"
                    arrow
                  >
                    <div>
                      <AiOutlineQuestionCircle
                        size={20}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </BiggerTooltip>
                </S.TitleSetterContainer>

                <S.InputDisabled
                  disabled
                  type="number"
                  value={
                    (game.numberOfPlayers + 2) * (game.numberOfPlayers - 1)
                  }
                  ref={refInput2}
                />
              </S.PlayerNumberContainer>
            )}

            {selectedSecond ? (
              <S.SelectedVictory onClick={handleSelectType}>
                <S.TitleSetterContainer>
                  <div>
                    <S.TitleSetter>Número de</S.TitleSetter>
                    <S.TitleSetter>Turnos</S.TitleSetter>
                  </div>

                  <BiggerTooltip
                    title="Ao finalizar o número de turnos, ganha quem tiver mais pontos"
                    placement="top"
                    arrow
                  >
                    <div>
                      <AiOutlineQuestionCircle
                        size={20}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </BiggerTooltip>
                </S.TitleSetterContainer>

                <S.InputDisabled
                  disabled
                  type="number"
                  value="2"
                  ref={refInput}
                />
              </S.SelectedVictory>
            ) : (
              <S.PlayerNumberContainer onClick={handleSelectType}>
                <S.TitleSetterContainer>
                  <div>
                    <S.TitleSetter>Número de</S.TitleSetter>
                    <S.TitleSetter>Turnos</S.TitleSetter>
                  </div>

                  <BiggerTooltip
                    title="Ao finalizar o número de turnos, ganha quem tiver mais pontos"
                    placement="top"
                    arrow
                  >
                    <div>
                      <AiOutlineQuestionCircle
                        size={20}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </BiggerTooltip>
                </S.TitleSetterContainer>

                <S.InputDisabled
                  disabled
                  type="number"
                  value="2"
                  ref={refInput}
                />
              </S.PlayerNumberContainer>
            )}
          </S.VictoryContainer>
        </S.IndividualSetter>
      </S.SettersContainer>
      {disableButton ? (
        <BiggerTooltip
          title="Selecione um tipo de vitória"
          placement="right"
          arrow
        >
          <div>
            <Button buttonType={BUTTON_TYPE_CLASSES.disabled}>
              Iniciar Jogo
            </Button>
          </div>
        </BiggerTooltip>
      ) : (
        <Button onClick={handleStartGame}>Iniciar Jogo</Button>
      )}
    </S.Container>
  );
};

export default SetGame;
