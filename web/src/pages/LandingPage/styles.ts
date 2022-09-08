import styled from "styled-components";
import  background  from '../../assets/images/background.png';

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-image: url(${background});
  background-size: cover;
`;
