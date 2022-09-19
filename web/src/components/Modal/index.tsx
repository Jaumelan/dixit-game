import { FC } from "react";
import { GameRules, PlayerPerfil } from "../index";
import * as S from "./styles";

type ModalType = {
  gameRules: boolean;
  closeModal: () => void;
};

const Modal: FC<ModalType> = ({ gameRules, closeModal }) => {
  return (
  
      <S.ModalContainer onClick={closeModal}>
        {gameRules && <GameRules closeGameRules={closeModal} />}
        {!gameRules && <PlayerPerfil closePlayerPerfil={closeModal} />}
      </S.ModalContainer>
   
  );
};

export default Modal;
