import styled from "styled-components";

export const Container = styled.div`
  @-webkit-keyframes fade-appear-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes fade-appear-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  -webkit-animation: fade-appear-in 1.2s cubic-bezier(0.39, 0.575, 0.565, 1)
    both;
  animation: fade-appear-in 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60%;
  width: 39rem;
  position: relative;
  border: 3px solid #000;
  border-radius: 10px;
  background-color: #3d303b;
  gap: 1rem;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  padding: 1rem;
  color: #fff;
  font-size: 1.4rem;
`;

export const GameRoom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
  border: 1px solid #fff;
  background-color: #ffffff;
  font-size: 1.5rem;
`;

export const SettersContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const IndividualSetter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: none;
`;

export const PlayerNumberContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60%;
  
  background-color: none;
  font-size: 1.5rem;
  label {
    font-size: 1.2rem;
    width: 100%;
    color: #fff;
    }

  input {
    width: 90%;
    height: 2rem;
  }
`;
