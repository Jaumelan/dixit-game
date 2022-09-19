import { useState, useEffect, SetStateAction , FC} from "react";
import { usePlayContext } from "../../context/PlayContext";
import { UserAuth } from "../../context/AuthContext";
import * as S from "./styles";

type Props = {
  getSelectedImg: (data: string) => void;
};

const DiscoverCard: FC<Props> = ({ getSelectedImg }) => {
  const [items, setItems] = useState<string[][] | null>(null);
  const [cardSelected, setCardSelected] = useState("");
  const { gameSetter } = usePlayContext();
  const { user } = UserAuth();

  useEffect(() => {
    if (gameSetter) {
      const cardsToShow: SetStateAction<string[][] | null> = [];
      gameSetter.forEach((card) => {
        if (card.email !== user?.email) {
          cardsToShow.push(card.cardsPlayed);
        }
      });
      if (cardsToShow) {
        setItems(cardsToShow);
      }
      setItems(null);
    }
  }, [gameSetter]);

  const handleCardsToDisplay = () => {
    if (items) {
      const cardsToShow: string[] = [];
      items.forEach((item) => {
        cardsToShow.push(item[item.length - 1]);
      });
      return cardsToShow;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const selectCard = (e: any) => {
    setCardSelected(e.target.src);
  };

  const handleSubmit = () => {
    getSelectedImg(cardSelected);
  };

  return (
    <div>
      <S.CarrouselContainer>
        {items &&
          handleCardsToDisplay()?.map((card, index) => (
            <S.CardContainer
              key={`card-${index}`}
              onClick={() => {
                getSelectedImg(card);
                selectCard(card);
              }}
            >
              <S.Card src={card} />
            </S.CardContainer>
          ))}
      </S.CarrouselContainer>
      <button onClick={handleSubmit}>Selecionar a Carta</button>
    </div>
  );
};

export default DiscoverCard;
