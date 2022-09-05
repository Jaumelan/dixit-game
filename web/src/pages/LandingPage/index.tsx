import { Navbar } from "../../components";
import { LandingBox } from "../../components";
import * as S from "./styles";
//import "./style.css"

const LandingPage = () => {
  return (
    <S.Container>
      <Navbar />
      <LandingBox />
    </S.Container>
  );
};

export default LandingPage;
