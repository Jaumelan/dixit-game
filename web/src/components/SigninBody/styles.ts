import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  width: 39rem;
  border: 3px solid #000;
  border-radius: 10px;
  background-color: #3d303b;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  padding: 1.5rem 1rem;
  gap: 1rem;
  h1 {
    font-size: 3rem;
    color: #fff;
    line-height: 3rem;
  }

  span {
    width: 50%;
    font-size: 1.5rem;
    color: #d6d6d6;
    text-align: left;
  }

  input {
    height: 35px;
    width: 200px;
    border-radius: 12px;
    
  }
  p {
    font-size: 1.5rem;
    color: #ffcd45;
    text-align: center;
  }
`;

export const LoginButton = styled.button`
  background-color: #ffcd45;
  border-radius: 25px;
  color: black;
  font-weight: 900;
  height: 60px;
  width: 135px;
  border: solid 3px black;
  cursor: pointer;
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
