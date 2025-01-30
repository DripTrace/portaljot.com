// import * as React from "react";

// interface BadgeProps {
//     imageUrl: string;
//     altText: string;
//     title: string;
// }

// const Badge: React.FC<BadgeProps> = ({ imageUrl, altText, title }) => (
//     <div className="flex flex-col">
//         <img
//             loading="lazy"
//             src={imageUrl}
//             alt={altText}
//             className="self-center aspect-square w-[50px]"
//         />
//         <div className="mt-2">{title}</div>
//     </div>
// );

// interface SocialIconProps {
//     imageUrl: string;
//     altText: string;
// }

// const SocialIcon: React.FC<SocialIconProps> = ({ imageUrl, altText }) => (
//     <img
//         loading="lazy"
//         src={imageUrl}
//         alt={altText}
//         className="shrink-0 aspect-square w-[39px]"
//     />
// );

// interface FavoriteNFTProps {
//     imageUrl: string;
//     altText: string;
//     aspectRatio: string;
//     width: string;
// }

// const FavoriteNFT: React.FC<FavoriteNFTProps> = ({
//     imageUrl,
//     altText,
//     aspectRatio,
//     width,
// }) => (
//     <img
//         loading="lazy"
//         src={imageUrl}
//         alt={altText}
//         className={`shrink-0 max-w-full aspect-[${aspectRatio}] w-[${width}]`}
//     />
// );

// interface PortfolioItemProps {
//     imageUrl: string;
//     altText: string;
//     title: string;
//     itemCount: number;
//     isHidden?: boolean;
// }

// const PortfolioItem: React.FC<PortfolioItemProps> = ({
//     imageUrl,
//     altText,
//     title,
//     itemCount,
//     isHidden = false,
// }) => (
//     <div className="flex flex-col grow justify-center self-stretch w-full rounded-xl border-2 border-solid bg-zinc-900 border-white border-opacity-10 max-md:mt-4">
//         <div className="flex overflow-hidden relative flex-col pt-20 w-full aspect-[1.27]">
//             <img
//                 loading="lazy"
//                 src={imageUrl}
//                 alt={altText}
//                 className="object-cover absolute inset-0 size-full"
//             />
//             <div className="flex relative flex-col justify-center px-2.5 py-4 mt-24 w-full border-t border-solid bg-neutral-900 border-white border-opacity-10 max-md:mt-10">
//                 <div className="flex gap-3 justify-between">
//                     <div className="flex flex-col justify-center">
//                         <div className="flex gap-1 justify-center font-semibold">
//                             <div className="text-sm leading-5 text-white">
//                                 {title}
//                             </div>
//                             {isHidden && (
//                                 <div className="justify-center px-1 py-0.5 my-auto text-xs text-lime-300 whitespace-nowrap rounded-sm bg-zinc-800">
//                                     Hidden
//                                 </div>
//                             )}
//                         </div>
//                         <div className="mt-1 text-xs leading-4 text-neutral-400">
//                             {itemCount} items
//                         </div>
//                     </div>
//                     <img
//                         loading="lazy"
//                         src="https://cdn.builder.io/api/v1/image/assets/TEMP/4e877803679ec5138bfd68e8e8c8a5b5af2c600a2e8956dbb3666ec05a8b8827?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                         alt="Arrow icon"
//                         className="shrink-0 my-auto w-6 aspect-square"
//                     />
//                 </div>
//             </div>
//         </div>
//     </div>
// );

// function Profile() {
//     const badges = [
//         {
//             imageUrl:
//                 "https://cdn.builder.io/api/v1/image/assets/TEMP/848ee80509f3c1c22d3f188d6a1771e76eaf2524a818951a5933588d728056c5?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
//             altText: "Portfolio badge",
//             title: "Portfolio",
//         },
//         {
//             imageUrl:
//                 "https://cdn.builder.io/api/v1/image/assets/TEMP/f1aacec5c65e703b0df54349cd7ca554106fed804be71c0d02c45997b721ce81?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
//             altText: "Portfolio badge",
//             title: "Portfolio",
//         },
//         {
//             imageUrl:
//                 "https://cdn.builder.io/api/v1/image/assets/TEMP/4c2f904d136212695cfdb0f20c419db9914c8eeab24fc72096354d106e327591?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
//             altText: "Portfolio badge",
//             title: "Portfolio",
//         },
//         {
//             imageUrl:
//                 "https://cdn.builder.io/api/v1/image/assets/TEMP/3733c05f4b50befe933513c3ecca131d99b81cb398c0e13f912236d66130d86a?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
//             altText: "Portfolio badge",
//             title: "Portfolio",
//         },
//     ];

//     const socialIcons = [
//         {
//             imageUrl:
//                 "https://cdn.builder.io/api/v1/image/assets/TEMP/63730f352c57937ddfcd9cbbecf8aa2a1c4a31a20cd912bec4255f402927303c?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
//             altText: "Social media icon",
//         },
//         {
//             imageUrl:
//                 "https://cdn.builder.io/api/v1/image/assets/TEMP/44ae9896690cc098959542d13835fc2b7f73a4b04d6fbbe47e8a5690b0cebce3?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
//             altText: "Social media icon",
//         },
//         {
//             imageUrl:
//                 "https://cdn.builder.io/api/v1/image/assets/TEMP/4552169072286431a05b6c2b2fbf298ecf2c7ee0a24fe7bf2e7d0ed775e07a0d?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
//             altText: "Social media icon",
//         },
//         {
//             imageUrl:
//                 "https://cdn.builder.io/api/v1/image/assets/TEMP/5d8f66fbd7e0bba9fa033d1f225a699d1c848cadc09ec0d8d32c3044801cce80?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
//             altText: "Social media icon",
//         },
//         {
//             imageUrl:
//                 "https://cdn.builder.io/api/v1/image/assets/TEMP/f6cb00d4eeba5af8659c9b35536b2c70062c850f75eeb2b11e8f17494c5ca99b?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
//             altText: "Social media icon",
//         },
//     ];

//     const favoriteNFTs = [
//         {
//             imageUrl:
//                 "https://cdn.builder.io/api/v1/image/assets/TEMP/a91a03f757e0b0659b1017c0f89799b7c2fb188f49a707a6b3cdedcaa115c4c2?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
//             altText: "Favorite NFT",
//             aspectRatio: "1.49",
//             width: "104px",
//         },
//         {
//             imageUrl:
//                 "https://cdn.builder.io/api/v1/image/assets/TEMP/7fc553c910ed923e82f453440668b3364fe0e44f8430c4e1d15a6add799f096e?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
//             altText: "Favorite NFT",
//             aspectRatio: "1.49",
//             width: "104px",
//         },
//         {
//             imageUrl:
//                 "https://cdn.builder.io/api/v1/image/assets/TEMP/bbab1ac232aac1afde6886ed9923fdf751297a44f5cc84d9331b58fda7f16e75?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
//             altText: "Favorite NFT",
//             aspectRatio: "1.47",
//             width: "103px",
//         },
//     ];

//     const portfolioItems = [
//         {
//             imageUrl:
//                 "https://cdn.builder.io/api/v1/image/assets/TEMP/21ada42a7fe350d6af6449e78f6af66e3f5c3d4e7199bda1f45fda6e03cc4d72?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
//             altText: "Bored Ape NFT",
//             title: "Bored Ape",
//             itemCount: 12,
//             isHidden: true,
//         },
//         {
//             imageUrl:
//                 "https://cdn.builder.io/api/v1/image/assets/TEMP/824499173a130a6275a7560cfcd3d005eb9c90078f464da5937ae4d0fbceb684?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
//             altText: "Bored Ape NFT",
//             title: "Bored Ape",
//             itemCount: 12,
//         },
//         {
//             imageUrl:
//                 "https://cdn.builder.io/api/v1/image/assets/TEMP/265248059e86d5a4af2d7bfd96e865d8e7ced37f0338215a59ed0b8424247c64?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
//             altText: "Bored Ape NFT",
//             title: "Bored Ape",
//             itemCount: 12,
//         },
//     ];

//     return (
//         <div className="border-l border-solid bg-neutral-900 border-zinc-950 border-opacity-10">
//             <div className="flex gap-5 max-md:flex-col max-md:gap-0">
//                 <nav className="flex flex-col w-[18%] max-md:ml-0 max-md:w-full">
//                     <div className="flex flex-col grow px-6 pt-8 pb-20 mx-auto w-full border-r border-solid bg-neutral-900 border-white border-opacity-10 max-md:px-5">
//                         <img
//                             loading="lazy"
//                             src="https://cdn.builder.io/api/v1/image/assets/TEMP/44523d76e5fd3e7ebdafc1a9306e73a1e9c2ccd2140877cb5c68b6ab26f9e237?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                             alt="Logo"
//                             className="self-center max-w-full aspect-[5.26] w-[214px]"
//                         />
//                         <div className="flex flex-col justify-center items-start px-8 py-4 mt-14 w-full text-lg font-medium capitalize whitespace-nowrap bg-white rounded-[50px] text-neutral-900 max-md:px-5 max-md:mt-10">
//                             <div className="flex gap-3.5 justify-center">
//                                 <img
//                                     loading="lazy"
//                                     src="https://cdn.builder.io/api/v1/image/assets/TEMP/3c60afd7eb73de61d0ba7a8cbe12b1b1b91b8ee38bfa10db8d34b83b3ea2885c?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                                     alt="Home icon"
//                                     className="shrink-0 aspect-square w-[22px]"
//                                 />
//                                 <div>Home</div>
//                             </div>
//                         </div>
//                         <div className="flex flex-col justify-center items-start px-8 py-5 mt-5 text-lg tracking-normal leading-7 whitespace-nowrap text-zinc-400 max-md:px-5">
//                             <div className="flex gap-3.5 justify-center">
//                                 <img
//                                     loading="lazy"
//                                     src="https://cdn.builder.io/api/v1/image/assets/TEMP/d5da4116258fcba08a08e47d254cce93f489481c89c565f3ea87d175f3958272?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                                     alt="Discover icon"
//                                     className="shrink-0 my-auto aspect-square w-[22px]"
//                                 />
//                                 <div>Discover</div>
//                             </div>
//                         </div>
//                         <div className="flex gap-3.5 justify-center self-start mt-9 ml-8 text-lg tracking-normal leading-7 whitespace-nowrap text-zinc-400 max-md:ml-2.5">
//                             <img
//                                 loading="lazy"
//                                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/036bf1582ac9ea8909b0e7088ddf90d2e8f3eec09575d6ec7f191878c95a5ac3?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                                 alt="Profile icon"
//                                 className="shrink-0 my-auto aspect-square w-[22px]"
//                             />
//                             <div>Profile</div>
//                         </div>
//                         <div className="flex gap-2.5 justify-between mt-[971px] max-md:mt-10">
//                             <img
//                                 loading="lazy"
//                                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/51946f2244bea2e6d9fc9dcfa4b238ae07d7b9961a1965813cb2cc0b24a4fc8f?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                                 alt="User avatar"
//                                 className="shrink-0 aspect-square w-[60px]"
//                             />
//                             <div className="flex flex-col justify-center my-auto">
//                                 <div className="text-lg font-semibold leading-5 text-white">
//                                     0xrxc.....d67579
//                                 </div>
//                                 <div className="flex gap-1 pr-3.5 mt-2 text-sm font-medium leading-5 text-zinc-400">
//                                     <div>2,000 &OVA</div>
//                                     <img
//                                         loading="lazy"
//                                         src="https://cdn.builder.io/api/v1/image/assets/TEMP/d2a05baa18db7edfd65502dfd3636802d1537d47a2665dc1fada2d730f907b60?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                                         alt="OVA token icon"
//                                         className="shrink-0 my-auto w-3.5 aspect-square"
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </nav>
//                 <main className="flex flex-col ml-5 w-[82%] max-md:ml-0 max-md:w-full">
//                     <div className="flex flex-col grow max-md:max-w-full">
//                         <header className="flex gap-5 justify-end items-start p-7 w-full border-l border-solid bg-neutral-900 border-white border-opacity-10 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
//                             <div className="flex gap-2.5 text-2xl font-medium capitalize text-white text-opacity-80">
//                                 <img
//                                     loading="lazy"
//                                     src="https://cdn.builder.io/api/v1/image/assets/TEMP/06bb2209dbf0bb591fcf96db877b78b2c3f64f587d393fe5f8eb063baa5867c9?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                                     alt="Sun icon"
//                                     className="shrink-0 aspect-[0.97] w-[39px]"
//                                 />
//                                 <div className="flex-auto my-auto">
//                                     Good morning, John
//                                 </div>
//                             </div>
//                             <div className="flex gap-2.5 justify-between">
//                                 <div className="flex flex-col">
//                                     <div className="text-sm font-semibold tracking-normal leading-5 text-stone-300">
//                                         0xrxc.....d67579
//                                     </div>
//                                     <div className="flex gap-1 self-end mt-1 text-xs font-medium leading-4 text-lime-300">
//                                         <img
//                                             loading="lazy"
//                                             src="https://cdn.builder.io/api/v1/image/assets/TEMP/e3ed7896646539116712e71a16e08566b87b3f33f01dd9dcb999cf81f7d8623d?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                                             alt="OVA token icon"
//                                             className="shrink-0 my-auto aspect-[1.1] w-[11px]"
//                                         />
//                                         <div>2,000 &OVA</div>
//                                     </div>
//                                 </div>
//                                 <img
//                                     loading="lazy"
//                                     src="https://cdn.builder.io/api/v1/image/assets/TEMP/a7a8769ccb10f351dd07d1619a77aa57fde3384a5421711cca28ba90eea9393a?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                                     alt="User avatar"
//                                     className="shrink-0 self-start aspect-square w-[37px]"
//                                 />
//                             </div>
//                         </header>
//                         <section className="flex flex-col justify-center bg-white max-md:max-w-full">
//                             <div className="flex overflow-hidden relative flex-col items-end px-16 pt-20 pb-8 w-full min-h-[362px] max-md:px-5 max-md:max-w-full">
//                                 <img
//                                     loading="lazy"
//                                     src="https://cdn.builder.io/api/v1/image/assets/TEMP/80d48a8df21c6053189af5e9c9493eb7a3afc76443224ffbefc4055aca38caad?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                                     alt="Background"
//                                     className="object-cover absolute inset-0 size-full"
//                                 />
//                                 <div className="flex relative gap-3 mt-52 max-md:mt-10">
//                                     <button className="flex justify-center items-center p-3 border border-solid bg-white bg-opacity-20 border-neutral-200 border-opacity-30 h-[46px] rounded-[500px] w-[46px]">
//                                         <img
//                                             loading="lazy"
//                                             src="https://cdn.builder.io/api/v1/image/assets/TEMP/c20572b94522dbc7d32ae11c95d77c6ecb644d1a8ad89b178d0cc123d331c19a?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                                             alt="Share icon"
//                                             className="w-6 aspect-square"
//                                         />
//                                     </button>
//                                     <button className="flex justify-center items-center p-3 border border-solid bg-white bg-opacity-20 border-neutral-200 border-opacity-30 h-[46px] rounded-[500px] w-[46px]">
//                                         <img
//                                             loading="lazy"
//                                             src="https://cdn.builder.io/api/v1/image/assets/TEMP/c20572b94522dbc7d32ae11c95d77c6ecb644d1a8ad89b178d0cc123d331c19a?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                                             alt="Bookmark icon"
//                                             className="w-6 aspect-square"
//                                         />
//                                     </button>
//                                     <button className="flex justify-center items-center p-3 border border-solid bg-white bg-opacity-20 border-neutral-200 border-opacity-30 h-[46px] rounded-[500px] w-[46px]">
//                                         <img
//                                             loading="lazy"
//                                             src="https://cdn.builder.io/api/v1/image/assets/TEMP/c20572b94522dbc7d32ae11c95d77c6ecb644d1a8ad89b178d0cc123d331c19a?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                                             alt="More icon"
//                                             className="w-6 aspect-square"
//                                         />
//                                     </button>
//                                     <button className="justify-center px-4 py-3 text-xs font-semibold text-white border border-solid bg-white bg-opacity-20 border-neutral-200 border-opacity-30 rounded-[400.862px] max-md:px-5">
//                                         Edit profile
//                                     </button>
//                                 </div>
//                             </div>
//                         </section>
//                         <div className="flex z-10 gap-5 items-end mx-7 mt-0 max-md:flex-wrap max-md:mr-2.5">
//                             <div className="flex flex-col self-stretch py-px">
//                                 <img
//                                     loading="lazy"
//                                     src="https://cdn.builder.io/api/v1/image/assets/TEMP/44cd40e63d0636873536ab53d2333e433a41ca13f7493359a8d62dad057818a8?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                                     alt="User avatar"
//                                     className="w-40 max-w-full aspect-[1.01]"
//                                 />
//                                 <div className="flex gap-4 pr-2 mt-11 text-3xl font-semibold tracking-normal leading-7 text-white max-md:mt-10">
//                                     <div>The pancake chief</div>
//                                     <img
//                                         loading="lazy"
//                                         src="https://cdn.builder.io/api/v1/image/assets/TEMP/b4fbe89bcb06679e2da245fe95b457b65039fd6dadf0325bc78c8c57a97f232d?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                                         alt="Verified badge"
//                                         className="shrink-0 my-auto aspect-square w-[26px]"
//                                     />
//                                 </div>
//                                 <div className="flex gap-1 justify-center mt-2">
//                                     <div className="text-xl tracking-normal leading-8 text-zinc-400">
//                                         @pancakeguy
//                                     </div>
//                                     <div className="justify-center px-2.5 py-1 my-auto text-xs leading-4 text-white border border-solid bg-neutral-800 border-white border-opacity-10 rounded-[44.113px]">
//                                         OVA TOKEN: 10
//                                     </div>
//                                 </div>
//                                 <div className="flex flex-col px-5 py-4 mt-9 w-full text-sm rounded-3xl bg-zinc-900">
//                                     <div className="font-semibold tracking-normal text-white leading-[143%]">
//                                         CEO @ Slack
//                                     </div>
//                                     <div className="mt-5 text-base leading-7 text-neutral-200 max-md:mr-1.5">
//                                         Web3 dude, focusing on getting more foes
//                                         friends and collections, WAGMI, Web3
//                                     </div>
//                                     <div className="flex gap-5 justify-between mt-8 text-lg whitespace-nowrap">
//                                         <div className="flex gap-2.5">
//                                             <div className="my-auto font-semibold leading-[111%] text-neutral-200">
//                                                 752
//                                             </div>
//                                             <div className="font-medium capitalize text-zinc-500">
//                                                 Following
//                                             </div>
//                                         </div>
//                                         <div className="flex gap-2.5">
//                                             <div className="my-auto font-semibold leading-[111%] text-neutral-200">
//                                                 11k
//                                             </div>
//                                             <div className="font-medium capitalize text-zinc-500">
//                                                 Followers
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="flex gap-4 justify-between py-1.5 pr-1.5 mt-5 leading-[143%] text-zinc-400">
//                                         <div className="flex gap-2 justify-between">
//                                             <img
//                                                 loading="lazy"
//                                                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/d81e9ce85943bc40cc9c27f0cf4fbed8cbf45d67ea73199d3945812d4042a189?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                                                 alt="Content creator icon"
//                                                 className="shrink-0 self-start aspect-square w-[18px]"
//                                             />
//                                             <div>Content creator</div>
//                                         </div>
//                                         <div className="flex gap-2 justify-between">
//                                             <img
//                                                 loading="lazy"
//                                                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/79ed5789d4f50098c5111d653de0b864ba0406af44b5fd1494ad2c7f118d9160?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                                                 alt="Web3 icon"
//                                                 className="shrink-0 self-start aspect-square w-[18px]"
//                                             />
//                                             <div>Web3</div>
//                                         </div>
//                                         <div className="flex gap-2">
//                                             <img
//                                                 loading="lazy"
//                                                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/31e59d45d537531944ac00b9ef645443b95e9cce0fd194972e0274f58bad386c?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                                                 alt="Calendar icon"
//                                                 className="shrink-0 self-start aspect-[1.05] w-[19px]"
//                                             />
//                                             <div>Dec 2021</div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="flex flex-col px-5 py-5 mt-9 w-full rounded-3xl bg-zinc-900">
//                                     <div className="text-sm font-medium uppercase text-zinc-500">
//                                         BADGES
//                                     </div>
//                                     <div className="flex gap-3 justify-between py-1.5 mt-4 text-xs leading-4 text-zinc-400">
//                                         {badges.map((badge, index) => (
//                                             <Badge
//                                                 key={index}
//                                                 imageUrl={badge.imageUrl}
//                                                 altText={badge.altText}
//                                                 title={badge.title}
//                                             />
//                                         ))}
//                                     </div>
//                                 </div>
//                                 <div className="flex flex-col px-5 py-4 mt-9 w-full rounded-3xl bg-zinc-900">
//                                     <div className="text-sm font-medium uppercase text-zinc-500">
//                                         SOCIALS
//                                     </div>
//                                     <div className="flex gap-4 justify-between py-1.5 mt-4">
//                                         {socialIcons.map((icon, index) => (
//                                             <SocialIcon
//                                                 key={index}
//                                                 imageUrl={icon.imageUrl}
//                                                 altText={icon.altText}
//                                             />
//                                         ))}
//                                     </div>
//                                 </div>
//                                 <div className="flex flex-col px-5 py-4 mt-9 w-full rounded-3xl bg-zinc-900">
//                                     <div className="text-sm font-medium uppercase text-zinc-500">
//                                         FAVOURITE NFT
//                                     </div>
//                                     <div className="flex gap-1.5 py-1.5 mt-4">
//                                         {favoriteNFTs.map((nft, index) => (
//                                             <FavoriteNFT
//                                                 key={index}
//                                                 imageUrl={nft.imageUrl}
//                                                 altText={nft.altText}
//                                                 aspectRatio={nft.aspectRatio}
//                                                 width={nft.width}
//                                             />
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="shrink-0 mt-20 w-px border border-solid bg-white bg-opacity-10 border-white border-opacity-10 h-[990px] max-md:mt-10" />
//                             <div className="flex flex-col pt-2.5 pb-px mt-32 max-md:mt-10 max-md:max-w-full">
//                                 <section className="flex flex-col px-6 py-6 rounded-2xl border border-solid border-neutral-700 max-md:px-5 max-md:max-w-full">
//                                     <h2 className="text-base font-medium text-white uppercase max-md:max-w-full">
//                                         Featured
//                                     </h2>
//                                     <div className="mt-11 max-md:mt-10 max-md:max-w-full">
//                                         <div className="flex gap-5 max-md:flex-col max-md:gap-0">
//                                             <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
//                                                 <img
//                                                     loading="lazy"
//                                                     src="https://cdn.builder.io/api/v1/image/assets/TEMP/a87699a138627085b482c9a95c2e2eccb5674b822223cbb7c0478e07f519981b?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                                                     alt="Featured content"
//                                                     className="grow w-full border-2 border-solid aspect-[1.09] border-white border-opacity-10 max-md:mt-4"
//                                                 />
//                                             </div>
//                                             <article className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
//                                                 <div className="flex flex-col grow pt-4 w-full rounded-xl border-2 border-solid bg-zinc-900 border-white border-opacity-10 max-md:mt-4">
//                                                     <div className="flex flex-col px-4 text-white">
//                                                         <div className="text-xs leading-4 text-neutral-400">
//                                                             Post
//                                                         </div>
//                                                         <h3 className="mt-7 text-sm font-semibold leading-5">
//                                                             WHAT IS NFT
//                                                         </h3>
//                                                         <div className="mt-4 text-xs leading-5">
//                                                             <span className="text-neutral-400">
//                                                                 NFT stands for
//                                                                 Non-Fungible
//                                                                 Token. It's a
//                                                                 type of digital
//                                                                 asset that
//                                                                 represents
//                                                                 ownership or
//                                                                 proof of
//                                                                 authenticity of
//                                                                 a unique item or
//                                                                 piece of content
//                                                                 using blockchain
//                                                                 technology.
//                                                                 Unlike
//                                                                 cryptocurrencies
//                                                                 such as Bitcoin
//                                                                 or Ethereum,
//                                                                 which are
//                                                                 fungible and can
//                                                                 be exchanged on
//                                                                 a one-to-one
//                                                                 basis, NFTs are
//                                                                 indivisible,
//                                                                 exchanged on a
//                                                                 one-to-one
//                                                                 basis, N.....
//                                                             </span>
//                                                             <span className="font-medium">
//                                                                 more
//                                                             </span>
//                                                         </div>
//                                                     </div>
//                                                     <div className="flex flex-col justify-center items-start px-3 py-3 mt-4 text-xs font-medium border-t border-solid bg-neutral-900 border-white border-opacity-10 text-zinc-400 max-md:pr-5">
//                                                         <div className="justify-center p-2 border border-solid bg-zinc-900 border-zinc-800 rounded-[400.862px]">
//                                                             32 Views
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </article>
//                                             <article className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
//                                                 <div className="flex flex-col grow pt-4 mx-auto w-full rounded-xl border-2 border-solid bg-zinc-900 border-white border-opacity-10 max-md:mt-4">
//                                                     <div className="flex flex-col px-3 text-xs leading-4 text-zinc-400">
//                                                         <div className="text-neutral-400">
//                                                             Event
//                                                         </div>
//                                                         <h3 className="mt-7 text-sm font-semibold leading-5 text-white">
//                                                             MINT DAY
//                                                         </h3>
//                                                         <img
//                                                             loading="lazy"
//                                                             src="https://cdn.builder.io/api/v1/image/assets/TEMP/578417a8d67cdc830a7dcfc8402db0708b189e8ac0ff1168d7150598056ce9cb?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                                                             alt="Event image"
//                                                             className="self-center mt-2.5 aspect-[2.94] w-[278px]"
//                                                         />
//                                                         <div className="flex gap-1.5 justify-center self-start mt-3.5">
//                                                             <img
//                                                                 loading="lazy"
//                                                                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/d1902bc5357d08ce91aababb40ba71aa49d531e5118293fc7e3fea41c8968851?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                                                                 alt="Calendar icon"
//                                                                 className="shrink-0 my-auto w-3 aspect-square"
//                                                             />
//                                                             <div>
//                                                                 Wed, 24 Jan,
//                                                                 15:00 - 20:00
//                                                             </div>
//                                                         </div>
//                                                         <div className="flex gap-1.5 justify-center self-start mt-2 leading-[204%]">
//                                                             <img
//                                                                 loading="lazy"
//                                                                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/6657cf2ead5ece67477e293f2dac5120053f9e9294a26c5ac61817d137944dd9?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                                                                 alt="Location icon"
//                                                                 className="shrink-0 my-auto w-3 aspect-square"
//                                                             />
//                                                             <div className="underline">
//                                                                 Virtual event
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                     <div className="flex gap-5 justify-between items-start px-3 py-2.5 mt-2 text-xs font-medium border-t border-solid bg-neutral-900 border-white border-opacity-10">
//                                                         <div className="justify-center p-2 border border-solid bg-zinc-900 border-zinc-800 rounded-[400.862px] text-zinc-400">
//                                                             32 Views
//                                                         </div>
//                                                         <button className="justify-center px-2.5 py-2 bg-lime-300 rounded-[30px] text-neutral-900">
//                                                             Add to calender
//                                                         </button>
//                                                     </div>
//                                                 </div>
//                                             </article>
//                                         </div>
//                                     </div>
//                                 </section>
//                                 <div className="flex gap-5 justify-between items-start self-start mt-12 text-xs leading-4 whitespace-nowrap text-neutral-400 max-md:flex-wrap max-md:mt-10">
//                                     <button className="justify-center px-7 py-2.5 bg-neutral-800 rounded-[603.615px] max-md:px-5">
//                                         Post
//                                     </button>
//                                     <button className="justify-center px-5 py-2.5 bg-neutral-800 rounded-[603.615px]">
//                                         Replies
//                                     </button>
//                                     <button className="justify-center px-5 py-2.5 bg-white rounded-[603.615px] text-neutral-800">
//                                         Portfolio
//                                     </button>
//                                     <button className="justify-center self-stretch px-5 py-2.5 bg-neutral-800 rounded-[603.615px]">
//                                         Created
//                                     </button>
//                                     <button className="justify-center px-5 py-2.5 bg-neutral-800 rounded-[603.615px]">
//                                         Stats
//                                     </button>
//                                     <button className="justify-center self-stretch px-5 py-2.5 bg-neutral-800 rounded-[603.615px]">
//                                         Experience
//                                     </button>
//                                 </div>
//                                 <section className="flex flex-col p-6 mt-8 rounded-2xl border border-solid border-neutral-700 max-md:px-5 max-md:max-w-full">
//                                     <h2 className="text-base font-medium text-white uppercase max-md:max-w-full">
//                                         NFTS
//                                     </h2>
//                                     <div className="flex gap-5 justify-between px-0.5 mt-5 w-full whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
//                                         <div className="flex gap-2 text-xs leading-4 text-neutral-400 max-md:flex-wrap">
//                                             <button className="justify-center p-3 bg-white rounded-[50px] text-neutral-800">
//                                                 All(20)
//                                             </button>
//                                             <button className="justify-center p-3 bg-neutral-800 rounded-[50px]">
//                                                 Complete(4)
//                                             </button>
//                                             <button className="justify-center p-3 bg-neutral-800 rounded-[50px]">
//                                                 Domain(4)
//                                             </button>
//                                             <button className="justify-center p-3 bg-neutral-800 rounded-[50px]">
//                                                 Collectibles(4)
//                                             </button>
//                                             <button className="justify-center p-3 bg-neutral-800 rounded-[500px]">
//                                                 Metaverse(4)
//                                             </button>
//                                             <button className="justify-center p-3 bg-neutral-800 rounded-[500px]">
//                                                 Art(4)
//                                             </button>
//                                         </div>
//                                         <button className="flex gap-1.5 px-2.5 py-3 text-sm font-medium text-white rounded-lg border border-solid bg-neutral-800 border-zinc-800">
//                                             <div className="my-auto">
//                                                 Filters
//                                             </div>
//                                             <img
//                                                 loading="lazy"
//                                                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/bad526f1e19c86c905f52d572cf0a436a74a0e648329a9feae398e3fe971ead6?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
//                                                 alt="Filter icon"
//                                                 className="shrink-0 w-3.5 aspect-square"
//                                             />
//                                         </button>
//                                     </div>
//                                     <div className="mt-11 max-md:mt-10 max-md:max-w-full">
//                                         <div className="flex gap-5 max-md:flex-col max-md:gap-0">
//                                             {portfolioItems.map(
//                                                 (item, index) => (
//                                                     <PortfolioItem
//                                                         key={index}
//                                                         imageUrl={item.imageUrl}
//                                                         altText={item.altText}
//                                                         title={item.title}
//                                                         itemCount={
//                                                             item.itemCount
//                                                         }
//                                                         isHidden={item.isHidden}
//                                                     />
//                                                 )
//                                             )}
//                                         </div>
//                                     </div>
//                                 </section>
//                             </div>
//                         </div>
//                     </div>
//                 </main>
//             </div>
//         </div>
//     );
// }

// export default Profile;

import * as React from "react";
import Image from "next/image";
import { useState } from "react";

interface BadgeProps {
    imageUrl: string;
    altText: string;
    title: string;
}

const Badge: React.FC<BadgeProps> = ({ imageUrl, altText, title }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="flex flex-col"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative self-center w-[50px] h-[50px]">
                <Image
                    src={imageUrl}
                    alt={altText}
                    layout="fill"
                    objectFit="cover"
                    className={`transition-transform duration-300 ${
                        isHovered ? "scale-110" : "scale-100"
                    }`}
                />
            </div>
            <div className="mt-2">{title}</div>
        </div>
    );
};

interface SocialIconProps {
    imageUrl: string;
    altText: string;
    onClick: () => void;
}

const SocialIcon: React.FC<SocialIconProps> = ({
    imageUrl,
    altText,
    onClick,
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            type="button"
            className="relative shrink-0 w-[39px] h-[39px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
            title="Click me"
        >
            <Image
                src={imageUrl}
                alt={altText}
                layout="fill"
                objectFit="cover"
                className={`transition-opacity duration-300 ${
                    isHovered ? "opacity-80" : "opacity-100"
                }`}
            />
        </button>
    );
};

interface FavoriteNFTProps {
    imageUrl: string;
    altText: string;
    aspectRatio: string;
    width: string;
}

const FavoriteNFT: React.FC<FavoriteNFTProps> = ({
    imageUrl,
    altText,
    aspectRatio,
    width,
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`relative shrink-0 max-w-full w-[${width}] h-0`}
            style={{ paddingBottom: aspectRatio }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Image
                src={imageUrl}
                alt={altText}
                layout="fill"
                objectFit="cover"
                className={`transition-transform duration-300 ${
                    isHovered ? "scale-105" : "scale-100"
                }`}
            />
        </div>
    );
};

interface PortfolioItemProps {
    imageUrl: string;
    altText: string;
    title: string;
    itemCount: number;
    isHidden?: boolean;
    onClick: () => void;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({
    imageUrl,
    altText,
    title,
    itemCount,
    isHidden = false,
    onClick,
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="flex flex-col grow justify-center self-stretch w-full rounded-xl border-2 border-solid bg-zinc-900 border-white border-opacity-10 max-md:mt-4"
            onClick={onClick}
        >
            <div
                className="relative flex overflow-hidden flex-col pt-20 w-full aspect-[1.27]"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Image
                    src={imageUrl}
                    alt={altText}
                    layout="fill"
                    objectFit="cover"
                    className={`transition-transform duration-300 ${
                        isHovered ? "scale-105" : "scale-100"
                    }`}
                />
                <div className="flex relative flex-col justify-center px-2.5 py-4 mt-24 w-full border-t border-solid bg-neutral-900 border-white border-opacity-10 max-md:mt-10">
                    <div className="flex gap-3 justify-between">
                        <div className="flex flex-col justify-center">
                            <div className="flex gap-1 justify-center font-semibold">
                                <div className="text-sm leading-5 text-white">
                                    {title}
                                </div>
                                {isHidden && (
                                    <div className="justify-center px-1 py-0.5 my-auto text-xs text-lime-300 whitespace-nowrap rounded-sm bg-zinc-800">
                                        Hidden
                                    </div>
                                )}
                            </div>
                            <div className="mt-1 text-xs leading-4 text-neutral-400">
                                {itemCount} items
                            </div>
                        </div>
                        <Image
                            src="http://b.io/ext_81-"
                            alt="Arrow icon"
                            width={24}
                            height={24}
                            className="shrink-0 my-auto"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

function Profile() {
    const badges = [
        {
            imageUrl: "http://b.io/ext_82-",
            altText: "Portfolio badge",
            title: "Portfolio",
        },
        {
            imageUrl: "http://b.io/ext_83-",
            altText: "Portfolio badge",
            title: "Portfolio",
        },
        {
            imageUrl: "http://b.io/ext_84-",
            altText: "Portfolio badge",
            title: "Portfolio",
        },
        {
            imageUrl: "http://b.io/ext_85-",
            altText: "Portfolio badge",
            title: "Portfolio",
        },
    ];

    const socialIcons = [
        {
            imageUrl: "http://b.io/ext_86-",
            altText: "Social media icon",
            onClick: () => console.log("Social icon 1 clicked"),
        },
        {
            imageUrl: "http://b.io/ext_87-",
            altText: "Social media icon",
            onClick: () => console.log("Social icon 2 clicked"),
        },
        {
            imageUrl: "http://b.io/ext_88-",
            altText: "Social media icon",
            onClick: () => console.log("Social icon 3 clicked"),
        },
        {
            imageUrl: "http://b.io/ext_89-",
            altText: "Social media icon",
            onClick: () => console.log("Social icon 4 clicked"),
        },
        {
            imageUrl: "http://b.io/ext_90-",
            altText: "Social media icon",
            onClick: () => console.log("Social icon 5 clicked"),
        },
    ];

    const favoriteNFTs = [
        {
            imageUrl: "http://b.io/ext_91-",
            altText: "Favorite NFT",
            aspectRatio: "66.89%",
            width: "104px",
        },
        {
            imageUrl: "http://b.io/ext_92-",
            altText: "Favorite NFT",
            aspectRatio: "66.89%",
            width: "104px",
        },
        {
            imageUrl: "http://b.io/ext_93-",
            altText: "Favorite NFT",
            aspectRatio: "68.04%",
            width: "103px",
        },
    ];

    const portfolioItems = [
        {
            imageUrl: "http://b.io/ext_94-",
            altText: "Bored Ape NFT",
            title: "Bored Ape",
            itemCount: 12,
            isHidden: true,
            onClick: () => console.log("Portfolio item 1 clicked"),
        },
        {
            imageUrl: "http://b.io/ext_95-",
            altText: "Bored Ape NFT",
            title: "Bored Ape",
            itemCount: 12,
            onClick: () => console.log("Portfolio item 2 clicked"),
        },
        {
            imageUrl: "http://b.io/ext_96-",
            altText: "Bored Ape NFT",
            title: "Bored Ape",
            itemCount: 12,
            onClick: () => console.log("Portfolio item 3 clicked"),
        },
    ];

    const [isNavOpen, setIsNavOpen] = useState(false);

    return (
        <div className="border-l border-solid bg-neutral-900 border-zinc-950 border-opacity-10">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <nav
                    className={`flex flex-col w-[18%] max-md:ml-0 max-md:w-full transition-transform duration-300 ${
                        isNavOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0`}
                >
                    <div className="flex flex-col grow px-6 pt-8 pb-20 mx-auto w-full border-r border-solid bg-neutral-900 border-white border-opacity-10 max-md:px-5">
                        <Image
                            src="http://b.io/ext_97-"
                            alt="Logo"
                            width={214}
                            height={41}
                            className="self-center max-w-full"
                        />
                        <div className="flex flex-col justify-center items-start px-8 py-4 mt-14 w-full text-lg font-medium capitalize whitespace-nowrap bg-white rounded-[50px] text-neutral-900 max-md:px-5 max-md:mt-10">
                            <div className="flex gap-3.5 justify-center">
                                <Image
                                    src="http://b.io/ext_98-"
                                    alt="Home icon"
                                    width={22}
                                    height={22}
                                    className="shrink-0"
                                />
                                <div>Home</div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-start px-8 py-5 mt-5 text-lg tracking-normal leading-7 whitespace-nowrap text-zinc-400 max-md:px-5">
                            <div className="flex gap-3.5 justify-center">
                                <Image
                                    src="http://b.io/ext_99-"
                                    alt="Discover icon"
                                    width={22}
                                    height={22}
                                    className="shrink-0 my-auto"
                                />
                                <div>Discover</div>
                            </div>
                        </div>
                        <div className="flex gap-3.5 justify-center self-start mt-9 ml-8 text-lg tracking-normal leading-7 whitespace-nowrap text-zinc-400 max-md:ml-2.5">
                            <Image
                                src="http://b.io/ext_100-"
                                alt="Profile icon"
                                width={22}
                                height={22}
                                className="shrink-0 my-auto"
                            />
                            <div>Profile</div>
                        </div>
                        <div className="flex gap-2.5 justify-between mt-[971px] max-md:mt-10">
                            <Image
                                src="http://b.io/ext_101-"
                                alt="User avatar"
                                width={60}
                                height={60}
                                className="shrink-0"
                            />
                            <div className="flex flex-col justify-center my-auto">
                                <div className="text-lg font-semibold leading-5 text-white">
                                    0xrxc.....d67579
                                </div>
                                <div className="flex gap-1 pr-3.5 mt-2 text-sm font-medium leading-5 text-zinc-400">
                                    <div>2,000 &OVA</div>
                                    <Image
                                        src="http://b.io/ext_102-"
                                        alt="OVA token icon"
                                        width={14}
                                        height={14}
                                        className="shrink-0 my-auto"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <main className="flex flex-col ml-5 w-[82%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow max-md:max-w-full">
                        <header className="flex gap-5 justify-end items-start p-7 w-full border-l border-solid bg-neutral-900 border-white border-opacity-10 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
                            <div className="flex gap-2.5 text-2xl font-medium capitalize text-white text-opacity-80">
                                <Image
                                    src="http://b.io/ext_103-"
                                    alt="Sun icon"
                                    width={39}
                                    height={40}
                                    className="shrink-0"
                                />
                                <div className="flex-auto my-auto">
                                    Good morning, John
                                </div>
                            </div>
                            <div className="flex gap-2.5 justify-between">
                                <div className="flex flex-col">
                                    <div className="text-sm font-semibold tracking-normal leading-5 text-stone-300">
                                        0xrxc.....d67579
                                    </div>
                                    <div className="flex gap-1 self-end mt-1 text-xs font-medium leading-4 text-lime-300">
                                        <Image
                                            src="http://b.io/ext_104-"
                                            alt="OVA token icon"
                                            width={11}
                                            height={10}
                                            className="shrink-0 my-auto"
                                        />
                                        <div>2,000 &OVA</div>
                                    </div>
                                </div>
                                <Image
                                    src="http://b.io/ext_105-"
                                    alt="User avatar"
                                    width={37}
                                    height={37}
                                    className="shrink-0 self-start"
                                />
                            </div>
                        </header>
                        <section className="flex flex-col justify-center bg-white max-md:max-w-full">
                            <div className="flex overflow-hidden relative flex-col items-end px-16 pt-20 pb-8 w-full min-h-[362px] max-md:px-5 max-md:max-w-full">
                                <Image
                                    src="http://b.io/ext_106-"
                                    alt="Background"
                                    layout="fill"
                                    objectFit="cover"
                                />
                                <div className="flex relative gap-3 mt-52 max-md:mt-10">
                                    <button
                                        type="button" // Add type attribute
                                        title="Button 1" // Add title attribute with descriptive text
                                        className="flex justify-center items-center p-3 border border-solid bg-white bg-opacity-20 border-neutral-200 border-opacity-30 h-[46px] rounded-[500px] w-[46px]"
                                        onClick={() =>
                                            console.log("Button 1 clicked")
                                        }
                                    >
                                        <Image
                                            src="http://b.io/ext_107-"
                                            alt="Icon 1"
                                            width={24}
                                            height={24}
                                            className="transition-opacity duration-300 hover:opacity-80"
                                        />
                                    </button>
                                </div>
                                <button
                                    type="button" // Add type attribute
                                    title="Button 1" // Add title attribute with descriptive text
                                    className="flex justify-center items-center p-3 border border-solid bg-white bg-opacity-20 border-neutral-200 border-opacity-30 h-[46px] rounded-[500px] w-[46px]"
                                    onClick={() =>
                                        console.log("Button 2 clicked")
                                    }
                                >
                                    <Image
                                        src="http://b.io/ext_108-"
                                        alt="Icon 2"
                                        width={24}
                                        height={24}
                                        className="transition-opacity duration-300 hover:opacity-80"
                                    />
                                </button>
                                <button
                                    type="button" // Add type attribute
                                    title="Button 1" // Add title attribute with descriptive text
                                    className="flex justify-center items-center p-3 border border-solid bg-white bg-opacity-20 border-neutral-200 border-opacity-30 h-[46px] rounded-[500px] w-[46px]"
                                    onClick={() =>
                                        console.log("Button 3 clicked")
                                    }
                                >
                                    <Image
                                        src="http://b.io/ext_109-"
                                        alt="Icon 3"
                                        width={24}
                                        height={24}
                                        className="transition-opacity duration-300 hover:opacity-80"
                                    />
                                </button>
                                <button
                                    className="justify-center px-4 py-3 text-xs font-semibold text-white border border-solid bg-white bg-opacity-20 border-neutral-200 border-opacity-30 rounded-[400.862px] max-md:px-5 transition-opacity duration-300 hover:opacity-80"
                                    onClick={() =>
                                        console.log("Edit profile clicked")
                                    }
                                >
                                    Edit profile
                                </button>
                            </div>
                        </section>
                        <div className="flex z-10 gap-5 items-end mx-7 mt-0 max-md:flex-wrap max-md:mr-2.5">
                            <div className="flex flex-col self-stretch py-px">
                                <Image
                                    src="http://b.io/ext_110-"
                                    alt="User avatar"
                                    width={160}
                                    height={158}
                                    className="max-w-full"
                                />
                                <div className="flex gap-4 pr-2 mt-11 text-3xl font-semibold tracking-normal leading-7 text-white max-md:mt-10">
                                    <div>The pancake chief</div>
                                    <Image
                                        src="http://b.io/ext_111-"
                                        alt="Verified icon"
                                        width={26}
                                        height={26}
                                        className="shrink-0 my-auto"
                                    />
                                </div>
                                <div className="flex gap-1 justify-center mt-2">
                                    <div className="text-xl tracking-normal leading-8 text-zinc-400">
                                        @pancakeguy
                                    </div>
                                    <div className="justify-center px-2.5 py-1 my-auto text-xs leading-4 text-white border border-solid bg-neutral-800 border-white border-opacity-10 rounded-[44.113px]">
                                        OVA TOKEN: 10
                                    </div>
                                </div>
                                <div className="flex flex-col px-5 py-4 mt-9 w-full text-sm rounded-3xl bg-zinc-900">
                                    <div className="font-semibold tracking-normal text-white leading-[143%]">
                                        CEO @ Slack
                                    </div>
                                    <div className="mt-5 text-base leading-7 text-neutral-200 max-md:mr-1.5">
                                        Web3 dude, focusing on getting more foes
                                        friends and collections, WAGMI, Web3
                                    </div>
                                    <div className="flex gap-5 justify-between mt-8 text-lg whitespace-nowrap">
                                        <div className="flex gap-2.5">
                                            <div className="my-auto font-semibold leading-[111%] text-neutral-200">
                                                752
                                            </div>
                                            <div className="font-medium capitalize text-zinc-500">
                                                Following
                                            </div>
                                        </div>
                                        <div className="flex gap-2.5">
                                            <div className="my-auto font-semibold leading-[111%] text-neutral-200">
                                                11k
                                            </div>
                                            <div className="font-medium capitalize text-zinc-500">
                                                Followers
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 justify-between py-1.5 pr-1.5 mt-5 leading-[143%] text-zinc-400">
                                        <div className="flex gap-2 justify-between">
                                            <Image
                                                src="http://b.io/ext_112-"
                                                alt="Icon 1"
                                                width={18}
                                                height={18}
                                                className="shrink-0 self-start"
                                            />
                                            <div>Content creator</div>
                                        </div>
                                        <div className="flex gap-2 justify-between">
                                            <Image
                                                src="http://b.io/ext_113-"
                                                alt="Icon 2"
                                                width={18}
                                                height={18}
                                                className="shrink-0 self-start"
                                            />
                                            <div>Web3</div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Image
                                                src="http://b.io/ext_114-"
                                                alt="Icon 3"
                                                width={19}
                                                height={18}
                                                className="shrink-0 self-start"
                                            />
                                            <div>Dec 2021</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col px-5 py-5 mt-9 w-full rounded-3xl bg-zinc-900">
                                    <div className="text-sm font-medium uppercase text-zinc-500">
                                        BADGES
                                    </div>
                                    <div className="flex gap-3 justify-between py-1.5 mt-4 text-xs leading-4 text-zinc-400">
                                        {badges.map((badge, index) => (
                                            <Badge
                                                key={index}
                                                imageUrl={badge.imageUrl}
                                                altText={badge.altText}
                                                title={badge.title}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col px-5 py-4 mt-9 w-full rounded-3xl bg-zinc-900">
                                    <div className="text-sm font-medium uppercase text-zinc-500">
                                        SOCIALS
                                    </div>
                                    <div className="flex gap-4 justify-between py-1.5 mt-4">
                                        {socialIcons.map((icon, index) => (
                                            <SocialIcon
                                                key={index}
                                                imageUrl={icon.imageUrl}
                                                altText={icon.altText}
                                                onClick={icon.onClick}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col px-5 py-4 mt-9 w-full rounded-3xl bg-zinc-900">
                                    <div className="text-sm font-medium uppercase text-zinc-500">
                                        FAVOURITE NFT
                                    </div>
                                    <div className="flex gap-1.5 py-1.5 mt-4">
                                        {favoriteNFTs.map((nft, index) => (
                                            <FavoriteNFT
                                                key={index}
                                                imageUrl={nft.imageUrl}
                                                altText={nft.altText}
                                                aspectRatio={nft.aspectRatio}
                                                width={nft.width}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="shrink-0 mt-20 w-px border border-solid bg-white bg-opacity-10 border-white border-opacity-10 h-[990px] max-md:mt-10" />
                            <div className="flex flex-col pt-2.5 pb-px mt-32 max-md:mt-10 max-md:max-w-full">
                                <div className="flex flex-col px-6 py-6 rounded-2xl border border-solid border-neutral-700 max-md:px-5 max-md:max-w-full">
                                    <div className="text-base font-medium text-white uppercase max-md:max-w-full">
                                        Featured
                                    </div>
                                    <div className="mt-11 max-md:mt-10 max-md:max-w-full">
                                        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                                            <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                                                <Image
                                                    src="http://b.io/ext_115-"
                                                    alt="Featured image 1"
                                                    width={1000}
                                                    height={1090}
                                                    className="grow w-full border-2 border-solid aspect-[1.09] border-white border-opacity-10 max-md:mt-4"
                                                />
                                            </div>
                                            <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                                                <div className="flex flex-col grow pt-4 w-full rounded-xl border-2 border-solid bg-zinc-900 border-white border-opacity-10 max-md:mt-4">
                                                    <div className="flex flex-col px-4 text-white">
                                                        <div className="text-xs leading-4 text-neutral-400">
                                                            Post
                                                        </div>
                                                        <div className="mt-7 text-sm font-semibold leading-5">
                                                            WHAT IS NFT
                                                        </div>
                                                        <div className="mt-4 text-xs leading-5">
                                                            <span className="text-neutral-400">
                                                                NFT stands for
                                                                Non-Fungible
                                                                Token. It's a
                                                                type of digital
                                                                asset that
                                                                represents
                                                                ownership or
                                                                proof of
                                                                authenticity of
                                                                a unique item or
                                                                piece of content
                                                                using blockchain
                                                                technology.
                                                                Unlike
                                                                cryptocurrencies
                                                                such as Bitcoin
                                                                or Ethereum,
                                                                which are
                                                                fungible and can
                                                                be exchanged on
                                                                a one-to-one
                                                                basis, NFTs are
                                                                indivisible,
                                                                exchanged on a
                                                                one-to-one
                                                                basis, N.....
                                                            </span>
                                                            <span className="font-medium">
                                                                more
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col justify-center items-start px-3 py-3 mt-4 text-xs font-medium border-t border-solid bg-neutral-900 border-white border-opacity-10 text-zinc-400 max-md:pr-5">
                                                        <div className="justify-center p-2 border border-solid bg-zinc-900 border-zinc-800 rounded-[400.862px]">
                                                            32 Views
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                                                <div className="flex flex-col grow pt-4 mx-auto w-full rounded-xl border-2 border-solid bg-zinc-900 border-white border-opacity-10 max-md:mt-4">
                                                    <div className="flex flex-col px-3 text-xs leading-4 text-zinc-400">
                                                        <div className="text-neutral-400">
                                                            Event
                                                        </div>
                                                        <div className="mt-7 text-sm font-semibold leading-5 text-white">
                                                            MINT DAY
                                                        </div>
                                                        <Image
                                                            src="http://b.io/ext_116-"
                                                            alt="Event image"
                                                            width={278}
                                                            height={95}
                                                            className="self-center mt-2.5 aspect-[2.94]"
                                                        />
                                                        <div className="flex gap-1.5 justify-center self-start mt-3.5">
                                                            <Image
                                                                src="http://b.io/ext_117-"
                                                                alt="Calendar icon"
                                                                width={12}
                                                                height={12}
                                                                className="shrink-0 my-auto"
                                                            />
                                                            <div>
                                                                Wed, 24 Jan,
                                                                15:00 - 20:00
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-1.5 justify-center self-start mt-2 leading-[204%]">
                                                            <Image
                                                                src="http://b.io/ext_118-"
                                                                alt="Location icon"
                                                                width={12}
                                                                height={12}
                                                                className="shrink-0 my-auto"
                                                            />
                                                            <div className="underline">
                                                                Virtual event
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-5 justify-between items-start px-3 py-2.5 mt-2 text-xs font-medium border-t border-solid bg-neutral-900 border-white border-opacity-10">
                                                        <div className="justify-center p-2 border border-solid bg-zinc-900 border-zinc-800 rounded-[400.862px] text-zinc-400">
                                                            32 Views
                                                        </div>
                                                        <button
                                                            className="justify-center px-2.5 py-2 bg-lime-300 rounded-[30px] text-neutral-900 transition-opacity duration-300 hover:opacity-80"
                                                            onClick={() =>
                                                                console.log(
                                                                    "Add to calendar clicked"
                                                                )
                                                            }
                                                        >
                                                            Add to calender
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-5 justify-between items-start self-start mt-12 text-xs leading-4 whitespace-nowrap text-neutral-400 max-md:flex-wrap max-md:mt-10">
                                    <button
                                        className="justify-center px-7 py-2.5 bg-neutral-800 rounded-[603.615px] max-md:px-5 transition-opacity duration-300 hover:opacity-80"
                                        onClick={() =>
                                            console.log("Post clicked")
                                        }
                                    >
                                        Post
                                    </button>
                                    <button
                                        className="justify-center px-5 py-2.5 bg-neutral-800 rounded-[603.615px] transition-opacity duration-300 hover:opacity-80"
                                        onClick={() =>
                                            console.log("Replies clicked")
                                        }
                                    >
                                        Replies
                                    </button>
                                    <button
                                        className="justify-center px-5 py-2.5 bg-white rounded-[603.615px] text-neutral-800 transition-opacity duration-300 hover:opacity-80"
                                        onClick={() =>
                                            console.log("Portfolio clicked")
                                        }
                                    >
                                        Portfolio
                                    </button>
                                    <button
                                        className="justify-center self-stretch px-5 py-2.5 bg-neutral-800 rounded-[603.615px] transition-opacity duration-300 hover:opacity-80"
                                        onClick={() =>
                                            console.log("Created clicked")
                                        }
                                    >
                                        Created
                                    </button>
                                    <button
                                        className="justify-center px-5 py-2.5 bg-neutral-800 rounded-[603.615px] transition-opacity duration-300 hover:opacity-80"
                                        onClick={() =>
                                            console.log("Stats clicked")
                                        }
                                    >
                                        Stats
                                    </button>
                                    <button
                                        className="justify-center self-stretch px-5 py-2.5 bg-neutral-800 rounded-[603.615px] transition-opacity duration-300 hover:opacity-80"
                                        onClick={() =>
                                            console.log("Experience clicked")
                                        }
                                    >
                                        Experience
                                    </button>
                                </div>
                                <div className="flex flex-col p-6 mt-8 rounded-2xl border border-solid border-neutral-700 max-md:px-5 max-md:max-w-full">
                                    <div className="text-base font-medium text-white uppercase max-md:max-w-full">
                                        NFTS
                                    </div>
                                    <div className="flex gap-5 justify-between px-0.5 mt-5 w-full whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                                        <div className="flex gap-2 text-xs leading-4 text-neutral-400 max-md:flex-wrap">
                                            <div className="justify-center p-3 bg-white rounded-[50px] text-neutral-800">
                                                All(20)
                                            </div>
                                            <div className="justify-center p-3 bg-neutral-800 rounded-[50px]">
                                                Complete(4)
                                            </div>
                                            <div className="justify-center p-3 bg-neutral-800 rounded-[50px]">
                                                Domain(4)
                                            </div>
                                            <div className="justify-center p-3 bg-neutral-800 rounded-[50px]">
                                                Collectibles(4)
                                            </div>
                                            <div className="justify-center p-3 bg-neutral-800 rounded-[500px]">
                                                Metaverse(4)
                                            </div>
                                            <div className="justify-center p-3 bg-neutral-800 rounded-[500px]">
                                                Art(4)
                                            </div>
                                        </div>
                                        <div className="flex gap-1.5 px-2.5 py-3 text-sm font-medium text-white rounded-lg border border-solid bg-neutral-800 border-zinc-800">
                                            <div className="my-auto">
                                                Filters
                                            </div>
                                            <Image
                                                src="http://b.io/ext_119-"
                                                alt="Filter icon"
                                                width={14}
                                                height={14}
                                                className="shrink-0"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-11 max-md:mt-10 max-md:max-w-full">
                                        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                                            {portfolioItems.map(
                                                (item, index) => (
                                                    <PortfolioItem
                                                        key={index}
                                                        imageUrl={item.imageUrl}
                                                        altText={item.altText}
                                                        title={item.title}
                                                        itemCount={
                                                            item.itemCount
                                                        }
                                                        isHidden={item.isHidden}
                                                        onClick={item.onClick}
                                                    />
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Profile;
