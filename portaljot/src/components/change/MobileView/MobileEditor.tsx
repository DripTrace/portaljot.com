"use client";

import * as fabric from "fabric";
// import { Canvas } from "fabric";
import { useContext, useEffect } from "react";
import { observer } from "mobx-react";
import { StoreContext } from "@/store/change";
import { ElementsPanel } from "../panels/ElementsPanel";
import { TimeLine } from "../TimeLine";
import { Resources } from "../Resources";
import { Menu } from "../Menu";
import { Footer } from "../Footer";

const MobileEditor = observer(() => {
	const store = useContext(StoreContext);

	useEffect(() => {
		const canvas = new fabric.Canvas("canvas", {
			height: 400,
			width: 200,
			backgroundColor: "#ededed",
		});

		// Update these lines
		(fabric as any).Object.prototype.set({
			transparentCorners: false,
			cornerColor: "#00a0f5",
			cornerStyle: "circle",
			cornerStrokeColor: "#0063d8",
			cornerSize: 10,
		});

		canvas.on("mouse:down", function (e) {
			if (!e.target) {
				store.setSelectedElement(null);
			}
		});

		store.setCanvas(canvas);
		function render() {
			canvas.renderAll();
			requestAnimationFrame(render);
		}
		requestAnimationFrame(render);
	}, [store]);

	return (
		<div className="grid grid-cols-12 gap-2 text-center py-2 md:py-8">
			<div className="col-span-3">
				<Menu />
			</div>
			<div className="col-span-3">
				<Resources />
			</div>
			<div
				className="col-span-6 text-center py-2 md:py-8"
				id="grid-canvas-container"
			>
				<canvas id="canvas" />
				<div className="col-span-6 ">
					<TimeLine />
				</div>
				<div className="col-span-7">
					<ElementsPanel />
				</div>
			</div>

			<Footer />
		</div>
	);
});

export default MobileEditor;
