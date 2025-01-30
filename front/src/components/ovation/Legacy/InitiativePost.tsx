// import React from 'react';

// const CollaborationPost = () => {

//     // const randomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
//     // const randomString = () => {
//     //     const length = randomNumber(50, 100);
//     //     let result = '';
//     //     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ';
//     //     const charactersLength = characters.length;
//     //     for (let i = 0; i < length; i++) {
//     //         result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     //     }
//     //     return result;
//     // };

//     const categories = ["Twitter Space", "Open For Hire", "Hiring", "Open For Mentorship", "Podcast", "Open To Collaborate", "Grants", "Partnership"];
//     //const randomCategory = () => categories[Math.floor(Math.random() * categories.length)];

//     // const discData = {
//     //     name: `Username #${randomNumber(1, 99)}`,
//     //     username: `@username_#${randomNumber(1, 99)}`,
//     //     pfp: '/defaultPfp.svg',
//     //     description: randomString(),
//     //     category: randomCategory(),
//     // }

//     return (
//         <div className="rounded-lg border border-neutral-600 bg-bgcolor overflow-hidden w-72 h-96 flex flex-col justify-between">
//             <div>
//                 <div className="h-20 bg-ovteal"></div>
//                 <div className="p-4">
//                     <div className="relative flex flex-wrap">
//                         <img src={discData.pfp} alt="Profile" className="absolute -top-14 left-2 w-20 h-20 rounded-full bg-bgcolor border-4 border-bgcolor" />
//                         <div className="pt-6">
//                             <div className="text-ovteal font-bold">{discData.name}</div>
//                             <div className="text-neutral-500 text-xs font-light mb-3">{discData.username}</div>
//                             <div className="text-sm font-light mb-2 h-28 w-[254px] break-words">{discData.description}</div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="px-4 mb-2">
//                 <div className="text-sm font-semibold mb-2 border rounded border-ovteal text-center">{discData.category}</div>
//                 <button className="w-full bg-ovteal text-bgcolor rounded py-1 font-bold">Request Collaboration</button>
//             </div>
//         </div>
//     )
// }

// export default CollaborationPost;
