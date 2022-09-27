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

  -webkit-animation: fade-appear-in 2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: fade-appear-in 2s cubic-bezier(0.39, 0.575, 0.565, 1) both;

  background: rgba(134, 138, 154, 0.2);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(134, 138, 154, 0.3);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 88%;
  width: 47rem;
  position: relative;
  //border: 3px solid #000;
  border-radius: 10px;
  //background-color: #3d303b;
  gap: 0.4rem;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  padding: 1rem;

  h2 {
    color: #004080;
    font-size: 2.5rem;
    font-weight: 900;
    line-height: 1rem;
  }
  color: #cfb521;
`;

export const GameRoom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
  padding: 0.3rem;
  color: #004080;
  background: rgba(47, 33, 82, 0.42);
  border-radius: 10px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  border: 1px solid rgba(47, 33, 82, 0.3);
  h3 {
    color: #004080;
    font-size: 2rem;
    line-height: 0.4rem;
  }
`;

export const SettersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 0.5rem;
`;

export const IndividualSetter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: none;
  padding: 0.5rem;
  h2 {
    color: #004080;
    font-size: 1.8rem;
    font-weight: 900;
    line-height: 0.4rem;
  }
`;

export const VictoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
`;

export const PlayerNumberContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10rem;
  border-radius: 10px;
  border: 1px solid rgba(111, 94, 154, 0.3);
  padding: 0.3rem;

  input {
    padding: 0.5rem;
    font-size: 2rem;
    line-height: 0;
    text-align: center;
    height: 2rem;
    background: none;

    &:focus {
      outline: none;
      -webkit-appearance: none;
    }
  }

  &:hover {
    background: rgba(111, 94, 154, 0.1);
    border-radius: 10px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(7px);
    -webkit-backdrop-filter: blur(7px);
    border: 1px solid #cfb521;
    cursor: pointer;
  }

  &:active {
    background: rgba(111, 94, 154, 0.1);
    border-radius: 10px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(7px);
    -webkit-backdrop-filter: blur(7px);
    border: 1px solid #cfb521;
    cursor: pointer;
  }
`;

export const SelectedVictory = styled(PlayerNumberContainer)`
  background: rgba(111, 94, 154, 0.1);
  border-radius: 10px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  border: 1px solid #cfb521;
`;

export const TitleSetterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 15rem;
  padding: 0.5rem;
  gap: 1rem;
`;

export const InputDisabled = styled.input`
  padding: 0.5rem;
  font-size: 2rem;
  line-height: 0;
  text-align: center;
  height: 2rem;
  background: none;
  color: #cfb521;
  width: 50%;
  border: none;
  &:focus {
    outline: none;
    -webkit-appearance: none;
  }
`;

export const TitleSetter = styled.p`
  color: #004080;
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
  line-height: 0.3rem;
`;
