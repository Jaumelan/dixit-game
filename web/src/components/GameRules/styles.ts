import styled from "styled-components";

export const Container = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 60rem;
  height: 48rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 16px;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  padding: 0rem 2rem;
  position: relative;
  z-index: 1;
  -webkit-animation: fade-appear-in 1s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: fade-appear-in 1s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  gap: 1rem;

  li {
    font-size: 16px;
  }
`;

export const TabContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 6rem;
  padding: 0rem 2rem;
  position: relative;
  z-index: 1;
  -webkit-animation: fade-appear-in 1s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: fade-appear-in 1s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  gap: 1rem;
  border-bottom: 1px solid #004080;
`;

export const Tabs = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 6rem;
  padding: 0rem 2rem;
  
  -webkit-animation: fade-appear-in 1s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: fade-appear-in 1s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  gap: 1rem;
  
  }
  
`;


export const TabName = styled.div`
  transition: 0.2s;
  
  
  heigth: 6rem;
  &:hover {
    transition: all 1s;
    background: rgba(0, 0, 0, 0.1);
    border-left: 1px solid #004080;
    border-right: 1px solid #004080;
  }

  &.active {
    transition: all 1s;
    background: rgba(0, 0, 0, 0.1);
    border-left: 1px solid #004080;
    border-right: 1px solid #004080;
  }
`;

export const Name = styled.button`
  font-size: 2.1rem;
  font-weight: 600;
  font-family: "Roboto", sans-serif;
  color: #004080;
  cursor: pointer;
  transition: 0.2s;
  border: none;
  line-height: 5.5rem;
  background: none;
  heigth: 6rem;
  &:hover {
    transition: all 1s;
    background: rgba(0, 0, 0, 0.1);
    border-left: 1px solid #004080;
    border-right: 1px solid #004080;
  }
`;

export const TabContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: 1rem;
  gap: 1rem;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const RulesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h3 {
    font-size: 2rem;
    line-height: 2.2rem;
    color: #000040;
  }
  span {
    font-size: 1.5rem;
    diplay: inline-block;
    margin-top: 1rem;
  }
`;

export const Pontos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h3 {
    font-size: 2rem;
    line-height: 2.2rem;
    color: #000040;
  }
  span {
    font-size: 1.5rem;
    align-self: flex-start;
    display: inline-block;
    margin-top: 1rem;
  }
`;

/*
export const RulesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h3 {
    font-size: 2rem;
    line-height: 2.2rem;
    color: #000040;
  }
  span {
    font-size: 1.5rem;
  }
`;

export const Pontos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h3 {
    font-size: 2rem;
    line-height: 2.2rem;
    color: #000040;
  }
  p {
    font-size: 1.5rem;
    align-self: flex-start;
  }

  
`;
*/
