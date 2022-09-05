import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    *, *::before, *::after {
        box-sizing: border-box;
    }

    html, body , #root {
        height: 100%;
        width: 100%;
        margin: 0;
    }

    @font-face {
        font-family: 'Roboto', sans-serif;
        
    }

    html {
        font-family: 'Roboto', sans-serif;
        font-size: 10px;
        font-weight: 400;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
    }

    #root {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`;

export default GlobalStyle;
