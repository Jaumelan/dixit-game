import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  width: 39rem;
  border: 2px solid #555555;
  border-radius: 10px;
  background-color: #3d303b;
  box-shadow: #26394d 0px 20px 30px -10px;
`;

export const Register = styled.div`
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
  h3 {
    &:hover {
      color: #ffcd45;
  }
`;
