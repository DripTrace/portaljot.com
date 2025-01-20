import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import imagesLoaded from "imagesloaded";

interface ItemProps {
	el: HTMLElement;
	totalCells: number;
}

class Item {
	DOM: {
		el: HTMLElement | null;
		inner: NodeListOf<HTMLElement> | null;
		innerWrap: NodeListOf<HTMLElement> | null;
	};
	totalCells: number;

	constructor(DOM_el: HTMLElement, totalCells: number) {
		this.DOM = {
			el: DOM_el,
			inner: null,
			innerWrap: null,
		};
		this.totalCells = totalCells;
		this.layout();
		this.setCSSValues();
	}

	layout() {
		if (!this.DOM.el) return;

		const text = this.DOM.el.dataset.text || "";
		let newHTML = "";
		for (let i = 0; i < this.totalCells; ++i) {
			newHTML += `<div class="gtext__box"><div class="gtext__box-inner">${text}</div></div>`;
		}
		this.DOM.el.innerHTML = newHTML;
		this.DOM.innerWrap = this.DOM.el.querySelectorAll(".gtext__box");
		this.DOM.inner = this.DOM.el.querySelectorAll(".gtext__box-inner");
	}

	setCSSValues() {
		if (!this.DOM.el || !this.DOM.inner) return;

		const computedWidth = window.getComputedStyle(this.DOM.inner[0]).width;
		this.DOM.el.style.setProperty("--text-width", computedWidth);
		this.DOM.el.style.setProperty("--gsplits", this.totalCells.toString());

		const offset = parseFloat(computedWidth) / this.totalCells;
		this.DOM.inner.forEach((inner, pos) => {
			gsap.set(inner, { left: offset * -pos });
		});
	}
}

const ItemComponent: React.FC<ItemProps> = ({ el, totalCells }) => {
	const itemRef = useRef<Item | null>(null);

	useEffect(() => {
		itemRef.current = new Item(el, totalCells);

		const handleResize = () => {
			itemRef.current?.setCSSValues();
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [el, totalCells]);

	return null;
};

export const preloadImages = (selector = "img"): Promise<void> => {
	return new Promise<void>((resolve) => {
		imagesLoaded(
			document.querySelectorAll(selector),
			{ background: true },
			() => resolve()
		);
	});
};

export const preloadFonts = (): Promise<void> => {
	return new Promise((resolve) => {
		document.fonts.ready.then(() => {
			resolve();
		});
	});
};

export { ItemComponent as Item };
