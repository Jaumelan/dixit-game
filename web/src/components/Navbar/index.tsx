import { Link } from "react-router-dom";
import Home from "../../assets/images/home.svg";
import GameRules from "../../assets/images/gameRule.svg";
import Portuguese from "../../assets/images/ptbr.svg";
import * as S from "./styles";

const Navbar = () => {
  return (
    <S.Container>
      <ul>
        <li>
          <img src={Home} alt="home page" />
        </li>
        <li>
          <img src={GameRules} alt="game rules" />
        </li>
      </ul>
      <ul id="rightNav">
        <li>
          <img src={Portuguese} alt="language-pt" />
        </li>
        <li>
          <Link to="/signin">
            <S.LoginButton id="login">LOGIN</S.LoginButton>
          </Link>
        </li>
      </ul>
    </S.Container>
  );
};

export default Navbar;
