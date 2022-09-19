import styled from "styled-components";

export const CarrouselContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 16px;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  padding: 3rem;
  gap: 1rem;
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
    border: 2px solid #400080;
  }
`;
