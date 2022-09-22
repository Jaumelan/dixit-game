import { useState, useEffect } from "react";
import { Button } from "../../components";
import { usePlayContext } from "../../context/PlayContext";
import { UserAuth } from "../../context/AuthContext";
import Carrousel from "../Carrousel";
import Pattern from "../../assets/images/pattern.jpg";
import * as S from "./styles";

const NonDixitCarrousel = () => {
  const [selectedImg, setSelectedImg] = useState<string>(Pattern);
  const [selected, setSelected] = useState(false);
  const { user } = UserAuth();
  const { playersSelectCards, UpdateOtherPlayersGameSetter, continuePlaying } =
    usePlayContext();

  useEffect(() => {
    if (continuePlaying) {
      setSelected(false);
    }
  }, [continuePlaying]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      setSelected(() => true);
    }
  };

  return playersSelectCards ? (
    <S.Container>
      {selected ? (
        <div>
          <S.Sent>Enviado</S.Sent>
        </div>
      ) : (
        <>
          <S.EveryImagesContainer>
            <S.IncreasedImageContainer>
              <S.IncreasedImage src={selectedImg} alt="selectedImg" />
            </S.IncreasedImageContainer>

            <Carrousel getSelectedImg={getSelectedImg} />
          </S.EveryImagesContainer>
          <Button onClick={submitOtherPlayersCard}>Selecionar Imagem</Button>
        </>
      )}
    </S.Container>
  ) : (
    <S.Container>
      <Carrousel getSelectedImg={getSelectedImg} />
    </S.Container>
  );
};

export default NonDixitCarrousel;
