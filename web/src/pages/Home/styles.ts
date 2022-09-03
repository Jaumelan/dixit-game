import styled from "styled-components";
import background from "../../assets/images/background.png";

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-image: url(${background});
  background-size: cover;
`;

export const Body = styled.div`
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
