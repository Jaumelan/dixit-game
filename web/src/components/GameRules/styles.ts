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
    // border-radius: 20px;
    -webkit-animation: fade-appear-in 2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
    animation: fade-appear-in 2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
    //border: 3px solid #d3d3d3;
    gap: 1rem;

    h3 {
        font-size: 2rem;
    }

    li {
        font-size: 16px;
    }

    button {
        position: relative;
        top: 1rem;
    }

`;

export const GameRulesContainer = styled.div`
    button {
        border: none;
        background: linear-gradient(
        45deg,
        rgba(87, 0, 209, 1) 0%,
        rgba(178, 138, 235, 1) 100%
        );
        border-radius: 0.8rem;
        width: 3rem;
        color: #d3d3d3;
    }
`;

export const Rules = styled.div`
    display: flex;
    flex-direction: column;

    ul {
        display: flex;
        flex-direction: column;
    }
`;

