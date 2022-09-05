import styled from "styled-components";

export const Container = styled.div`
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
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -11rem;
  
`;

export const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const BtnSignin = styled.div`
  display: flex;
  justify-content: center;
  align-items: space-around;
  margin-top: 2vh;
  margin-bottom: 2vh;
`;

export const LoginButton = styled.button`
  background-color: #ffcd45;
  border-radius: 25px;
  color: black; 
  font-weight: 900;
  height: 60px;
  width: 135px;
  border: solid 3px black;
  cursor: pointer;
`;

