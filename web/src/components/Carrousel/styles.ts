import styled from "styled-components";

export const CarrouselContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

export const CarrouselContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${(props) => props.translate}px);
`;

export const CarrouselItem = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  position: absolute;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  
`;

export const CarrouselItemActive = styled(CarrouselItem)`
    opacity: 1;
`;

export const CarrouselButtons = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100px;
    background: rgba(0,0,0,0.5);
`;

export const CarrouselButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    z-index: 1;
    font-size: 2rem;
    color: #fff;
    transition: color 0.5s ease-in-out;
    &:hover {
        color: #000;
    }
`;

