"use client";

import { useEffect, useState, useContext, useRef } from "react";
import { observer } from "mobx-react";
import { Resources } from "./Resources";
import { ElementsPanel } from "./panels/ElementsPanel";
import { Menu } from "./Menu";
import { TimeLine } from "./TimeLine";
import { StoreContext } from "@/store/change";
import { JoyrideComponent } from "./entity/Onboarding/Joyride";
import JoyrideSteps from "./entity/Onboarding/Steps";
import { Footer } from "./Footer";
import { Canvas, Object as FabricObject } from "fabric";

const Editor = observer(() => {
	const store = useContext(StoreContext);
	const [isJoyrideRunning, setIsJoyrideRunning] = useState(false);
	const canvasRef = useRef<Canvas | null>(null);

	useEffect(() => {
		if (typeof window !== "undefined" && canvasRef.current === null) {
			const canvas = new Canvas("canvas", {
				height: 500,
				width: 800,
				backgroundColor: "#ededed",
			});

			canvasRef.current = canvas;

			// Set default properties for Fabric objects
			FabricObject.prototype.set({
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

			const render = () => {
				canvas.renderAll();
				requestAnimationFrame(render);
			};
			render();

			setIsJoyrideRunning(true);
		}

		// Cleanup function to dispose of the canvas on unmount
		return () => {
			if (canvasRef.current) {
				canvasRef.current.dispose();
				canvasRef.current = null;
			}
		};
	}, []); // Empty dependency array ensures this runs once on mount

	const joyrideSteps = JoyrideSteps();

	return (
		<>
			<JoyrideComponent
				steps={joyrideSteps}
				isRunning={isJoyrideRunning}
			/>

			<div className="grid grid-rows-[auto,1fr,20px] grid-cols-[72px,300px,1fr,250px] h-[100svh] welcome animation-menu-option">
				<div className="tile row-span-2 flex flex-col">
					<Menu />
				</div>
				<div className="row-span-2 flex flex-col overflow-scroll">
					<Resources />
				</div>
				<div
					id="grid-canvas-container"
					className="col-start-3 bg-slate-100 flex justify-center items-center"
				>
					<canvas id="canvas" className="h-full w-full" />
				</div>
				<div className="col-start-4 row-start-1 elements">
					<ElementsPanel />
				</div>

				<div className="col-start-3 row-start-2 col-span-2 relative px-2 py-1 md:px-[10px] md:py-[4px] overflow-scroll timeline">
					<TimeLine />
				</div>
			</div>
			<Footer />
		</>
	);
});

export default Editor;
