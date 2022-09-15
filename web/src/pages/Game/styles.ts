import styled from "styled-components";
import background from "../../assets/images/gamebg.jpg";

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-image: url(${background});
  background-size: cover;
  background-repeat: no-repeat;
  transition: background-image 1s ease-in-out;
 
  /* background: rgb(0,6,40);
background: linear-gradient(180deg, rgba(0,6,40,1) 0%, rgba(9,9,121,1) 56%, rgba(53,124,214,1) 100%); */
`;
