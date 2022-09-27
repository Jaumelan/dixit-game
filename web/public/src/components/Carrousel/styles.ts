import styled from "styled-components";

export const CarrouselContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0.6rem;

  width: 100%;
  height: 100%;
  max-width: 100rem;
  overflow: hidden;
  position: relative;

  padding: 3rem;
  gap: 1rem;
`;

export const CarrouselContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 14rem;
  height: 20rem;

  max-width: 20rem;
  max-height: 22rem;
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
/* 
  @media only screen and (min-width: 425px) {
    width: 12rem;
    height: 14rem;
  }

  @media only screen and (min-width: 768px) and (min-height: 561px) {
    width: 8rem;
    height: 10rem;
  }

  @media only screen and (min-width: 768px) {
    width: 16rem;
    height: 19rem;
  }

  @media only screen and (min-width: 1025px) {
    width: 60%;
    height: 90%;
  }
 */

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
