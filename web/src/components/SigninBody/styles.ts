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
    width: 60%;
    font-size: 1.5rem;
    color: #d6d6d6;
    text-align: left;
  }

  input {
    height: 35px;
    width: 200px;
    border-radius: 12px;
    padding: 0 1rem;
  }
  p {
    font-size: 1.5rem;
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

export const EmailContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 1rem;
  p {
    position: absolute;
    top: 25px;
    width: 100%;
    color: #ffcd45;
    text-align: center;
    font-size: 1.2rem;
  }
`;

export const PasswordContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 1.5rem;
  svg {
    position: absolute;
    right: 0;
    margin-right: 1rem;
    cursor: pointer;
  }
  p {
    position: absolute;
    top: 25px;
    width: 100%;
    color: #ffcd45;
    text-align: center;
    font-size: 1.2rem;
  }
`;
