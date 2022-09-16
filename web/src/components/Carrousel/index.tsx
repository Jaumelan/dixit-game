import { useState, useEffect } from "react";
import { usePlayContext } from "../../context/PlayContext";
import { UserAuth } from "../../context/AuthContext";
import * as S from "./styles";

type Item = {
  hand: string[];
  username: string;
};

type Props = {
  items: Item[];
  activeItem: number;
  setActiveItem: (activeItem: number) => void;
};

const Carrousel = () => {
  const [items, setItems] = useState<Item | null>(null);
  const [ numberOfCards, setNumberOfCards ] = useState(6);
  const [active, setActive] = useState(0);
  const { cards } = usePlayContext();
  const { user } = UserAuth();

  useEffect(() => {
    if (cards) {
      const newItems = cards.filter((card) => card.username === user?.username);
      setItems(newItems[0]);
    }
  }, [cards]);

  const handleCardsToDisplay = () => {
    if (items) {
      const cardsToDisplay = [];
      for (let i = 0; i < numberOfCards; i++) {
        cardsToDisplay.push(items.hand[i]);
      }
      return cardsToDisplay;
    }
  }

  return (
    <S.CarrouselContainer>
      
        {items && handleCardsToDisplay()?.map((item, index) => (
          <S.CarrouselContent
            key={index}
            /* active={active === index}
            onClick={() => setActive(index)} */
          >
            <S.CarrouselItem src={item} />
          </S.CarrouselContent>
        ))}
      
    </S.CarrouselContainer>
  );
};

export default Carrousel;
