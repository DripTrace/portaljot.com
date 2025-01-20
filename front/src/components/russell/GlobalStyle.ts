import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
*,*::before,*::after,h1,h2,h3,h4,h5,h6{
    margin: 0;
    padding: 0;
}
h1,h2,h3,h4,h5,h6{
    display: inline-block;
}
body{
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    font-family: 'Source Sans Pro',sans-serif;
}
`;

export const lightTheme = {
    body: "#FCF6F4",
    text: "#000000",
    fontFamily: "'Source Sans Pro', sans-serif",
    bodyRgba: "252, 246, 244",
    textRgba: "0,0,0",
};

export const DarkTheme = {
    body: "#000000",
    text: "#FCF6F4",
    fontFamily: "'Source Sans Pro', sans-serif",
    textRgba: "252, 246, 244",
    bodyRgba: "0,0,0",
};
