import styled from "styled-components";
import  background  from '../../assets/images/background.png';
import video from '../../assets/videos/background.mp4';

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  /* background-image: url(${background});
  background-video: url(${video});
  background-size: cover; */
`;

export const Video = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;