import styled from "styled-components";
import Button from "../Button";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 58rem;

  background: rgb(34, 193, 195);
  background: linear-gradient(
    0deg,
    rgba(66, 0, 158, 1) 0%,
    rgba(34, 0, 82, 1) 100%
  );
  padding: 1rem 2rem;

  position: relative;
  border-radius: 20px;
  -webkit-animation: fade-appear-in 2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: fade-appear-in 2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  position: relative;
  border: 3px solid #D3D3D3;
  gap: 1rem;
`;

export const ExitButton = styled.div`
    width: 34px;
    height: 34px;
    background: #c0c0c0;
    border-radius: 10px;
    border: 2px solid #D3D3D3;
    background: #311952;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #D3D3D3;
  margin-right: 10rem;
  margin-bottom: 1rem;
`;

export const SessionContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
`;

export const SessionEnter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    0deg,
    rgba(178, 138, 235, 1) 0%,
    rgba(87, 0, 209, 1) 100%
  );
  border-radius: 15px;
  border: 2px solid #D3D3D3;
  width: 15rem;
  padding: 1rem 2rem;
  gap: 1rem;

  h3 {
    font-size: 2rem;
    font-weight: 700;
    color: #D3D3D3;
  }

  button {
    margin-top: -1.5rem;
    border: 2px solid #D3D3D3;
    background: linear-gradient(
      45deg,
      rgba(87, 0, 209, 1) 0%,
      rgba(178, 138, 235, 1) 100%
    );
    border-radius: 10px;
    width: 1rem;
    color: #D3D3D3;
  }
`;
