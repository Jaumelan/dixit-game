import { useState, useEffect } from "react";
import * as S from "./styles";

type Item = {
  id: number;
  title: string;
  description: string;
  src: string;
};

type Props = {
    items: Item[];
    activeItem: number;
    setActiveItem: (activeItem: number) => void;
};

const Carrousel = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((active + 1) % items.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [active, items.length]);

  useEffect(() => {
    setItems([
      {
        id: 1,
        title: "Item 1",
        description: "Description 1",
        src: "https://picsum.photos/150/200",
      },
      {
        id: 2,
        title: "Item 2",
        description: "Description 2",
        src: "https://picsum.photos/150/200",
      },
      {
        id: 3,
        title: "Item 3",
        description: "Description 3",
        src: "https://picsum.photos/150/200",
      },
    ]);
  }, []);

  return (
    <S.CarrouselContainer>
      {items.map((item, index) => (
        <S.CarrouselContent
          key={index}
          style={{ display: index === active ? "block" : "none" }}
        >
          <img src={item.src} alt={item.title} />
        </S.CarrouselContent>
      ))}
        <S.CarrouselButtons>
            {items.map((item, index) => (
                <S.CarrouselButton
                    key={index}
                    onClick={() => setActive(index)}
                    style={{ backgroundColor: index === active ? "black" : "white" }}>
                        {index + 1}
                    </S.CarrouselButton>
                
            ))}
        </S.CarrouselButtons>
    </S.CarrouselContainer>
  );
};

export default Carrousel;
