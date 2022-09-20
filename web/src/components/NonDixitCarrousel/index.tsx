import { useState } from "react";
import { Button } from "../../components";
import { usePlayContext } from "../../context/PlayContext";
import { UserAuth } from "../../context/AuthContext";
import Carrousel from "../Carrousel";
import * as S from "./styles";

const NonDixitCarrousel = () => {
  const [selectedImg, setSelectedImg] = useState<string>("");
  const { user } = UserAuth();
  const { playersSelectCards, UpdateOtherPlayersGameSetter } = usePlayContext();

  const getSelectedImg = (e: any) => {
    setSelectedImg(e.target.src);
  };

  const submitOtherPlayersCard = () => {
    if (user) {
      const data = {
        email: user?.email,
        cardsPlayed: selectedImg,
      };
      UpdateOtherPlayersGameSetter(data);
    }
  };

  return playersSelectCards ? (
    <S.Container>
      <S.EveryImagesContainer>
        <S.IncreasedImageContainer>
          <S.IncreasedImage src={selectedImg} alt="selectedImg" />
        </S.IncreasedImageContainer>

        <Carrousel getSelectedImg={getSelectedImg} />
      </S.EveryImagesContainer>
      <Button onClick={submitOtherPlayersCard}>Selecionar Imagem</Button>
    </S.Container>
  ) : (
    <S.Container>
      <Carrousel getSelectedImg={getSelectedImg} />
    </S.Container>
  );
};

export default NonDixitCarrousel;
