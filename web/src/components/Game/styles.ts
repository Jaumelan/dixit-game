import styled from "styled-components";
import Background from "../../assets/images/gamebackground.jpg";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  /* background: rgb(16, 5, 31);
  background: linear-gradient(
    180deg,
    rgba(16, 5, 31, 1) 0%,
    rgba(43, 21, 124, 1) 56%,
    rgba(53, 124, 214, 1) 100%
  ); */
`;

export const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 2rem;
  align-items: center;
  width: 35rem;
  height: 100%;
  gap: 2rem;
`;

export const PlayersTitle = styled.h3`
  font-size: 2rem;
  color: #fff;
  
`;

export const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 75%;
  height: 100%;
`;

export const PlayersChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 2rem;
  align-items: center;
  width: 35rem;
  height: 80%;
  gap: 2rem;
`;