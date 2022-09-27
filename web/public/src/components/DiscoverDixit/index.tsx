import { useState, useEffect, FC } from "react";
import { usePlayContext } from "../../context/PlayContext";
import { Button } from "../../components";
import { UserAuth } from "../../context/AuthContext";
import Pattern from "../../assets/images/pattern.jpg";
import * as S from "./styles";

type Props = {
  turn: boolean;
};

const DiscoverDixit: FC<Props> = ({ turn }) => {
  const [playerSelected, setPlayerSelected] = useState<boolean>(false);
  const [cardSelected, setCardSelected] = useState(Pattern);
  const { gameSetter, handleDixitSelection } = usePlayContext();
  const { user } = UserAuth();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const selectCard = (e: any) => {
    setCardSelected(e.target.src);
  };

  const handleSubmit = () => {
    if (user) {
      const data = {
        email: user?.email,
        card: cardSelected,
      };
      handleDixitSelection(data);
      setPlayerSelected(true);
    }
  };

  return playerSelected ? (
    <S.CarrouselContainer>
      <h2>Seu Chute Dixit foi</h2>
      <S.CardsContainer>
        <S.SelectedCardContainer>
          <S.IncreasedImage src={cardSelected} alt="" />
        </S.SelectedCardContainer>
      </S.CardsContainer>
    </S.CarrouselContainer>
  ) : turn ? (
    <S.CarrouselContainer>
      <h2>Espere os outros jogadores escolherem uma carta</h2>
      <S.CardsContainer>
        {gameSetter &&
          gameSetter.map((card, index) => (
            <S.CardContainer key={`turn-${index}`}>
              <S.Card src={card.cardsPlayed[card.cardsPlayed.length - 1]} />
            </S.CardContainer>
          ))}
      </S.CardsContainer>
    </S.CarrouselContainer>
  ) : (
    <S.CarrouselContainer>
      <h2>Qual carta será a Dixit?</h2>
      <S.CardsContainer>
        <S.SelectedCardContainer>
          <S.IncreasedImage src={cardSelected} alt="" />
        </S.SelectedCardContainer>

        <S.ImageOptions>
          <S.ImagesCarrousel>
            {gameSetter &&
              gameSetter.map((card, index) =>
                card.email !== user?.email ? (
                  <S.CardContainer
                    key={`${index}--${index + 1}`}
                    onClick={selectCard}
                  >
                    <S.Card
                      src={card.cardsPlayed[card.cardsPlayed.length - 1]}
                    />
                  </S.CardContainer>
                ) : (
                  <></>
                )
              )}
          </S.ImagesCarrousel>
         
            <Button onClick={handleSubmit}>Selecionar</Button>
          
        </S.ImageOptions>
      </S.CardsContainer>
    </S.CarrouselContainer>
  );
};

export default DiscoverDixit;
