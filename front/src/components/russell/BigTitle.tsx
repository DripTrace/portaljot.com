import styled from "styled-components";

interface TextProps {
    top?: string;
    left?: string;
    right?: string;
    theme: {
        textRgba: string;
    };
}

const Text = styled.h1<TextProps>`
    position: fixed;
    top: ${(props) => props.top};
    left: ${(props) => props.left};
    right: ${(props) => props.right};
    color: ${(props) => `rgba(${props.theme.textRgba},0.1)`};
    font-size: calc(5rem + 5vw);
    z-index: 0;
`;

interface BigTitleProps {
    top?: string;
    left?: string;
    right?: string;
    text: string;
}

const BigTitle: React.FC<BigTitleProps> = (props) => {
    return (
        <Text top={props.top} left={props.left} right={props.right}>
            {props.text}
        </Text>
    );
};

export default BigTitle;
