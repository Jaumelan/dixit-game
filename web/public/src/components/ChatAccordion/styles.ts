import styled from "styled-components";

export const ChatMessages = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 18rem;
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem 0.1rem rgba(0, 0, 0, 0.1);
  @media screen and (max-height: 600px) {
    height: 5rem;
  }
`;

export const MyMessage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const MyUserName = styled.span`
  color: #fff;
  background-color: #800080;
  padding: 5px;
  border-radius: 5px;
  margin: 5px;
  display: inline-block;
`;

export const UserMessage = styled.span`
  color: #fff;
  background-color: #3f51b5;
  padding: 5px;
  border-radius: 5px;
  margin: 5px;
  display: inline-block;
`;

export const Message = styled.span`
  color: #000;
  background-color: #fff;
  padding: 5px;
  border-radius: 5px;
  margin: 5px;
  display: inline-block;
`;
