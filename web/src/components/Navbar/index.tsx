import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { RiFilePaper2Line } from "react-icons/ri";
import { BsGearFill } from "react-icons/bs";
import { UserAuth } from "../../context/AuthContext";
import ProfileImg from "../../assets/images/profile.png";
import * as S from "./styles";

const Navbar = () => {
  const { user } = UserAuth();
  return (
    <S.Container>
      <ul>
        <li>
          <S.IconContainer>
            <Link to="/">
            <AiOutlineHome size={40} color={"white"} />
            </Link>
          </S.IconContainer>
         
        </li>
        <li>
          <S.IconContainer>
            <RiFilePaper2Line size={40} color={"white"} />
          </S.IconContainer>
          {/* <img src={GameRules} alt="game rules" /> */}
        </li>
      </ul>
      {(user && (
        <ul>
          <li>
            <S.IconContainer>
              <BsGearFill size={40} color={"white"} />
            </S.IconContainer>
          </li>

          <li>
            <S.IconContainer>
              <S.ProfileImg src={ProfileImg} alt="user profile" />
            </S.IconContainer>
          </li>
        </ul>
      )) || (
        <ul id="rightNav">
          <li>
            <S.IconContainer>
              <BsGearFill size={40} color={"white"} />
            </S.IconContainer>
          </li>
          <li>
            <Link to="/signin">
              <S.LoginButton id="login">LOGIN</S.LoginButton>
            </Link>
          </li>
        </ul>
      )}
    </S.Container>
  );
};

export default Navbar;
