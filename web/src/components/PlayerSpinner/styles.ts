import styled from "styled-components";

const delays = {
  1: ((-7 * 2) / 8).toString() + "s",
  2: ((-6 * 2) / 8).toString() + "s",
  3: ((-5 * 2) / 8).toString() + "s",
  4: ((-4 * 2) / 8).toString() + "s",
  5: ((-3 * 2) / 8).toString() + "s",
  6: ((-2 * 2) / 8).toString() + "s",
  7: ((-1 * 2) / 8).toString() + "s",
  8: "0s",
};

export const Container = styled.div`
  position: relative;

  height: 2rem;
  width: 2rem;
  margin: 2rem;
  transform: translateX(-50%) translateY(-50%);
`;

export const Block = styled.div`
  @keyframes move1 {
    0% {
      transform: rotate(0) scale(1);
      animation-timing-function: ease-in;
    }
    10% {
      transform: rotate(90deg) scale(0);
    }
    50% {
      transform: rotate(90deg) scale(0);
      animation-timing-function: ease-out;
    }
    60% {
      transform: rotate(180deg) scale(1);
    }
    100% {
      transform: rotate(180deg) scale(1);
    }
  }
  position: absolute;
  top: 0;
  left: 0;
  height: 1rem;
  width: 1rem;

  div {
    position: absolute;
    height: 1rem;
    width: 1rem;
    background: #fff;
    animation: move1 2s linear infinite;

    &:nth-of-type(1) {
      top: -1rem;
      left: -1rem;
      animation-delay: ${delays[1]};
    }

    &:nth-of-type(2) {
      top: -1rem;
      left: 0;
      animation-delay: ${delays[2]};
    }

    &:nth-of-type(3) {
      top: -1rem;
      left: 1rem;
      animation-delay: ${delays[3]};
    }

    &:nth-of-type(4) {
      top: 0;
      left: 1rem;
      animation-delay: ${delays[4]};
    }

    &:nth-of-type(5) {
      top: 1rem;
      left: 1rem;
      animation-delay: ${delays[5]};
    }

    &:nth-of-type(6) {
      top: 1rem;
      left: 0;
      animation-delay: ${delays[6]};
    }

    &:nth-of-type(7) {
      top: 1rem;
      left: -1rem;
      animation-delay: ${delays[7]};
    }

    &:nth-of-type(8) {
      top: 0;
      left: -1rem;
      animation-delay: ${delays[8]};
    }
  }
`;
