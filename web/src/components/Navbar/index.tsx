import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { RiFilePaper2Line } from "react-icons/ri";
import { BsVolumeUp, BsVolumeMute } from "react-icons/bs";
import { UserAuth } from "../../context/AuthContext";
import Button from "../Button";
import { FC, useState, useMemo } from "react";
import { Modal } from "../index";
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import som from "../../assets/sounds/soundBG.mp3";

const audio = new Audio(som);

import {
  Container,
  IconContainer,
  LinkT,
  ProfileImgSty,
  NavGame,
} from "./styles";

export enum NAVBAR_TYPE_CLASSES {
  base = "base",
  game = "game",
}

const BiggerTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: 14,
  },
}));

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
  const [openModal, setOpenModal] = useState(false);
  const [gameRules, setGameRules] = useState(false);
  const [toggle, setToggle] = useState(false);
  // const url = "../../assets/sounds/soundBG.mp3";

  const CustomNavbar = getNavbar(navbarType);

  const handleOpenModalRules = () => {
    setGameRules(true);
    setOpenModal((prev) => !prev);
  };

  const handleOpenModalProfile = () => {
    setGameRules(false);
    setOpenModal((prev) => !prev);
  };

  const handleToggle = () => {
    setToggle(!toggle);

    audio.volume = 0.05;
    if (!toggle) {
      setToggle(true);
      audio.play();
    } else {
      setToggle(false);
      audio.pause();
    }
  };

  return (
    <CustomNavbar>
      <ul>
        <li>
          <BiggerTooltip title="HOME">
            <IconContainer>
              <Link to="/">
                <AiOutlineHome size={40} color={"white"} />
              </Link>
            </IconContainer>
          </BiggerTooltip>
        </li>
        <li>
          <BiggerTooltip title="REGRAS">
            <IconContainer>
              <RiFilePaper2Line
                onClick={handleOpenModalRules}
                size={40}
                color={"white"}
              />
            </IconContainer>
          </BiggerTooltip>

          {/* <img src={GameRules} alt="game rules" /> */}
        </li>
      </ul>
      {openModal && (
        <Modal gameRules={gameRules} closeModal={() => setOpenModal(false)} />
      )}
      {(user && (
        <ul>
          <li>
            <BiggerTooltip title="SOM">
              <IconContainer>
                {toggle === false ? (
                  <BsVolumeMute
                    onClick={() => {
                      handleToggle;
                    }}
                    size={40}
                    color={"white"}
                  />
                ) : (
                  <BsVolumeUp
                    onClick={handleToggle}
                    size={40}
                    color={"white"}
                  />
                )}
              </IconContainer>
            </BiggerTooltip>
          </li>

          <li>
            <BiggerTooltip title="PERFIL" sx={{ fontSize: "16px" }}>
              <IconContainer>
                <ProfileImgSty
                  onClick={handleOpenModalProfile}
                  src={user.profilePicture}
                  alt="user profile"
                />
              </IconContainer>
            </BiggerTooltip>
          </li>
        </ul>
      )) || (
        <ul id="rightNav">
          <li>
            <IconContainer>
              {toggle === false ? (
                <BsVolumeMute
                  onClick={handleToggle}
                  size={40}
                  color={"white"}
                />
              ) : (
                <BsVolumeUp onClick={handleToggle} size={40} color={"white"} />
              )}
            </IconContainer>
          </li>
          <li>
            <LinkT to="/signin">
              <Button>LOGIN</Button>
            </LinkT>
          </li>
        </ul>
      )}
    </CustomNavbar>
  );
};

export default Navbar;
