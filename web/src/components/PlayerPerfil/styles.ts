import styled from "styled-components";

export const Container = styled.div`
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: left;
    width: 60rem;
    height: 86rem;
    background: rgba(154, 151, 226, 0.8);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(154, 151, 226, 0.3);
    padding: 1rem 2rem;

    position: relative;
    z-index: 1;
    // border-radius: 20px;
    -webkit-animation: fade-appear-in 2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
    animation: fade-appear-in 2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
    //border: 3px solid #d3d3d3;
    gap: 1rem;

    h3 {
        font-size: 40px;
    }

    p {
        font-size: 16px;
    }

    button {
        position: relative;
        top: 20px;
        left: 480px;
    }

`;

export const PlayerPerfilContainer = styled.div`
    button {
        border: 2px solid #d3d3d3;
        background: linear-gradient(
        45deg,
        rgba(87, 0, 209, 1) 0%,
        rgba(178, 138, 235, 1) 100%
        );
        border-radius: 10px;
        width: 3rem;
        color: #d3d3d3;
    }
`;

export const Perfil = styled.div`
    display: flex;
    flex-direction: column;
`;

export const TopicContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-itens: center;
    justify-content: center;
    margin: 4rem;
    padding 0.5rem;
    width: 400px;
    border: 1px solid black;
    border-radius: 20px;
    background: rgba(154, 151, 226, 1);
`;