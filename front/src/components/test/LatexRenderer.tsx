"use client";

import { useEffect, useRef } from "react";
import katex from "katex";

interface LatexProps {
	content: string;
	display?: boolean;
}

export function LatexRenderer({ content, display = false }: LatexProps) {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (containerRef.current) {
			try {
				katex.render(content, containerRef.current, {
					displayMode: display,
					throwOnError: false,
					strict: false,
					trust: false,
				});
			} catch (error) {
				console.error("LaTeX rendering error:", error);
				containerRef.current.textContent = content;
			}
		}
	}, [content, display]);

	return <div ref={containerRef} className="latex-container" />;
}
