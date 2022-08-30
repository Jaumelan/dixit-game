import { Navbar } from "../../components";
import { LandingBox } from "../../components";
import * as S from "./styles";
//import "./style.css"

const LandingPage = () => {
  return (
    <S.Container>
      <Navbar />
      <LandingBox />
      {/* <div id="mainmain">
        <div id="main">
          <div id="boxLeft">
            <img src="../../static/img/gameName.png" alt="" />
            <button id="signUp">Cadastre-se</button>
          </div>

          <div id="boxRight">
            <img src="../../static/img/gameLogo.png" alt="" />
          </div>
        </div>
      </div> */}
    </S.Container>
  );
};

export default LandingPage;
