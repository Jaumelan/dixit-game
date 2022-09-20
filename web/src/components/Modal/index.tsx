import { FC, useRef } from "react";
import { GameRules, PlayerPerfil } from "../index";
import * as S from "./styles";

type ModalType = {
  gameRules: boolean;
  closeModal: () => void;
};

const Modal: FC<ModalType> = ({ gameRules, closeModal }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (e: any) => {
    if (modalRef.current === e.target) {
      closeModal();
    }
  };

  return (
    <S.ModalContainer ref={modalRef} onClick={handleClick}>
      {gameRules ? (
        
        <GameRules closeGameRules={closeModal}  />
      ) : (
        
        <PlayerPerfil closePlayerPerfil={closeModal} />
      )}
    </S.ModalContainer>
  );
};

export default Modal;
