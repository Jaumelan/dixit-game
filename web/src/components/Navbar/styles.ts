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

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  border: 1px solid #e2e2e2;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: #9394ce;
    border-color: #9394ce;
    box-shadow: 0 0 3px 1px #9394ce;
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

export const ProfileImg = styled.img`
  height: 4rem;
  width: 4rem;
  border-radius: 0.5rem;
`;
