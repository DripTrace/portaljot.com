// utils/responseProcessor.ts

function processChemicalEquations(text: string): string {
	// Fix \ce{} notation
	return (
		text
			.replace(/\\?ce{([^}]+)}/g, "\\ce{$1}")
			// Fix raw chemical equations without \ce
			.replace(
				/(?<!\\ce{)(\d*[A-Z][a-z]*\d*\s*(?:[+]\s*\d*[A-Z][a-z]*\d*\s*)*->(?:\s*\d*[A-Z][a-z]*\d*)+)/g,
				"\\ce{$1}"
			)
	);
}

function processMermaidDiagrams(text: string): string {
	let processed = text;

	// Find potential Mermaid diagram content
	const mermaidMatch = processed.match(
		/(?:mermaid|graph TD)[\s\S]*?(?=\n\n|\n[^\n]|$)/g
	);

	if (mermaidMatch) {
		mermaidMatch.forEach((diagram) => {
			// Clean up the diagram and wrap it properly
			const cleanDiagram = diagram
				.replace(/^mermaid\n?/, "")
				.replace(/^graph TD/, "graph TD")
				.trim();

			processed = processed.replace(
				diagram,
				"```mermaid\n" + cleanDiagram + "\n```"
			);
		});
	}

	return processed;
}

function processLaTeXEquations(text: string): string {
	return (
		text
			// Fix standalone math expressions
			.replace(/\$\$?\s*([^$]+?)\s*\$\$?/g, "$$\n$1\n$$")
			// Fix specific chemistry/math patterns
			.replace(/(\b[kK]\s*=\s*[A-Z]\s*e\^{[^}]+})/g, "$$\n$1\n$$")
			.replace(/(\b∆[GH]\s*=\s*[^,\n]+)/g, "$$\n$1\n$$")
	);
}

export function processResponse(text: string): string {
	let processed = text;

	// Process each type of content
	processed = processChemicalEquations(processed);
	processed = processMermaidDiagrams(processed);
	processed = processLaTeXEquations(processed);

	return processed;
}
