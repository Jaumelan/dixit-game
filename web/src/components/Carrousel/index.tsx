import { useState, useEffect, FC, SetStateAction } from "react";
import { usePlayContext } from "../../context/PlayContext";
import { UserAuth } from "../../context/AuthContext";
import { TurnType } from "../../@types/dixit";
import * as S from "./styles";

type Props = {
  getSelectedImg: (e: any) => void;
};

const Carrousel: FC<Props> = ({ getSelectedImg }) => {
  const [items, setItems] = useState<TurnType | null>(null);
  const [numberOfCards, setNumberOfCards] = useState(6);
  const [cardsToShow, setCardsToShow] = useState<string[]>([]);
  const { gameSetter } = usePlayContext();
  const { user } = UserAuth();

  useEffect(() => {
    if (gameSetter) {
      const newItems = gameSetter.find(
        (card) => card.username === user?.username
      );
      if (newItems) {
        setItems(newItems);
        console.log("new items ", newItems);
        handleCardsToDisplay();
      } else {
        setItems(null);
      }
      
    }
  }, [gameSetter]);

  const handleCardsToDisplay = () => {
    if (items) {
      console.log("handleCardsToDisplay");
      //const cardsToDisplay = [];

      const newArray: SetStateAction<string[]> = [];
      while (newArray.length < 6) {
        const randomItem =
          items.hand[Math.floor(Math.random() * items.hand.length)];
        if (!items.cardsPlayed.includes(randomItem) && !newArray.includes(randomItem)) {
          newArray.push(randomItem);
          //console.log("new array ", newArray);
        }
      }

      //console.log(" new array 2 ", newArray);
      setCardsToShow(newArray);
    }
  };

  useEffect(() => {
    console.log("cards to show ", items);
  }, [items]);

  return (
    <S.CarrouselContainer>
      {items &&
        cardsToShow.map((item, index) => (
          <S.CarrouselContent
            key={index}
            /* active={active === index}
            onClick={() => setActive(index)} */
          >
            <S.CarrouselItem src={item} onClick={getSelectedImg} />
          </S.CarrouselContent>
        ))}
    </S.CarrouselContainer>
  );
};

export default Carrousel;
