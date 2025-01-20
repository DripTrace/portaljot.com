import MusicSwagger from "@/components/music/MusicSwagger";
// import spec from "./swagger-nexusconjure.json";
import Markdown from "react-markdown";
import MusicSection from "@/components/music/MusicSection";
import { spec } from "@/lib/music/swagger-suno-api";

export default function MusicDocs() {
    return (
        <>
            <MusicSection className="my-10">
                <article className="prose lg:prose-lg max-w-3xl pt-10">
                    <h1 className=" text-center text-indigo-900">API Docs</h1>
                    <Markdown>
                        {`                     
---
\`DripTrace/nexusconjure\` currently mainly implements the following APIs:

\`\`\`bash
- \`/music/api/generate\`: Generate music
- \`/music/v1/chat/completions\`: Generate music - Call the generate API in a format 
  that works with OpenAI’s API.
- \`/music/api/custom_generate\`: Generate music (Custom Mode, support setting lyrics, 
  music style, title, etc.)
- \`/music/api/generate_lyrics\`: Generate lyrics based on prompt
- \`/music/api/get\`: Get music information based on the id. Use “,” to separate multiple 
    ids.  If no IDs are provided, all music will be returned.
- \`/music/api/get_limit\`: Get quota Info
- \`/music/api/extend_audio\`: Extend audio length
- \`/music/api/clip\`:  Get clip information based on ID passed as query parameter \`id\`
- \`/music/api/concat\`: Generate the whole song from extensions
\`\`\`

Feel free to explore the detailed API parameters and conduct tests on this page.
                        `}
                    </Markdown>
                </article>
            </MusicSection>
            <MusicSection className="my-10">
                <article className="prose lg:prose-lg max-w-3xl py-10">
                    <h2 className="text-center">
                        Details of the API and testing it online
                    </h2>
                    <p className="text-red-800 italic">
                        This is just a demo, bound to a test account. Please do
                        not use it frequently, so that more people can test
                        online.
                    </p>
                </article>

                <div className=" border p-4 rounded-2xl shadow-xl hover:shadow-none duration-200">
                    <MusicSwagger spec={spec} />
                </div>
            </MusicSection>
        </>
    );
}
