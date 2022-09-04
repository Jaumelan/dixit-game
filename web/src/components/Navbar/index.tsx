import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { RiFilePaper2Line } from "react-icons/ri";
import { BsGearFill } from "react-icons/bs";
import { UserAuth } from "../../context/AuthContext";
import ProfileImg from "../../assets/images/profile.png";
import { FC } from "react";

import {
  Container,
  IconContainer,
  LoginButton,
  ProfileImgSty,
  NavGame,
} from "./styles";

export enum NAVBAR_TYPE_CLASSES {
  base = "base",
  game = "game",
}

const getNavbar = (navbarType = NAVBAR_TYPE_CLASSES.base): typeof Container =>
  ({
    [NAVBAR_TYPE_CLASSES.base]: Container,
    [NAVBAR_TYPE_CLASSES.game]: NavGame,
  }[navbarType]);

type NavbarProps = {
  navbarType?: NAVBAR_TYPE_CLASSES;
};

const Navbar: FC<NavbarProps> = ({ navbarType }) => {
  const { user } = UserAuth();

  const CustomNavbar = getNavbar(navbarType);
  return (
    <CustomNavbar>
      <ul>
        <li>
          <IconContainer>
            <Link to="/">
              <AiOutlineHome size={40} color={"white"} />
            </Link>
          </IconContainer>
        </li>
        <li>
          <IconContainer>
            <RiFilePaper2Line size={40} color={"white"} />
          </IconContainer>
          {/* <img src={GameRules} alt="game rules" /> */}
        </li>
      </ul>
      {(user && (
        <ul>
          <li>
            <IconContainer>
              <BsGearFill size={40} color={"white"} />
            </IconContainer>
          </li>

          <li>
            <IconContainer>
              <ProfileImgSty src={ProfileImg} alt="user profile" />
            </IconContainer>
          </li>
        </ul>
      )) || (
        <ul id="rightNav">
          <li>
            <IconContainer>
              <BsGearFill size={40} color={"white"} />
            </IconContainer>
          </li>
          <li>
            <Link to="/signin">
              <LoginButton id="login">LOGIN</LoginButton>
            </Link>
          </li>
        </ul>
      )}
    </CustomNavbar>
  );
};

export default Navbar;
