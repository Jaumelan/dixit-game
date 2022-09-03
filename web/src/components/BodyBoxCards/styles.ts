import styled from "styled-components";
import Pattern from "../../assets/images/pattern.jpg";
import Card1 from "../../assets/images/69.jpg";
import Card2 from "../../assets/images/70.jpg";
import Card3 from "../../assets/images/71.jpg";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Card = styled.div`
  @-webkit-keyframes flip-vertical-right1 {
    0% {
      -webkit-transform: rotateY(0);
      transform: rotateY(0);

      background-image: url(${Card1});
      background-size: cover;
    }
    100% {
      -webkit-transform: rotateY(180deg);
      transform: rotateY(180deg);
      background-image: url(${Pattern});
      background-size: cover;
    }
  }
  @keyframes flip-vertical-right1 {
    0% {
      -webkit-transform: rotateY(0);
      transform: rotateY(0);
      background-image: url(${Card1});
      background-size: cover;
    }
    100% {
      -webkit-transform: rotateY(180deg);
      transform: rotateY(180deg);
      background-image: url(${Pattern});
      background-size: cover;
    }
  }
  -webkit-animation: flip-vertical-right1 3s
    cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite alternate 1s both;
  animation: flip-vertical-right1 3s cubic-bezier(0.455, 0.03, 0.515, 0.955)
    infinite alternate 1s both;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 10rem;
  height: 15rem;
  border-radius: 0.5rem;
  border: 1px solid #b9dcff;
`;

export const CardMiddle = styled.div`
  @-webkit-keyframes flip-vertical-right2 {
    0% {
      -webkit-transform: rotateY(0);
      transform: rotateY(0);
      background-image: url(${Card2});
      background-size: cover;
    }
    100% {
      -webkit-transform: rotateY(180deg);
      transform: rotateY(180deg);
      background-image: url(${Pattern});
      background-size: cover;
    }
  }
  @keyframes flip-vertical-right2 {
    0% {
      -webkit-transform: rotateY(0);
      transform: rotateY(0);
      background-image: url(${Card2});
      background-size: cover;
    }
    100% {
      -webkit-transform: rotateY(180deg);
      transform: rotateY(180deg);
      background-image: url(${Pattern});
      background-size: cover;
    }
  }
  -webkit-animation: flip-vertical-right2 3s
    cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite alternate 1.5s both;
  animation: flip-vertical-right2 3s cubic-bezier(0.455, 0.03, 0.515, 0.955)
    infinite alternate 1.5s both;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 10rem;
  height: 15rem;
  border-radius: 0.5rem;
  border: 1px solid #b9dcff;
`;

export const CardRight = styled.div`
  @-webkit-keyframes flip-vertical-right {
    0% {
      -webkit-transform: rotateY(0);
      transform: rotateY(0);
      background-image: url(${Card3});
      background-size: cover;
    }
    100% {
      -webkit-transform: rotateY(180deg);
      transform: rotateY(180deg);
      background-image: url(${Pattern});
      background-size: cover;
    }
  }
  @keyframes flip-vertical-right {
    0% {
      -webkit-transform: rotateY(0);
      transform: rotateY(0);
      background-image: url(${Card3});
      background-size: cover;
    }
    100% {
      -webkit-transform: rotateY(180deg);
      transform: rotateY(180deg);
      background-image: url(${Pattern});
      background-size: cover;
    }
  }
  -webkit-animation: flip-vertical-right 3s
    cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite alternate 2s both;
  animation: flip-vertical-right 3s cubic-bezier(0.455, 0.03, 0.515, 0.955)
    infinite alternate 2s both;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 10rem;
  height: 15rem;
  border-radius: 0.5rem;
  border: 1px solid #b9dcff;
`;
