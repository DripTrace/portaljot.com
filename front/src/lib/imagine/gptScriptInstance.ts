// // File: lib/gptscriptInstance.js
// import { GPTScript } from "@gptscript-ai/gptscript";

// const g = new GPTScript({
//   APIKey: process.env.OPENAI_API_KEY,
// });

// export default g;

import { GPTScript } from "@gptscript-ai/gptscript";

const g = new GPTScript({
	APIKey: process.env.OPENAI_API_KEY,
	//   waitForReady: true,
	//   timeout: 30000  // 30 seconds timeout
});

export default g;
