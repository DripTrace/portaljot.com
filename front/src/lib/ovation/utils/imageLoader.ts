export const imageLoader = ({
    src,
    width,
    quality,
}: {
    src: string;
    width: number;
    quality: number;
}) => {
    return `https://localhost:3000${src}?w=${width}&q=${quality || 75}`;
};
