export const spec = {
    openapi: "3.1.0",
    info: {
        title: "nexusconure-music",
        description:
            "Use API to call the music generation service of Suno.ai and easily integrate it into agents like GPTs.",
        version: "1.1.0",
    },
    tags: [
        {
            name: "default",
        },
    ],
    paths: {
        "/music/api/generate": {
            post: {
                summary: "Generate audio based on Prompt.",
                description:
                    "It will automatically fill in the lyrics.\n\n2 audio files will be generated for each request, consuming a total of 10 credits.\n\n`wait_audio` can be set to API mode:\n\n\u2022 By default, it is set to `false`, which indicates the background mode. It will only return audio task information, and you will need to call the get API to retrieve detailed audio information.\n\n\u2022 If set to `true`, it simulates synchronous mode. The API will wait for a maximum of 100s until the audio is generated, and will directly return the audio link and other information. Recommend using in GPTs and other agents.",
                tags: ["default"],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: [
                                    "prompt",
                                    "make_instrumental",
                                    "wait_audio",
                                ],
                                properties: {
                                    prompt: {
                                        type: "string",
                                        description: "Prompt",
                                        example:
                                            // "A melodic dubstep tune beating to the echos of space bass. There is a buildup to a heavy drop.",
                                            "a rainbow river flowing with the wind",
                                    },
                                    make_instrumental: {
                                        type: "boolean",
                                        description:
                                            "Whether to generate instrumental music",
                                        example: "false",
                                    },
                                    model: {
                                        type: "string",
                                        description:
                                            "Model name ,default is chirp-v3-5",
                                        example: "chirp-v3-5|chirp-v3-0",
                                    },
                                    wait_audio: {
                                        type: "boolean",
                                        description:
                                            "Whether to wait for music generation, default is false, directly return audio task information; set to true, will wait for up to 100s until the audio is generated.",
                                        example: "false",
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "success",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        required: ["0", "1"],
                                        properties: [
                                            {
                                                $ref: "#/components/music/schemas/audio_info",
                                            },
                                            {
                                                $ref: "#/components/music/schemas/audio_info",
                                            },
                                        ],
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/music/v1/chat/completions": {
            post: {
                summary:
                    "Generate audio based on Prompt - OpenAI API format compatibility.",
                description:
                    "Convert the `/music/api/generate` API to be compatible with the OpenAI `/music/v1/chat/completions` API format. \n\nGenerally used in OpenAI compatible clients.",
                tags: ["default"],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["prompt"],
                                properties: {
                                    prompt: {
                                        type: "string",
                                        description: "Prompt",
                                        example:
                                            "A melodic dubstep tune beating to the echos of space bass. There is a buildup to a heavy drop.",
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "success",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        data: {
                                            type: "string",
                                            description:
                                                "Text description for music, with details like title, album cover, lyrics, and more.",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/music/api/custom_generate": {
            post: {
                summary: "Generate Audio - Custom Mode",
                description:
                    "The custom mode enables users to provide additional details about the music, such as music genre, lyrics, and more.\n\n 2 audio files will be generated for each request, consuming a total of 10 credits. \n\n `wait_audio` can be set to API mode:\n\n\u2022 By default, it is set to false, which indicates the background mode. It will only return audio task information, and you will need to call the get API to retrieve detailed audio information.\n\n\u2022 If set to true, it simulates synchronous mode. The API will wait for a maximum of 100s until the audio is generated, and will directly return the audio link and other information. Recommend using in GPTs and other agents.",
                tags: ["default"],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["prompt", "tags", "title"],
                                properties: {
                                    prompt: {
                                        type: "string",
                                        description:
                                            "Detailed prompt, including information such as music lyrics.",
                                        example:
                                            "[Verse 1]\nCruel flames of war engulf this land\nBattlefields filled with death and dread\nInnocent souls in darkness, they rest\nMy heart trembles in this silent test\n\n[Verse 2]\nPeople weep for loved ones lost\nBattered bodies bear the cost\nSeeking peace and hope once known\nOur grief transforms to hearts of stone\n\n[Chorus]\nSilent battlegrounds, no birds' song\nShadows of war, where we don't belong\nMay flowers of peace bloom in this place\nLet's guard this precious dream with grace\n\n[Bridge]\nThrough the ashes, we will rise\nHand in hand, towards peaceful skies\nNo more sorrow, no more pain\nTogether, we'll break these chains\n\n[Chorus]\nSilent battlegrounds, no birds' song\nShadows of war, where we don't belong\nMay flowers of peace bloom in this place\nLet's guard this precious dream with grace\n\n[Outro]\nIn unity, our strength will grow\nA brighter future, we'll soon know\nFrom the ruins, hope will spring\nA new dawn, we'll together bring",
                                    },
                                    tags: {
                                        type: "string",
                                        description: "Music genre",
                                        example: "pop metal male melancholic",
                                    },
                                    title: {
                                        type: "string",
                                        description: "Music title",
                                        example: "Silent Battlefield",
                                    },
                                    make_instrumental: {
                                        type: "boolean",
                                        description:
                                            "Whether to generate instrumental music",
                                        example: "false",
                                    },
                                    model: {
                                        type: "string",
                                        description:
                                            "Model name ,default is chirp-v3-5",
                                        example: "chirp-v3-5|chirp-v3-0",
                                    },
                                    wait_audio: {
                                        type: "boolean",
                                        description:
                                            "Whether to wait for music generation, default is false, directly return audio task information; set to true, will wait for up to 100s until the audio is generated.",
                                        example: "false",
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "success",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        required: ["0", "1"],
                                        properties: [
                                            {
                                                $ref: "#/components/music/schemas/audio_info",
                                            },
                                            {
                                                $ref: "#/components/music/schemas/audio_info",
                                            },
                                        ],
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/music/api/extend_audio": {
            post: {
                summary: "Extend audio length.",
                description: "Extend audio length.",
                tags: ["default"],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["audio_id"],
                                properties: {
                                    audio_id: {
                                        type: "string",
                                        description:
                                            "The ID of the audio clip to extend.",
                                        example:
                                            "e76498dc-6ab4-4a10-a19f-8a095790e28d",
                                    },
                                    prompt: {
                                        type: "string",
                                        description:
                                            "Detailed prompt, including information such as music lyrics.",
                                        example:
                                            "[lrc]Silent battlegrounds, no birds' song\nShadows of war, where we don't belong\nMay flowers of peace bloom in this place\nLet's guard this precious dream with grace\n[endlrc]",
                                    },
                                    continue_at: {
                                        type: "string",
                                        description:
                                            "Extend a new clip from a song at mm:ss(e.g. 00:30). Default extends from the end of the song.",
                                        example: "109.96",
                                    },
                                    title: {
                                        type: "string",
                                        description: "Music title",
                                        example: "",
                                    },
                                    tags: {
                                        type: "string",
                                        description: "Music genre",
                                        example: "",
                                    },
                                    model: {
                                        type: "string",
                                        description:
                                            "Model name ,default is chirp-v3-5",
                                        example: "chirp-v3-5|chirp-v3-0",
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/music/api/generate_lyrics": {
            post: {
                summary: "Generate lyrics based on Prompt.",
                description: "Generate lyrics based on Prompt.",
                tags: ["default"],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["prompt"],
                                properties: {
                                    prompt: {
                                        type: "string",
                                        description: "Prompt",
                                        example: "A soothing lullaby",
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "success",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        text: {
                                            type: "string",
                                            description: "Lyrics",
                                        },
                                        title: {
                                            type: "string",
                                            description: "music title",
                                        },
                                        status: {
                                            type: "string",
                                            description: "Status",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/music/api/get": {
            get: {
                summary: "Get audio information",
                description: "",
                tags: ["default"],
                parameters: [
                    {
                        in: "query",
                        name: "ids",
                        description:
                            "Audio IDs, separated by commas. Leave blank to return a list of all music.",
                        required: false,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    "200": {
                        description: "success",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        required: ["0", "1"],
                                        properties: [
                                            {
                                                $ref: "#/components/music/schemas/audio_info",
                                            },
                                            {
                                                $ref: "#/components/music/schemas/audio_info",
                                            },
                                        ],
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/music/api/get_limit": {
            get: {
                summary: "Get quota information.",
                description: "",
                tags: ["default"],
                responses: {
                    "200": {
                        description: "success",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    required: [
                                        "credits_left",
                                        "period",
                                        "monthly_limit",
                                        "monthly_usage",
                                    ],
                                    properties: {
                                        credits_left: {
                                            type: "number",
                                            description:
                                                "Remaining credits,Each generated audio consumes 5 credits.",
                                        },
                                        period: {
                                            type: "string",
                                            description: "Period",
                                        },
                                        monthly_limit: {
                                            type: "number",
                                            description: "Monthly limit",
                                        },
                                        monthly_usage: {
                                            type: "number",
                                            description: "Monthly usage",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/music/api/clip": {
            get: {
                summary: "Get clip information based on ID.",
                description:
                    "Retrieve specific clip information using the provided clip ID as a query parameter.",
                tags: ["default"],
                parameters: [
                    {
                        name: "id",
                        in: "query",
                        required: true,
                        description: "Clip ID",
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    "200": {
                        description: "success",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/music/schemas/audio_info",
                                },
                            },
                        },
                    },
                    "400": {
                        description: "Missing parameter id",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        error: {
                                            type: "string",
                                            example: "Missing parameter id",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    "500": {
                        description: "Internal server error",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        error: {
                                            type: "string",
                                            example: "Internal server error",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/music/api/concat": {
            post: {
                summary: "Generate the whole song from extensions.",
                description:
                    "Concatenate audio clips to generate a complete song using the provided clip ID.",
                tags: ["default"],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["clip_id"],
                                properties: {
                                    clip_id: {
                                        type: "string",
                                        description: "Clip ID",
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "success",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/music/schemas/audio_info",
                                },
                            },
                        },
                    },
                    "400": {
                        description: "Clip id is required",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        error: {
                                            type: "string",
                                            example: "Clip id is required",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    "402": {
                        description: "Payment required",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        error: {
                                            type: "string",
                                            example: "Payment required",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    "500": {
                        description: "Internal server error",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        error: {
                                            type: "string",
                                            example: "Internal server error",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    components: {
        schemas: {
            audio_info: {
                type: "object",
                required: [
                    "id",
                    "title",
                    "image_url",
                    "lyric",
                    "audio_url",
                    "video_url",
                    "created_at",
                    "model_name",
                    "status",
                    "gpt_description_prompt",
                    "prompt",
                    "type",
                    "tags",
                ],
                properties: {
                    id: {
                        type: "string",
                        description: "audio id",
                    },
                    title: {
                        type: "string",
                        description: "music title",
                    },
                    image_url: {
                        type: "string",
                        description: "music cover image",
                    },
                    lyric: {
                        type: "string",
                        description: "music lyric",
                    },
                    audio_url: {
                        type: "string",
                        description: "music download url",
                    },
                    video_url: {
                        type: "string",
                        description:
                            "Music video download link, can be used to share",
                    },
                    created_at: {
                        type: "string",
                        description: "Create time",
                    },
                    model_name: {
                        type: "string",
                        description: "suno model name, chirp-v3",
                    },
                    status: {
                        type: "string",
                        description:
                            "The generated states include submitted, queue, streaming, complete.",
                    },
                    gpt_description_prompt: {
                        type: "string",
                        description:
                            "Simple mode on user input prompt, Suno will generate formal prompts, lyrics, etc.",
                    },
                    prompt: {
                        type: "string",
                        description:
                            "The final prompt for executing the generation task, customized by the user in custom mode, automatically generated by Suno in simple mode.",
                    },
                    type: {
                        type: "string",
                        description: "Type",
                    },
                    tags: {
                        type: "string",
                        description:
                            "Music genre. User-provided in custom mode, automatically generated by Suno in simple mode.",
                    },
                },
                title: "audio_info",
                description: "Audio Info",
            },
        },
    },
};
