export const VERTEX_API_CONFIG = {
	baseUrl: (location: string, projectId: string) =>
		`https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models`,
	modelVersions: {
		imagen: {
			default: "imagen-3.0-generate-001",
			fast: "imagen-3.0-fast-generate-001",
			legacy: "imagegeneration@006",
		},
	},
	maxTokens: {
		"imagen-3.0-generate-001": 480,
		"imagen-3.0-fast-generate-001": 480,
		"imagegeneration@006": 128,
	},
};
