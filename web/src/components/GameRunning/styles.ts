import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  padding-top: 2rem;
`;

export const NotificationContainer = styled.div`
  -webkit-animation: color1-change-2x 2s linear infinite alternate both;
  animation: color1-change-2x 2s linear infinite alternate both;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30rem;
  height: 10rem;
  border-radius: 1rem;
  padding: 0.6rem;
`;

export const NotificationText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #d3d7fe;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  h3 {
    font-size: 2rem;
    font-weight: 600;
    color: #6c6c6c;
    text-align: center;
  }
`;

export const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
