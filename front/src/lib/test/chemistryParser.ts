// utils/chemistryParser.ts
export function fixChemistryNotation(text: string): string {
	let fixed = text.replace(/ce{([^}]+)}/g, "\\ce{$1}");
	fixed = fixed.replace(/(?<!\\)\\ce{/g, "\\\\ce{");
	fixed = fixed.replace(/```mermaid\s*graph\s+TD/g, "```mermaid\ngraph TD");
	return fixed;
}
