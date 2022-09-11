/* eslint-disable react/no-unknown-property */
import * as S from "./styles";
import Button from "../Button";
import { useGameContext } from "../../context/GameContext";
import { useNavigate } from "react-router-dom";
//import SVG from "../../assets/images/error.svg";

const ErrorPa = () => {
  const { handleGameSetter } = useGameContext();
  const navigate = useNavigate();
  const handleGoBack = () => {
    
    handleGameSetter(null);
    navigate("/");
  };

  return (
    <S.Background>
      {/* <S.SVGcon src={SVG} /> */}
      <h1>Oops! Something went wrong</h1>
      <Button onClick={handleGoBack}>Home</Button>
    </S.Background>
  );
};

export default ErrorPa;
