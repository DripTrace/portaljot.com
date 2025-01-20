import { Button } from "@/components/display/Navigation/ButtonElements";
import {
    InfoWrapper,
    InfoRow,
    Column1,
    Column2,
    TextWrapper,
    TopLine,
    Heading,
    Subtitle,
    BtnWrap,
    ImgWrap,
    Img,
    PlatformContainer,
} from "./PlatformElements";
import Link from "next/link";
import { animateScroll as scroll } from "react-scroll";

type PlatformProps = {
    lightBg?: boolean;
    id?: string;
    imgStart?: boolean;
    topLine: string;
    lightText?: boolean;
    headline: string;
    darkText?: boolean;
    description: string;
    buttonLabel: string;
    img: string;
    alt: string;
    primary?: boolean;
    dark?: boolean;
};

const Platform: React.FC<PlatformProps> = ({
    lightBg,
    id,
    imgStart,
    topLine,
    lightText,
    headline,
    darkText,
    description,
    buttonLabel,
    img,
    alt,
    primary,
    dark,
}) => {
    const toggleHome = () => {
        scroll.scrollToTop();
    };

    return (
        <>
            <PlatformContainer lightBg={lightBg} id={id}>
                <InfoWrapper>
                    <InfoRow imgStart={imgStart}>
                        <Column1>
                            <TextWrapper>
                                <TopLine>{topLine}</TopLine>
                                <Heading lightText={lightText}>
                                    {headline}
                                </Heading>
                                <Subtitle darkText={darkText}>
                                    {description}
                                </Subtitle>
                                <BtnWrap>
                                    <Link href="/display" passHref>
                                        <Button
                                            to="hero"
                                            smooth={true}
                                            duration={500}
                                            spy={true}
                                            offset={-65}
                                            primary={primary}
                                            dark={dark}
                                        >
                                            {buttonLabel}
                                        </Button>
                                    </Link>
                                </BtnWrap>
                            </TextWrapper>
                        </Column1>
                        <Column2>
                            <ImgWrap>
                                <Img
                                    width={500}
                                    height={300}
                                    src={img}
                                    alt={alt}
                                />
                            </ImgWrap>
                        </Column2>
                    </InfoRow>
                </InfoWrapper>
            </PlatformContainer>
        </>
    );
};

export default Platform;
