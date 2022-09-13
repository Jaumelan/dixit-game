import styled from "styled-components";

export const Container = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 45rem;
  height: 48rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 16px;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  padding: 0rem 2rem;

  z-index: 1;
  -webkit-animation: fade-appear-in 2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: fade-appear-in 2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  gap: 1rem;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  padding-top: 1.5rem;
  //background: rgba(255, 255, 255, 0.7);
`;

export const ButtonHolder = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const AvatarHolder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
`;

export const Avatar = styled.img`
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  border: 2px solid #fff;
  background: #8080c0;
`;

export const AvatarName = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  color: #5959ac;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 1rem 1rem;
  gap: 0.5rem;
  width: 100%;
  height: 25rem;
  background: rgba(91, 45, 216, 0.4);
  border-radius: 16px;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
`;

export const Info = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  gap: 0.5rem;

  h2 {
    font-size: 1.5rem;
    font-weight: 900;
    color: black;
  }

  p {
    font-size: 2.5rem;
    font-weight: 500;
    color: #5959ac;
  }
`;

export const UpdateTitle = styled.h2`
  font-size: 2rem;
  font-weight: 900;
  color: #5959ac;
  align-self: center;

  &:hover {
    cursor: pointer;
    color: #8080c0;
  }
`;

export const UpdateContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;

export const UpdateTitleHolder = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0rem 1rem;

  h3 {
    font-size: 1.5rem;
    font-weight: 900;
    color: #5959ac;
  }
`;

export const UpdateInput = styled.input`
  width: 100%;
  height: 3rem;
  border-radius: 8px;
  border: 1px solid #5959ac;
  padding: 0rem 1rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: #5959ac;
  transition: 0.2s;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);

  &:focus {
    outline: none;
    border: 1px solid #8080c0;
  }
`;

export const UpdateButton = styled.button`
  width: 100%;
  height: 3rem;
  border-radius: 8px;
  border: 1px solid #5959ac;
  padding: 0rem 1rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: #5959ac;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  margin-top: 1rem;

  &:hover {
    cursor: pointer;
    border: 1px solid #8080c0;
    transition: 0.2s;

  }
`;
