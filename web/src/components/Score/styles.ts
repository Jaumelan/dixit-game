import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  max-width: 600px;
  height: 90%;
  padding: 0 20px;
  text-align: center;
  background: rgba(255, 255, 255, 0.26);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4.9px);
  -webkit-backdrop-filter: blur(4.9px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  gap: 1rem;

  ::first-child {
    border: 1px solid rgba(255, 99, 71, 0.3);
  }
`;

export const ScoreHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content:space-between;
  width: 50%;
  height: 15%;
  padding: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.26);
`;

export const GamePlayer = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
  color: #0000a0;
`;

export const Score = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
  color: #0000a0;
`;
