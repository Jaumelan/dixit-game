import styled from "styled-components";
import background from "../../assets/images/background.png";
import { IframeHTMLAttributes } from "react";

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  /* background: rgb(0,6,40);
background: linear-gradient(180deg, rgba(0,6,40,1) 0%, rgba(9,9,121,1) 56%, rgba(53,124,214,1) 100%); */
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const Video = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

/*
{/* src="https://giphy.com/embed/l4KihuqeuJEi9qLSM"
              width="100%"
              height="100%"
              style="position:absolute"
              frameBorder="0"
              class="giphy-embed"
              allowFullScreen 
              */
