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
  const [active, setActive] = useState(0);
  const { cards } = usePlayContext();
  const { user } = UserAuth();

  useEffect(() => {
    if (cards) {
      const newItems = cards.filter((card) => card.username === user?.username);
      setItems(newItems[0]);
    }
  }, [cards]);

  return (
    <S.CarrouselContainer>
      {items?.hand.map((item, index) => (
        <S.CarrouselContent key={index}>
          <S.CarrouselItem src={item} alt="card" />
        </S.CarrouselContent>
      ))}
    </S.CarrouselContainer>
  );
};

export default Carrousel;
