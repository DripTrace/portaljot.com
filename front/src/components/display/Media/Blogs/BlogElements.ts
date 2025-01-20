import styled from "styled-components";

export const BlogContainer = styled.div`
    height: 100%;
    width: 100%;
    position: relative;
`;

export const BlogWrapper = styled.div`
    position: relative;
    z-index: 1;
    height: 100vh;
    width: 100vw;
`;

export const BlogShell = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
`;

export const BlogPost = styled.div`
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
`;

export const PostWrapper = styled.div`
    height: 100%;
    width: 100%;
    position: relative;
`;

export const PostBackdrop = styled.div`
    z-index: 3;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;

    :before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
                180deg,
                rgba(63, 191, 63, 0.1) 0%,
                rgba(63, 191, 63, 0.2) 10%,
                rgba(63, 191, 63, 0.3) 20%,
                /* rgba(63, 191, 63, 0.4) 30%,
				rgba(63, 191, 63, 0.5) 40%,
				rgba(63, 191, 63, 0.6) 50%,
				rgba(63, 191, 63, 0.7) 60%,
				rgba(63, 191, 63, 0.8) 70%,
				rgba(63, 191, 63, 0.9) 80%,
				rgba(63, 191, 63, 1.0) 90%, */
                    rgba(63, 150, 63, 0.2) 100%
            ),
            linear-gradient(180deg, rgba(63, 191, 63, 0.1) 0%, transparent 100%);
        z-index: 4;
    }
`;

export const BackdropVideo = styled.video`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const ContentWrapper = styled.div`
    z-index: 4;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    padding: 2rem;

    @media screen and (max-width: 768px) {
    }
`;

export const BlogContent = styled.div`
    z-index: 4;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
`;

export const BlogTitle = styled.h6`
    font-size: 4em;
    text-align: center;
    height: 10px;

    @media screen and (max-width: 768px) {
        font-size: 3em;
    }
`;

export const BlogBody = styled.p`
    font-size: 2em;
    text-align: center;
    max-width: 800px;
    height: 100%;

    @media screen and (max-width: 768px) {
        font-size: 1.2em;
        max-width: 250px;
        height: 100%;
    }
`;
