import styled from "styled-components";

export const CarrouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90%;
  overflow: hidden;
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  padding: 1rem;
  gap: 1rem;

  h2 {
    font-size: 2.5rem;
    font-weight: 500;
    color: #fff;
    text-align: center;
  }
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90%;
  overflow: hidden;
  padding: 1rem;
  gap: 1rem;
`;

export const SelectedCardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  width: 27rem;
  height: 29rem;
  background: rgba(37, 62, 185, 0.26);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4.9px);
  -webkit-backdrop-filter: blur(4.9px);
  border: 1px solid rgba(37, 62, 185, 0.3);
`;

export const ImagesCarrousel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const IncreasedImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const ImageOptions = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10rem;
  height: 12rem;
  overflow: hidden;
  position: relative;
  padding: 0.2rem;
  background: #400080;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${(props) => props.translate}px);
`;

export const Card = styled.img`
  width: 100%;
  cover: fit;

  &:hover {
    cursor: pointer;
    
  }
`;
