"use client";

import {
    DescriptionContainer,
    DescriptionH1,
    DescriptionH2,
    DescriptionIcon,
    DescriptionP,
    DescriptionWrapper,
    PhotoCard,
    VideoCard,
    AudioCard,
    PhotographyPricing,
    VideographyPricing,
    RecordingPricing,
    PhotographyPricingDescription,
    VideographyPricingDescription,
    RecordingPricingDescription,
} from "./DescriptionElements";
import { useState } from "react";

const Description = () => {
    const [photoGrown, setPhotoGrown] = useState(false);
    const handlePhotoGrow = () => {
        setPhotoGrown(!photoGrown);
    };

    const [videoGrown, setVideoGrown] = useState(false);
    const handleVideoGrow = () => {
        setVideoGrown(!videoGrown);
    };

    const [audioGrown, setAudioGrown] = useState(false);
    const handleAudioGrow = () => {
        setAudioGrown(!audioGrown);
    };

    return (
        <>
            <DescriptionContainer>
                <DescriptionH1>Our Services</DescriptionH1>
                <DescriptionWrapper>
                    <PhotoCard
                        photoGrown={photoGrown}
                        onClick={handlePhotoGrow}
                    >
                        <DescriptionIcon
                            width={200}
                            height={200}
                            src={
                                "assets/greenspot-hub-productions/LandingPageProps/PhotographyProps/polaroid_green3.svg"
                            }
                            alt="description"
                        />
                        {photoGrown ? (
                            <PhotographyPricing>
                                Photography Pricing
                            </PhotographyPricing>
                        ) : (
                            <DescriptionH2>Photo</DescriptionH2>
                        )}
                        {photoGrown ? (
                            <PhotographyPricingDescription>
                                Submit a request on the "Contact" tab to receive
                                a customized quote
                            </PhotographyPricingDescription>
                        ) : (
                            <DescriptionP>
                                Connect with us and we'll set up a personalized
                                quote for a personal photography session.
                            </DescriptionP>
                        )}
                    </PhotoCard>
                    <VideoCard
                        videoGrown={videoGrown}
                        onClick={handleVideoGrow}
                    >
                        <DescriptionIcon
                            width={200}
                            height={200}
                            src={
                                "assets/greenspot-hub-productions/LandingPageProps/VideographyProps/videographer_green2.svg"
                            }
                            alt="description"
                        />
                        {videoGrown ? (
                            <VideographyPricing>
                                Videography Pricing
                            </VideographyPricing>
                        ) : (
                            <DescriptionH2>Video</DescriptionH2>
                        )}
                        {videoGrown ? (
                            <VideographyPricingDescription>
                                Green Screen Music Video: $500 1 Location
                                5-minute Music Video:$1,500 ($250 per extra
                                location)
                            </VideographyPricingDescription>
                        ) : (
                            <DescriptionP>
                                Using state of the art equipment, we will shoot
                                a high definition video just for you.
                            </DescriptionP>
                        )}
                    </VideoCard>
                    <AudioCard
                        audioGrown={audioGrown}
                        onClick={handleAudioGrow}
                    >
                        <DescriptionIcon
                            width={200}
                            height={200}
                            src={
                                "assets/greenspot-hub-productions/LandingPageProps/RecordingProps/recording_green1.svg"
                            }
                            alt="description"
                        />
                        {audioGrown ? (
                            <RecordingPricing>
                                Recording Pricing
                            </RecordingPricing>
                        ) : (
                            <DescriptionH2>Audio</DescriptionH2>
                        )}
                        {audioGrown ? (
                            <RecordingPricingDescription>
                                $90/2-Hr (No engineer) --------------- $175/4-Hr
                                (No engineer) --------------- $250/8-Hr (No
                                engineer) -------------- $150/Hour w/Engineer
                                The price is the same for all stages of
                                production(Mastering is a separate fee), no
                                hidden fees or charges! If you don't finish your
                                project within the scheduled time you just add
                                more time accordingly.
                            </RecordingPricingDescription>
                        ) : (
                            <DescriptionP>
                                If you want to produce perfect music, come to
                                our studio to use our professional grade gear.
                            </DescriptionP>
                        )}
                    </AudioCard>
                </DescriptionWrapper>
            </DescriptionContainer>
        </>
    );
};

export default Description;
