import { useGameContext } from "../../context/GameContext";
import * as S from "./styles";

const GameRunning = () => {
    const { gameData } = useGameContext();
    
    return (
        <>
          <S.NotificationContainer>
          <S.NotificationText>
              <h3>Escolha uma carta</h3>
            </S.NotificationText>
          </S.NotificationContainer>
          <S.GameContainer></S.GameContainer>
        </>
    );
    };

export default GameRunning;