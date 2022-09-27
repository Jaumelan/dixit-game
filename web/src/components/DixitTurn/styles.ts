import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.26);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4.9px);
  -webkit-backdrop-filter: blur(4.9px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  width: 95%;
  height: 90%;
  padding: 0.5rem;

  h2 {
    font-size: 3rem;
    font-weight: 500;
    color: #fff;
    margin-bottom: 1rem;
  }
`;

export const EveryImagesContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  //padding: 0.5rem;
`;

export const IncreasedImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  width: 27rem;
  height: 29rem;
  background: rgba(37, 62, 185, 0.26);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4.9px);
  -webkit-backdrop-filter: blur(4.9px);
  border: 1px solid rgba(37, 62, 185, 0.3);
`;

export const IncreasedImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
  gap: 1rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: 77px;
  
`;

