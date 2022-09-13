import styled from "styled-components";
import { Link } from "react-router-dom";

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

export const LinkT = styled(Link)`
  text-decoration: none;
  a {
    text-decoration: none;
  }
`;

export const LoginButton = styled.button`
  background-color: #ffcd45;
  
  color: black;
  font-weight: 900;
  height: 60px;
  width: 135px;
  border: solid 3px black;
  cursor: pointer;
`;

export const ProfileImgSty = styled.img`
  height: 4rem;
  width: 4rem;
  border-radius: 0.5rem;
`;

export const NavGame = styled.nav`
  @-webkit-keyframes swing1-in-top-fwd {
    0% {
      -webkit-transform: rotateX(-100deg);
      transform: rotateX(-100deg);
      -webkit-transform-origin: top;
      transform-origin: top;
      opacity: 0;
    }
    100% {
      -webkit-transform: rotateX(0deg);
      transform: rotateX(0deg);
      -webkit-transform-origin: top;
      transform-origin: top;
      opacity: 1;
    }
  }
  @keyframes swing1-in-top-fwd {
    0% {
      -webkit-transform: rotateX(-100deg);
      transform: rotateX(-100deg);
      -webkit-transform-origin: top;
      transform-origin: top;
      opacity: 0;
    }
    100% {
      -webkit-transform: rotateX(0deg);
      transform: rotateX(0deg);
      -webkit-transform-origin: top;
      transform-origin: top;
      opacity: 1;
    }
  }

  -webkit-animation: swing1-in-top-fwd 0.5s
    cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
  animation: swing1-in-top-fwd 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;

  display: flex;
  justify-content: space-between;
  height: 8rem;
  padding: 1rem 1.25rem 0 1.25rem;

  box-shadow: 0 0 4px 4px #9394ce;
  ul {
    display: flex;
    gap: 1.5rem;
    list-style: none;
    
  }
`;
