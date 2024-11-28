// // // "use client";

// // // import { fabric } from "fabric";
// // // // import { Canvas } from "fabric";
// // // import { useEffect, useState, useContext } from "react";
// // // import { observer } from "mobx-react";
// // // import { Resources } from "./Resources";
// // // import { ElementsPanel } from "./panels/ElementsPanel";
// // // import { Menu } from "./Menu";
// // // import { TimeLine } from "./TimeLine";
// // // import { StoreContext } from "@/store/change";

// // // import { JoyrideComponent } from "./entity/Onboarding/Joyride";
// // // import JoyrideSteps from "./entity/Onboarding/Steps";
// // // import { Footer } from "./Footer";
// // // import { IEvent } from "fabric/fabric-impl";

// // // const Editor = observer(() => {
// // // 	const store = useContext(StoreContext);
// // // 	const [isJoyrideRunning, setIsJoyrideRunning] = useState(false);

// // // 	useEffect(() => {
// // // 		const canvas = new fabric.Canvas("canvas", {
// // // 			height: 500,
// // // 			width: 800,
// // // 			backgroundColor: "#ededed",
// // // 		});
// // // 		(fabric as any).Object.prototype.set({
// // // 			transparentCorners: false,
// // // 			cornerColor: "#00a0f5",
// // // 			cornerStyle: "circle",
// // // 			cornerStrokeColor: "#0063d8",
// // // 			cornerSize: 10,
// // // 		});

// // // 		canvas.on("mouse:down", function (e: IEvent<MouseEvent>) {
// // // 			if (!e.target) {
// // // 				store.setSelectedElement(null);
// // // 			}
// // // 		});

// // // 		store.setCanvas(canvas);
// // // 		const render = () => {
// // // 			canvas.renderAll();
// // // 			requestAnimationFrame(render);
// // // 		};
// // // 		requestAnimationFrame(render);

// // // 		setIsJoyrideRunning(true);
// // // 	}, [store]);

// // // 	const joyrideSteps = JoyrideSteps(); // Use JoyrideSteps

// // // 	return (
// // // 		<>
// // // 			<JoyrideComponent
// // // 				steps={joyrideSteps}
// // // 				isRunning={isJoyrideRunning}
// // // 			/>

// // // 			<div className="grid grid-rows-[auto,1fr,20px] grid-cols-[72px,300px,1fr,250px] h-[100svh] welcome animation-menu-option">
// // // 				<div className="tile row-span-2 flex flex-col">
// // // 					<Menu />
// // // 				</div>
// // // 				<div className="row-span-2 flex flex-col overflow-scroll">
// // // 					<Resources />
// // // 				</div>
// // // 				<div
// // // 					id="grid-canvas-container"
// // // 					className="col-start-3 bg-slate-100 flex justify-center items-center"
// // // 				>
// // // 					<canvas id="canvas" className="h-full w-full" />
// // // 				</div>
// // // 				<div className="col-start-4 row-start-1 elements">
// // // 					<ElementsPanel />
// // // 				</div>

// // // 				<div className="col-start-3 row-start-2 col-span-2 relative px-2 py-1 md:px-[10px] md:py-[4px] overflow-scroll timeline">
// // // 					<TimeLine />
// // // 				</div>
// // // 			</div>
// // // 			<Footer />
// // // 		</>
// // // 	);
// // // });

// // // export default Editor;

// // "use client";

// // // import { fabric } from "fabric";
// // // import fabric from "fabric";
// // import * as fabric from "fabric";
// // import { useEffect, useState, useContext } from "react";
// // import { observer } from "mobx-react";
// // import { Resources } from "./Resources";
// // import { ElementsPanel } from "./panels/ElementsPanel";
// // import { Menu } from "./Menu";
// // import { TimeLine } from "./TimeLine";
// // import { StoreContext } from "@/store/change";

// // import { JoyrideComponent } from "./entity/Onboarding/Joyride";
// // import JoyrideSteps from "./entity/Onboarding/Steps";
// // import { Footer } from "./Footer";
// // import { Canvas, IEvent } from "fabric/fabric-impl";

// // const Editor = observer(() => {
// // 	const store = useContext(StoreContext);
// // 	const [isJoyrideRunning, setIsJoyrideRunning] = useState(false);

// // 	useEffect(() => {
// // 		console.log("current fabric: ", fabric);
// // 		const canvas: fabric.Canvas = new fabric.Canvas("canvas", {
// // 			height: 500,
// // 			width: 800,
// // 			backgroundColor: "#ededed",
// // 		});
// // 		// fabric.Object.prototype.transparentCorners = false;
// // 		// fabric.Object.prototype.cornerColor = "#00a0f5";
// // 		// fabric.Object.prototype.cornerStyle = "circle";
// // 		// fabric.Object.prototype.cornerStrokeColor = "#0063d8";
// // 		// fabric.Object.prototype.cornerSize = 10;
// // 		(fabric as any).Object.prototype.set({
// // 			transparentCorners: false,
// // 			cornerColor: "#00a0f5",
// // 			cornerStyle: "circle",
// // 			cornerStrokeColor: "#0063d8",
// // 			cornerSize: 10,
// // 		});

// // 		canvas.on("mouse:down", function (e) {
// // 			if (!e.target) {
// // 				store.setSelectedElement(null);
// // 			}
// // 		});

// // 		store.setCanvas(canvas as any);
// // 		fabric.util.requestAnimFrame(function render() {
// // 			canvas.renderAll();
// // 			fabric.util.requestAnimFrame(render);
// // 		});

// // 		setIsJoyrideRunning(true);
// // 	}, [store]);

// // 	const joyrideSteps = JoyrideSteps(); // Use JoyrideSteps

// // 	return (
// // 		<>
// // 			<JoyrideComponent
// // 				steps={joyrideSteps}
// // 				isRunning={isJoyrideRunning}
// // 			/>

// // 			<div className="grid grid-rows-[auto,1fr,20px] grid-cols-[72px,300px,1fr,250px] h-[100svh] welcome animation-menu-option">
// // 				<div className="tile row-span-2 flex flex-col">
// // 					<Menu />
// // 				</div>
// // 				<div className="row-span-2 flex flex-col overflow-scroll">
// // 					<Resources />
// // 				</div>
// // 				<div
// // 					id="grid-canvas-container"
// // 					className="col-start-3 bg-slate-100 flex justify-center items-center"
// // 				>
// // 					<canvas id="canvas" className="h-full w-full" />
// // 				</div>
// // 				<div className="col-start-4 row-start-1 elements">
// // 					<ElementsPanel />
// // 				</div>

// // 				<div className="col-start-3 row-start-2 col-span-2 relative px-2 py-1 md:px-[10px] md:py-[4px] overflow-scroll timeline">
// // 					<TimeLine />
// // 				</div>
// // 			</div>
// // 			<Footer />
// // 		</>
// // 	);
// // });

// // export default Editor;

// "use client";

// import { useEffect, useState, useContext } from "react";
// import { observer } from "mobx-react";
// import { Resources } from "./Resources";
// import { ElementsPanel } from "./panels/ElementsPanel";
// import { Menu } from "./Menu";
// import { TimeLine } from "./TimeLine";
// import { StoreContext } from "@/store/change";
// import { JoyrideComponent } from "./entity/Onboarding/Joyride";
// import JoyrideSteps from "./entity/Onboarding/Steps";
// import { Footer } from "./Footer";
// import { Canvas, Object as FabricObject } from "fabric";

// const Editor = observer(() => {
// 	const store = useContext(StoreContext);
// 	const [isJoyrideRunning, setIsJoyrideRunning] = useState(false);

// 	useEffect(() => {
// 		if (typeof window !== "undefined") {
// 			const canvas = new Canvas("canvas", {
// 				height: 500,
// 				width: 800,
// 				backgroundColor: "#ededed",
// 			});

// 			FabricObject.prototype.set({
// 				transparentCorners: false,
// 				cornerColor: "#00a0f5",
// 				cornerStyle: "circle",
// 				cornerStrokeColor: "#0063d8",
// 				cornerSize: 10,
// 			});

// 			canvas.on("mouse:down", function (e) {
// 				if (!e.target) {
// 					store.setSelectedElement(null);
// 				}
// 			});

// 			store.setCanvas(canvas);

// 			const render = () => {
// 				canvas.renderAll();
// 				requestAnimationFrame(render);
// 			};
// 			render();

// 			setIsJoyrideRunning(true);
// 		}
// 	}, [store]);

// 	const joyrideSteps = JoyrideSteps();

// 	return (
// 		<>
// 			<JoyrideComponent
// 				steps={joyrideSteps}
// 				isRunning={isJoyrideRunning}
// 			/>

// 			<div className="grid grid-rows-[auto,1fr,20px] grid-cols-[72px,300px,1fr,250px] h-[100svh] welcome animation-menu-option">
// 				<div className="tile row-span-2 flex flex-col">
// 					<Menu />
// 				</div>
// 				<div className="row-span-2 flex flex-col overflow-scroll">
// 					<Resources />
// 				</div>
// 				<div
// 					id="grid-canvas-container"
// 					className="col-start-3 bg-slate-100 flex justify-center items-center"
// 				>
// 					<canvas id="canvas" className="h-full w-full" />
// 				</div>
// 				<div className="col-start-4 row-start-1 elements">
// 					<ElementsPanel />
// 				</div>

// 				<div className="col-start-3 row-start-2 col-span-2 relative px-2 py-1 md:px-[10px] md:py-[4px] overflow-scroll timeline">
// 					<TimeLine />
// 				</div>
// 			</div>
// 			<Footer />
// 		</>
// 	);
// });

// export default Editor;

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
