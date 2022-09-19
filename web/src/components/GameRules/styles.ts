import styled from "styled-components";

export const Container = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 60rem;
  height: 48rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 16px;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  padding: 0rem 2rem;
  position: relative;
  z-index: 1;
  -webkit-animation: fade-appear-in 1s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: fade-appear-in 1s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  gap: 1rem;

  li {
    font-size: 16px;
  }
`;

export const RulesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h3 {
    font-size: 2rem;
    line-height: 2.2rem;
    color: #000040;
  }
  p {
    font-size: 1.5rem;
  }
`;

export const Pontos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h3 {
    font-size: 2rem;
    line-height: 2.2rem;
    color: #000040;
  }
  p {
    font-size: 1.5rem;
    align-self: flex-start;
  }

  
`;
