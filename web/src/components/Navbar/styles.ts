import styled from "styled-components";

export const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  height: 5.63rem;
  padding: 0 1.25rem;
  margin: 1.25rem 0;
  ul {
    display: flex;
    gap: 1.5rem;
    list-style: none;
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
