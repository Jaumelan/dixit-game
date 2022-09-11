import styled from "styled-components";
import background from "../../assets/images/106166.jpg";


export const Container = styled.div`
  height: 100%;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-image: url(${background});
  background-size: cover;
  background-repeat: no-repeat;
 
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

/* background: rgb(0, 6, 40);
  background: linear-gradient(
    180deg,
    rgba(0, 6, 40, 1) 0%,
    rgba(9, 9, 121, 1) 56%,
    rgba(53, 124, 214, 1) 100%
  );*/