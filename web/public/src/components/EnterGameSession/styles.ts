import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 58rem;
  height: 50rem;
  background: rgba(154, 151, 226, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(154, 151, 226, 0.3);
  padding: 1rem 2rem;

  position: relative;
  // border-radius: 20px;
  -webkit-animation: fade-appear-in 2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: fade-appear-in 2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  //border: 3px solid #d3d3d3;
  gap: 1rem;
`;

export const ExitButton = styled.div`
  width: 34px;
  height: 34px;
  background: #c0c0c0;
  border-radius: 10px;
  border: 2px solid #d3d3d3;
  background: #311952;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  background: rgb(154, 151, 226);
  background: linear-gradient(
    103deg,
    rgba(154, 151, 226, 0) 0%,
    rgba(154, 151, 226, 0.8211659663865546) 10%,
    rgba(154, 151, 226, 0) 61%
  );
  border-radius: 1.5rem;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #000040;
  margin-right: 10rem;
  margin-bottom: 1rem;
`;

export const SessionContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  height: auto;
  justify-content: center;
  gap: 2.5rem;
  overflow-y: auto;
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
  border: 2px solid #d3d3d3;
  width: 15rem;
  padding: 1rem 2rem;
  gap: 1rem;

  h3 {
    font-size: 2rem;
    font-weight: 700;
    color: #d3d3d3;
  }

  button {
    margin-top: -1.5rem;
    border: 2px solid #d3d3d3;
    background: linear-gradient(
      45deg,
      rgba(87, 0, 209, 1) 0%,
      rgba(178, 138, 235, 1) 100%
    );
    border-radius: 10px;
    width: 1rem;
    color: #d3d3d3;
  }
`;

export const NoRooms = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #000040;
  }
`;
