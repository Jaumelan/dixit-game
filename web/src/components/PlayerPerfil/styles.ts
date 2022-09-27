import styled from "styled-components";
import Cloud from "../../assets/images/cloud.jpg";

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

  z-index: 4;
  -webkit-animation: fade-appear-in 2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: fade-appear-in 2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  gap: 1rem;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 20rem;
  background: url(${Cloud});
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  //padding-top: 1.5rem;
  //background: rgba(255, 255, 255, 0.7);
`;

export const ButtonHolder = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 1.5rem;
`;

export const AvatarHolder = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @keyframes float {
    0% {
      box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
      transform: translatey(0px);
    }
    50% {
      box-shadow: 0 25px 15px 0px rgba(0, 0, 0, 0.2);
      transform: translatey(-20px);
    }
    100% {
      box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
      transform: translatey(0px);
    }
  }

  top: 11rem;
`;

export const Avatar = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  border: 2px solid #fff;
  background: #8080c0;
  transform: translatey(0px);
  animation: float 6s ease-in-out infinite;
`;

export const AvatarName = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  color: #004080;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 2rem;
  gap: 0.5rem;
  width: 100%;
  height: 27rem;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 0.2rem;

  h2 {
    font-size: 2.5rem;
    font-weight: 900;
    color: gray;
  }

  p {
    font-size: 2.5rem;
    font-weight: 500;
    color: #004080;
  }
`;

export const UpdateTitle = styled.h2`
  font-size: 2rem;
  font-weight: 900;
  color: #004080;
  align-self: center;

  &:hover {
    cursor: pointer;
    color: #005cb9;
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
    color: #004080;
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

export const SubmitHolder = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
`;
