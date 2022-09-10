import styled from "styled-components";
import Button from "../Button";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 39rem;

  background: rgb(34, 193, 195);
  background: linear-gradient(
    0deg,
    rgba(34, 193, 195, 1) 0%,
    rgba(253, 187, 45, 1) 100%
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

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #000;
  margin-bottom: 1rem;
`;

export const SessionContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const SessionEnter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #c0c0c0;
  border-radius: 10px;
  border: 2px solid #000;
  width: 15rem;
  padding: 1rem 2rem;
  gap: 1rem;

  h3 {
    font-size: 2rem;
    font-weight: 700;
    color: #000;
  }

  button {
    margin-top: -1.5rem;
    border: 2px solid #000;
    border-radius: 10px;
    width: 1rem;
  }
`;

