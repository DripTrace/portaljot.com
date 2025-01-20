"use client";

import { useEffect, useRef } from "react";
import { Item as ItemType, preloadFonts, preloadImages } from "./Item";
// import { Item, preloadImages, preloadFonts } from '../components/Item';

// Add this type definition above the component or in a separate file
class Item {
	constructor(element: HTMLElement, value: number) {}
}

const ItemComponent: React.FC = () => {
	const textRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const init = async () => {
			await Promise.all([preloadImages(), preloadFonts()]);

			if (textRef.current) {
				new Item(textRef.current, 4);
			}
		};

		init();
	}, []);

	return (
		<div className="container mx-auto">
			<div ref={textRef} className="gtext" data-text="Your text here">
				{/* Content will be dynamically generated */}
			</div>
		</div>
	);
};

export default ItemComponent;
