/* eslint-disable react/no-unknown-property */
import * as S from "./styles";
import SVG from "../../assets/images/error.svg";

const ErrorPa = () => {
  return (
    <S.Main>
      <img src={SVG} />
    </S.Main>
  );
};

export default ErrorPa;
