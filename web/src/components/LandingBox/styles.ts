import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const BoxLeft = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 768px) {
    width: 300px;
  }
  @media only screen and (min-width: 1024px) {
    width: 450px;
  }
`;

/* export const MainBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`; */

export const Title = styled.h1`
@-webkit-keyframes text-focus-in1 {
  0% {
    -webkit-filter: blur(12px);
            filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-filter: blur(0px);
            filter: blur(0px);
    opacity: 1;
  }
}
@keyframes text-focus-in1 {
  0% {
    -webkit-filter: blur(12px);
            filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-filter: blur(0px);
            filter: blur(0px);
    opacity: 1;
  }
}


  -webkit-animation: text-focus-in1 1s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
  animation: text-focus-in1 1s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
  font-size: 19rem;
  font-weight: 700;
  color: #fff;
  font-family: "Combo", cursive;
  text-align: center;
  transform: rotate(-10deg);
`;

export const BoxRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  padding-top: 60px;
  position: relative;
`;

export const FirstImg = styled.img`
  @-webkit-keyframes jello-vertical1 {
    0% {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
    }
    30% {
      -webkit-transform: scale3d(0.75, 1.25, 1);
      transform: scale3d(0.75, 1.25, 1);
    }
    40% {
      -webkit-transform: scale3d(1.25, 0.75, 1);
      transform: scale3d(1.25, 0.75, 1);
    }
    50% {
      -webkit-transform: scale3d(0.85, 1.15, 1);
      transform: scale3d(0.85, 1.15, 1);
    }
    65% {
      -webkit-transform: scale3d(1.05, 0.95, 1);
      transform: scale3d(1.05, 0.95, 1);
    }
    75% {
      -webkit-transform: scale3d(0.95, 1.05, 1);
      transform: scale3d(0.95, 1.05, 1);
    }
    100% {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
    }
  }
  @keyframes jello-vertical1 {
    0% {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1) rotate(-17deg);
    }
    30% {
      -webkit-transform: scale3d(0.75, 1.25, 1);
      transform: scale3d(0.75, 1.25, 1) rotate(-17deg);
    }
    40% {
      -webkit-transform: scale3d(1.25, 0.75, 1);
      transform: scale3d(1.25, 0.75, 1) rotate(-17deg);
    }
    50% {
      -webkit-transform: scale3d(0.85, 1.15, 1);
      transform: scale3d(0.85, 1.15, 1) rotate(-17deg);
    }
    65% {
      -webkit-transform: scale3d(1.05, 0.95, 1);
      transform: scale3d(1.05, 0.95, 1) rotate(-17deg);
    }
    75% {
      -webkit-transform: scale3d(0.95, 1.05, 1);
      transform: scale3d(0.95, 1.05, 1) rotate(-17deg);
    }
    100% {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1) rotate(-17deg);
    }
  }

  /*-webkit-animation: jello-vertical1 2s 5s infinite both;
  animation: jello-vertical1 2s 5s infinite both; */

  width: 200px;
  height: 280px;
  transform: rotate(-17deg);
  border-radius: 15px;
  position: absolute;
  top: -40px;
  left: 0;
  border: 2px solid #fff;
  @media (min-width: 768px) {
    width: 150px;
    height: 200px;
  }
  @media (min-width: 1024px) {
    width: 200px;
    height: 280px;
  }
`;

export const SecondImg = styled.img`
  @-webkit-keyframes jello-horizontal2 {
    0% {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
    }
    30% {
      -webkit-transform: scale3d(1.25, 0.75, 1);
      transform: scale3d(1.1, 0.95, 1);
    }
    40% {
      -webkit-transform: scale3d(0.75, 1.25, 1);
      transform: scale3d(0.95, 1.1, 1);
    }
    50% {
      -webkit-transform: scale3d(1.15, 0.85, 1);
      transform: scale3d(1.1, 0.95, 1);
    }
    65% {
      -webkit-transform: scale3d(0.95, 1.05, 1);
      transform: scale3d(0.95, 1, 1);
    }
    75% {
      -webkit-transform: scale3d(1.05, 0.95, 1);
      transform: scale3d(1.05, 0.95, 1);
    }
    100% {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
    }
  }
  @keyframes jello-horizontal2 {
    0% {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1) rotate(-5deg);
    }
    30% {
      -webkit-transform: scale3d(1.25, 0.75, 1);
      transform: scale3d(1.25, 0.75, 1) rotate(-5deg);
    }
    40% {
      -webkit-transform: scale3d(0.75, 1.25, 1);
      transform: scale3d(0.75, 1.25, 1) rotate(-5deg);
    }
    50% {
      -webkit-transform: scale3d(1.15, 0.85, 1);
      transform: scale3d(1.15, 0.85, 1) rotate(-5deg);
    }
    65% {
      -webkit-transform: scale3d(0.95, 1.05, 1);
      transform: scale3d(0.95, 1.05, 1) rotate(-5deg);
    }
    75% {
      -webkit-transform: scale3d(1.05, 0.95, 1);
      transform: scale3d(1.05, 0.95, 1) rotate(-5deg);
    }
    100% {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1) rotate(-5deg);
    }
  }

  -webkit-animation: jello-horizontal2 2s 6s infinite both;
  animation: jello-horizontal2 2s 6s infinite both;

  width: 200px;
  height: 280px;
  transform: rotate(-5deg);
  border-radius: 15px;
  position: absolute;
  top: -70px;
  left: 180px;
  border: 2px solid #fff;
  @media (min-width: 768px) {
    width: 150px;
    height: 200px;
  }
  @media (min-width: 1024px) {
    width: 200px;
    height: 280px;
  }
`;

//bottom: 18px;

export const ThirdImg = styled.img`
  @-webkit-keyframes jello-diagonal-1 {
    0% {
      -webkit-transform: skew(0deg 0deg);
      transform: skew(0deg 0deg);
    }
    30% {
      -webkit-transform: skew(25deg 25deg);
      transform: skew(25deg 25deg);
    }
    40% {
      -webkit-transform: skew(-15deg, -15deg);
      transform: skew(-15deg, -15deg);
    }
    50% {
      -webkit-transform: skew(15deg, 15deg);
      transform: skew(15deg, 15deg);
    }
    65% {
      -webkit-transform: skew(-5deg, -5deg);
      transform: skew(-5deg, -5deg);
    }
    75% {
      -webkit-transform: skew(5deg, 5deg);
      transform: skew(5deg, 5deg);
    }
    100% {
      -webkit-transform: skew(0deg 0deg);
      transform: skew(0deg 0deg);
    }
  }
  @keyframes jello-diagonal-1 {
    0% {
      -webkit-transform: skew(0deg 0deg);
      transform: skew(0deg 0deg);
    }
    30% {
      -webkit-transform: skew(25deg 25deg);
      transform: skew(25deg 25deg);
    }
    40% {
      -webkit-transform: skew(-15deg, -15deg);
      transform: skew(-15deg, -15deg);
    }
    50% {
      -webkit-transform: skew(15deg, 15deg);
      transform: skew(15deg, 15deg);
    }
    65% {
      -webkit-transform: skew(-5deg, -5deg);
      transform: skew(-5deg, -5deg);
    }
    75% {
      -webkit-transform: skew(5deg, 5deg);
      transform: skew(5deg, 5deg);
    }
    100% {
      -webkit-transform: skew(0deg 0deg);
      transform: skew(0deg 0deg);
    }
  }
  /* -webkit-animation: jello-diagonal-1 2s 1s infinite both;
  animation: jello-diagonal-1 2s 1s infinite both; */
  width: 200px;
  height: 280px;
  transform: rotate(5deg);
  border-radius: 15px;
  position: absolute;
  top: -75px;
  left: 350px;
  border: 2px solid #fff;
  @media (min-width: 400px) {
    width: 150px;
    height: 200px;
  }

  @media (min-width: 768px) {
    width: 150px;
    height: 200px;
  }
  @media (min-width: 1024px) {
    width: 200px;
    height: 280px;
  }
`;
