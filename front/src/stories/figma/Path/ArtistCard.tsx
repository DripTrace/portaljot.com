// import * as React from "react";

// interface ArtistCardProps {
//     imageSrc: string;
//     title: string;
//     description: string;
// }

// const ArtistCard: React.FC<ArtistCardProps> = ({
//     imageSrc,
//     title,
//     description,
// }) => {
//     return (
//         <article className="flex flex-col items-center px-5 py-14 w-full border border-solid border-neutral-700">
//             <img src={imageSrc} alt="" className="aspect-square w-[38px]" />
//             <h3 className="mt-5 text-sm font-semibold leading-5 text-white">
//                 {title}
//             </h3>
//             <p className="self-stretch mt-1.5 text-xs leading-4 text-center text-zinc-400">
//                 {description}
//             </p>
//         </article>
//     );
// };

// const PathCardView: React.FC = () => {
//     const artistCardData = [
//         {
//             imageSrc:
//                 "https://cdn.builder.io/api/v1/image/assets/TEMP/a423f4e47486d25acf5c4210a0ed3a3ec48a244ba767e71c6c03f9388ad0e46f?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
//             title: "ARTIST",
//             description:
//                 "Ovation elevates the experience of artists, enhancing their visibility and reputation...",
//         },
//         // Add more artist card data objects as needed
//     ];

//     return (
//         <section className="flex flex-col justify-center max-w-[242px]">
//             {artistCardData.map((card, index) => (
//                 <ArtistCard
//                     key={index}
//                     imageSrc={card.imageSrc}
//                     title={card.title}
//                     description={card.description}
//                 />
//             ))}
//         </section>
//     );
// };

// export default PathCardView;
