// // app/api/video/route.ts
// import  createRequestHandler  from 'next-video/request-handler';
// import { initializeApp } from 'firebase/app';
// import { getStorage, ref, getDownloadURL } from 'firebase/storage';
// import { firebaseConfig } from '@/config/firebase';

// const app = initializeApp(firebaseConfig);
// const storage = getStorage(app);

// const handler = createRequestHandler({
//   storage: {
//     // Custom storage implementation for Firebase
//     async get(assetId: string) {
//       try {
//         const videoRef = ref(storage, assetId);
//         const url = await getDownloadURL(videoRef);
//         return {
//           url,
//           contentType: 'video/mp4', // Adjust based on your video type
//           cacheControl: 'public, max-age=31536000, immutable'
//         };
//       } catch (error) {
//         console.error('Error getting video:', error);
//         return null;
//       }
//     }
//   }
// });

// export const GET = handler;

export {};
