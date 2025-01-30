import * as React from "react";

interface ArticleCardProps {
    imageSrc: string;
    title: string;
    date: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ imageSrc, title, date }) => {
    return (
        <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-between w-full bg-gray-900 max-md:mt-9">
                <img
                    loading="lazy"
                    src={imageSrc}
                    alt={title}
                    className="w-full aspect-[1.41]"
                />
                <div className="flex flex-col justify-end py-4 pl-3.5">
                    <h3 className="text-xl font-semibold leading-7 text-white">
                        {title}
                    </h3>
                    <time className="mt-3.5 text-lg leading-8 text-zinc-400">
                        {date}
                    </time>
                </div>
            </div>
        </div>
    );
};

const More: React.FC = () => {
    const articles = [
        {
            imageSrc:
                "https://cdn.builder.io/api/v1/image/assets/TEMP/a0cc7bd189c9b856e046986c1f94f0a00c25df7a2771b8ff15e992f20f132f24?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
            title: "Ovation. The First NFT Superapp Working to Transform Your NFT Experience.",
            date: "15/3/2023",
        },
        {
            imageSrc:
                "https://cdn.builder.io/api/v1/image/assets/TEMP/1d330d7630628513db6724b036ee4c5a2849f2fc1dfabff2d8e069df7aff2f43?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
            title: "Ovation is speaking at NFT NYC 2023!",
            date: "15/3/2023",
        },
        {
            imageSrc:
                "https://cdn.builder.io/api/v1/image/assets/TEMP/bd9e8361d1196e868f39afbdb74466c1f1efbbdee4dabe020e3316ead78993d0?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
            title: "Is your NFT project a Security? It is if it passes the Howey Test.",
            date: "15/3/2023",
        },
    ];

    return (
        <section className="flex flex-col justify-center items-center p-20 bg-zinc-950 max-md:px-5">
            <h2 className="mt-16 text-5xl font-bold tracking-tighter text-center text-gray-200 uppercase leading-[78px] max-md:mt-10 max-md:max-w-full max-md:text-4xl">
                MORE FROM OVATION
            </h2>
            <div className="mt-12 w-full max-w-[1254px] max-md:mt-10 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    {articles.map((article, index) => (
                        <ArticleCard key={index} {...article} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default More;
