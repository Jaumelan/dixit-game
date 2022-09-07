import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  padding: 0.3rem 1rem;
  gap: 1rem;
  h1 {
    font-size: 3rem;
    color: #fff;
    line-height: 3rem;
  }

  span {
    width: 70%;
    font-size: 1.5rem;
    color: #d6d6d6;
    text-align: left;
  }

  input {
    height: 35px;
    width: 250px;
    border-radius: 12px;
    padding: 0 1rem;
  }
  p {
    font-size: 1.5rem;
  }
`;

export const UsernameContainer = styled.div`
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