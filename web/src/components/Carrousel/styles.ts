import styled from "styled-components";

export const CarrouselContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0.6rem;

  width: 45%;
  height: 100%;
  overflow: hidden;
  position: relative;

  padding: 3rem;
  gap: 1rem;
`;

export const CarrouselContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 9rem;
  height: 10rem;
  overflow: hidden;
  //position: relative;
  //padding: 0.2rem;
  background: #400080;
  transition: transform 0.5s ease-in-out;
  &:hover {
    cursor: pointer;
    -webkit-animation: shadow-pop-tr 0.3s cubic-bezier(0.47, 0, 0.745, 0.715)
      both;
    animation: shadow-pop-tr 0.3s cubic-bezier(0.47, 0, 0.745, 0.715) both;
  }
`;

export const CarrouselItem = styled.img`
  @-webkit-keyframes shadow-pop-tr {
    0% {
      -webkit-box-shadow: 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e,
        0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e;
      box-shadow: 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e,
        0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e;
      -webkit-transform: translateX(0) translateY(0);
      transform: translateX(0) translateY(0);
    }
    100% {
      -webkit-box-shadow: 1px -1px #3e3e3e, 2px -2px #3e3e3e, 3px -3px #3e3e3e,
        4px -4px #3e3e3e, 5px -5px #3e3e3e, 6px -6px #3e3e3e, 7px -7px #3e3e3e,
        8px -8px #3e3e3e;
      box-shadow: 1px -1px #3e3e3e, 2px -2px #3e3e3e, 3px -3px #3e3e3e,
        4px -4px #3e3e3e, 5px -5px #3e3e3e, 6px -6px #3e3e3e, 7px -7px #3e3e3e,
        8px -8px #3e3e3e;
      -webkit-transform: translateX(-8px) translateY(8px);
      transform: translateX(-8px) translateY(8px);
    }
  }
  @keyframes shadow-pop-tr {
    0% {
      -webkit-box-shadow: 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e,
        0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e;
      box-shadow: 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e,
        0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e;
      -webkit-transform: translateX(0) translateY(0);
      transform: translateX(0) translateY(0);
    }
    100% {
      -webkit-box-shadow: 1px -1px #3e3e3e, 2px -2px #3e3e3e, 3px -3px #3e3e3e,
        4px -4px #3e3e3e, 5px -5px #3e3e3e, 6px -6px #3e3e3e, 7px -7px #3e3e3e,
        8px -8px #3e3e3e;
      box-shadow: 1px -1px #3e3e3e, 2px -2px #3e3e3e, 3px -3px #3e3e3e,
        4px -4px #3e3e3e, 5px -5px #3e3e3e, 6px -6px #3e3e3e, 7px -7px #3e3e3e,
        8px -8px #3e3e3e;
      -webkit-transform: translateX(-8px) translateY(8px);
      transform: translateX(-8px) translateY(8px);
    }
  }
  width: 100%;
  cover: fit;

  
`;
