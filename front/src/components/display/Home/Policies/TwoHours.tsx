import styled from "styled-components";
import { ServicesProps } from "./index";

const TwoHours = ({ fill, className }: ServicesProps) => {
    return (
        <>
            <TwoHoursPolicy
                className={className}
                viewBox="0 0 32 32"
                height="32"
                width="32"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill={fill}
                    d="M16,29A13,13,0,1,1,29,16,13,13,0,0,1,16,29ZM16,5A11,11,0,1,0,27,16,11,11,0,0,0,16,5Z"
                />
                <path
                    fill={fill}
                    d="M21.5,22.5a1,1,0,0,1-.71-.29l-5.5-5.5A1,1,0,0,1,15,16V8a1,1,0,0,1,2,0v7.59l5.21,5.2a1,1,0,0,1,0,1.42A1,1,0,0,1,21.5,22.5Z"
                />
            </TwoHoursPolicy>
        </>
    );
};

export default TwoHours;

export const TwoHoursPolicy = styled.svg`
    height: 100px;
    width: 100px;

    > path {
        fill: #32cd32;
    }

    @media screen and (max-width: 768px) {
        height: 70px;
        width: 70px;
    }
`;
