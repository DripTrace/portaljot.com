import {
    DescriptionWrapper,
    Policy,
    PolicyDescription,
    PolicyGraphic,
} from "./PoliciesElements";
import { FC } from "react";
import { ServicesProps } from "./index"; // Import the ServicesProps type

type PoliciesShellProps = {
    Graphic: FC<ServicesProps>; // Typing Graphic as a React component with ServicesProps
    description: string;
};

const PoliciesShell: FC<PoliciesShellProps> = ({ Graphic, description }) => {
    return (
        <>
            <Policy>
                <PolicyGraphic>
                    <Graphic fill="#32cd32" className="" />
                </PolicyGraphic>
                <DescriptionWrapper>
                    <PolicyDescription>{description}</PolicyDescription>
                </DescriptionWrapper>
            </Policy>
        </>
    );
};

export default PoliciesShell;
