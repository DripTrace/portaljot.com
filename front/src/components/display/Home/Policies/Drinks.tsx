import styled from "styled-components";
import { ServicesProps } from "./index";

const Drinks = ({ fill, className }: ServicesProps) => {
    return (
        <>
            <DrinksPolicy
                xmlns="http://www.w3.org/2000/svg"
                width="512mm"
                height="512mm"
                viewBox="0 0 1814.1732 1814.1732"
                id="svg4942"
                version="1.1"
            >
                <g fill={fill} id="layer1" transform="translate(0,761.81102)">
                    <g
                        fill={fill}
                        transform="matrix(32.833611,0,0,-32.833611,-4027.715,5103.7515)"
                        id="g4853"
                    >
                        <path
                            fill={fill}
                            id="path278"
                            d="m 134.262,167.33 10.467,0 0,3.106 -10.467,0 0,-3.106 z"
                        />
                        <g
                            fill={fill}
                            transform="translate(153.5454,162.7319)"
                            id="g280"
                        >
                            <path
                                fill={fill}
                                id="path282"
                                d="m 0,0 c -0.739,0.739 -1.744,1.116 -2.974,1.116 l -3.711,0 c -2.64,0 -3.087,2.104 -3.167,2.905 l -8.5,0 c -0.181,-2.777 -2.842,-2.903 -3.153,-2.905 l -3.7,0 c -1.465,0 -4.228,-0.884 -4.228,-4.229 l 0,-25.929 c 0,-1.468 0.89,-4.23 4.228,-4.23 l 22.231,0 c 1.456,0 4.219,0.885 4.219,4.23 l 0,25.929 C 1.245,-3.036 1.234,-1.234 0,0"
                            />
                        </g>
                        <path
                            fill={fill}
                            id="path284"
                            d="m 163.864,166.811 7.456,0 0,3.107 -7.456,0 0,-3.107 z"
                        />
                        <g
                            fill={fill}
                            transform="translate(175.4321,163.4277)"
                            id="g286"
                        >
                            <path
                                fill={fill}
                                id="path288"
                                d="m 0,0 c -0.559,0.552 -1.304,0.832 -2.223,0.832 -1.793,0 -2.236,1.285 -2.349,1.977 l -6.407,0 C -11.23,0.93 -13.096,0.834 -13.32,0.832 c -1.1,0 -3.164,-0.659 -3.164,-3.161 l 0,-28.211 c 0,-1.098 0.666,-3.164 3.164,-3.164 l 11.097,0 c 1.089,0 3.154,0.66 3.154,3.164 l 0,28.211 C 0.931,-2.273 0.918,-0.925 0,0"
                            />
                        </g>
                    </g>
                </g>
            </DrinksPolicy>
        </>
    );
};

export default Drinks;

export const DrinksPolicy = styled.svg`
    height: 100px;
    width: 100px;

    > g,
    path {
        fill: #32cd32;
    }

    @media screen and (max-width: 768px) {
        height: 70px;
        width: 70px;
    }
`;
