// components/Mermaid.tsx
import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import type { MermaidConfig } from "mermaid";

// Extended configuration type to include molecular diagram settings
interface ExtendedMermaidConfig extends MermaidConfig {
	molecule?: {
		padding?: number;
		useMaxWidth?: boolean;
	};
}

// Initialize mermaid with type assertion
mermaid.initialize({
	startOnLoad: true,
	theme: "default",
	securityLevel: "loose",
} as ExtendedMermaidConfig);

interface MermaidProps {
	chart: string;
}

export default function Mermaid({ chart }: MermaidProps) {
	const [svgContent, setSvgContent] = useState<string>("");
	const elementRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const renderDiagram = async () => {
			if (elementRef.current) {
				try {
					// Generate a unique ID for each render to avoid conflicts
					const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

					// Configure mermaid for this specific render if needed
					const config: ExtendedMermaidConfig = {
						theme: "default",
						securityLevel: "loose",
					};

					const { svg } = await mermaid.render(
						id,
						chart,
						elementRef.current
					);
					setSvgContent(svg);
				} catch (error) {
					console.error("Error rendering mermaid diagram:", error);
					setSvgContent(`
            <div class="p-4 text-red-500 bg-red-50 rounded border border-red-200">
              Error rendering molecular diagram. Please check the syntax.
            </div>
          `);
				}
			}
		};

		renderDiagram();
	}, [chart]);

	return (
		<div
			ref={elementRef}
			className="my-4 overflow-x-auto"
			dangerouslySetInnerHTML={{ __html: svgContent }}
		/>
	);
}
