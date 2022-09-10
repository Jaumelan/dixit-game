import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 90%;
  height: 3rem;
  border-radius: 2rem;
  box-shadow: 0 0 0.5rem 0.5rem rgba(255, 255, 255, 0.2);
`;

export const IndexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: #ffff80;
  color: #000000;
  font-weight: bold;
  font-size: 1.5rem;
`;

export const Name = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
  margin-left: 1rem;
`;
