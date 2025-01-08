// "use client";

// import { useState } from "react";
// import { FiArrowLeft, FiArrowRight, FiCheck } from "react-icons/fi"; // Import icons
// import SwipeableViews from "react-swipeable-views";
// import MobileEditor from "../MobileView/MobileEditor";

// const styles = {
// 	slide: {
// 		padding: 5,
// 		color: "#fff",
// 		alignItems: "center",
// 		justifyContent: "center",
// 	},
// 	pagination: {
// 		display: "flex",
// 		marginTop: 10,
// 	},
// 	dot: {
// 		width: 10,
// 		height: 10,
// 		borderRadius: "50%",
// 		background: "#ccc",
// 		margin: "0 5px",
// 		cursor: "pointer",
// 	},
// 	activeDot: {
// 		background: "#000",
// 	},
// 	image: {
// 		maxWidth: "100%",
// 		maxHeight: "100%",
// 	},
// 	fullScreen: {
// 		height: "100vh",
// 	},
// };

// export const ReactSwipeable = ({ onSwipeComplete }: any) => {
// 	const [index, setIndex] = useState(0);
// 	const [showProcess, setShowProcess] = useState(true);

// 	const handlePagination = (index: number) => {
// 		setIndex(index);
// 	};

// 	const handleStep = (index: number) => {
// 		setIndex(index);
// 	};

// 	const handleSkip = () => {
// 		setShowProcess(false);
// 		localStorage.setItem("EditEvo_hideProcess", "true");
// 	};

// 	const handleNext = () => {
// 		if (index < 6) {
// 			setIndex(index + 1);
// 		}
// 	};

// 	const handleBack = () => {
// 		if (index > 0) {
// 			setIndex(index - 1);
// 		}
// 	};

// 	const handleDone = () => {
// 		setShowProcess(false);
// 		localStorage.setItem("EditEvo_hideProcess", "true");
// 		if (onSwipeComplete) {
// 			onSwipeComplete();
// 		}
// 	};

// 	if (localStorage.getItem("EditEvo_hideProcess") === "true") {
// 		return <MobileEditor />;
// 	}

// 	const slides = [
// 		{ title: "Introduction", image: "/change/introduction.jpg" },
// 		{ title: "Slide 1", image: "/change/menu_mobile.png" },
// 		{ title: "Slide 2", image: "/change/opations_mobile.png" },

// 		{ title: "Slide 4", image: "/change/canvas.png" },
// 		{ title: "Slide 5", image: "/change/elements_mobile.png" },
// 		{ title: "Slide 6", image: "/change/footer_mobile.png" },
// 		{ title: "Slide 3", image: "/change/profile_mobile.png" },
// 	];

// 	return (
// 		<div>
// 			{showProcess ? (
// 				<div className="w-full h-full">
// 					<SwipeableViews
// 						enableMouseEvents
// 						className="w-full h-full"
// 						index={index}
// 						onChangeIndex={handlePagination}
// 					>
// 						{slides.map((slide, idx) => (
// 							<div key={idx} style={styles.slide}>
// 								<img
// 									src={slide.image}
// 									alt={slide.title}
// 									style={styles.image}
// 								/>
// 								<p>{slide.title}</p>
// 							</div>
// 						))}
// 					</SwipeableViews>
// 					<div style={styles.pagination}>
// 						{[0, 1, 2, 3, 4, 5, 6].map((step) => (
// 							<div
// 								key={step}
// 								style={{
// 									...styles.dot,
// 									...(step === index
// 										? styles.activeDot
// 										: null),
// 								}}
// 								onClick={() => handleStep(step)}
// 							/>
// 						))}
// 					</div>
// 					{index !== 0 && (
// 						<button onClick={handleBack}>
// 							<FiArrowLeft />
// 						</button>
// 					)}
// 					{index !== 6 && <button onClick={handleSkip}>Skip</button>}

// 					{index !== 6 && (
// 						<button onClick={handleNext}>
// 							<FiArrowRight />
// 						</button>
// 					)}
// 					{index === 6 && (
// 						<button onClick={handleDone}>
// 							Done
// 							<FiCheck />
// 						</button>
// 					)}
// 				</div>
// 			) : (
// 				<MobileEditor />
// 			)}
// 		</div>
// 	);
// };

"use client";

import { useState, useEffect } from "react";
import { FiArrowLeft, FiArrowRight, FiCheck } from "react-icons/fi"; // Import icons
import SwipeableViews from "react-swipeable-views/lib/SwipeableViews";
import MobileEditor from "../MobileView/MobileEditor";

const styles = {
	slide: {
		padding: 5,
		color: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	pagination: {
		display: "flex",
		marginTop: 10,
		justifyContent: "center",
	},
	dot: {
		width: 10,
		height: 10,
		borderRadius: "50%",
		background: "#ccc",
		margin: "0 5px",
		cursor: "pointer",
	},
	activeDot: {
		background: "#000",
	},
	image: {
		maxWidth: "100%",
		maxHeight: "100%",
	},
};

type Slide = {
	title: string;
	image: string;
};

interface ReactSwipeableProps {
	onSwipeComplete?: () => void;
}

export const ReactSwipeable = ({ onSwipeComplete }: ReactSwipeableProps) => {
	const [index, setIndex] = useState(0);
	const [showProcess, setShowProcess] = useState(true);

	useEffect(() => {
		// Check localStorage for the user's preference
		const hideProcess =
			localStorage.getItem("EditEvo_hideProcess") === "true";
		if (hideProcess) {
			setShowProcess(false);
		}
	}, []);

	const handlePagination = (newIndex: number) => {
		setIndex(newIndex);
	};

	const handleStep = (newIndex: number) => {
		setIndex(newIndex);
	};

	const handleSkip = () => {
		setShowProcess(false);
		localStorage.setItem("EditEvo_hideProcess", "true");
	};

	const handleNext = () => {
		if (index < slides.length - 1) {
			setIndex(index + 1);
		}
	};

	const handleBack = () => {
		if (index > 0) {
			setIndex(index - 1);
		}
	};

	const handleDone = () => {
		setShowProcess(false);
		localStorage.setItem("EditEvo_hideProcess", "true");
		if (onSwipeComplete) {
			onSwipeComplete();
		}
	};

	const slides: Slide[] = [
		{ title: "Introduction", image: "/change/introduction.jpg" },
		{ title: "Slide 1", image: "/change/menu_mobile.png" },
		{ title: "Slide 2", image: "/change/options_mobile.png" },
		{ title: "Slide 4", image: "/change/canvas.png" },
		{ title: "Slide 5", image: "/change/elements_mobile.png" },
		{ title: "Slide 6", image: "/change/footer_mobile.png" },
		{ title: "Slide 3", image: "/change/profile_mobile.png" },
	];

	if (!showProcess) {
		return <MobileEditor />;
	}

	return (
		<div>
			{showProcess && (
				<div className="w-full h-full">
					<SwipeableViews
						enableMouseEvents
						className="w-full h-full"
						index={index}
						onChangeIndex={handlePagination}
					>
						{slides.map((slide, idx) => (
							<div key={idx} style={styles.slide}>
								<img
									src={slide.image}
									alt={slide.title}
									style={styles.image}
								/>
								<p>{slide.title}</p>
							</div>
						))}
					</SwipeableViews>
					<div style={styles.pagination} aria-label="Pagination">
						{slides.map((_, step) => (
							<div
								key={step}
								style={{
									...styles.dot,
									...(step === index ? styles.activeDot : {}),
								}}
								onClick={() => handleStep(step)}
								aria-label={`Go to slide ${step + 1}`}
								role="button"
								tabIndex={0}
							/>
						))}
					</div>
					<div className="flex justify-between mt-4">
						{index !== 0 && (
							<button
								onClick={handleBack}
								aria-label="Go to previous slide"
								className="p-2 border rounded"
							>
								<FiArrowLeft />
							</button>
						)}
						{index !== slides.length - 1 && (
							<button
								onClick={handleSkip}
								aria-label="Skip walkthrough"
								className="p-2 border rounded"
							>
								Skip
							</button>
						)}
						{index !== slides.length - 1 && (
							<button
								onClick={handleNext}
								aria-label="Go to next slide"
								className="p-2 border rounded"
							>
								<FiArrowRight />
							</button>
						)}
						{index === slides.length - 1 && (
							<button
								onClick={handleDone}
								aria-label="Complete walkthrough"
								className="p-2 border rounded"
							>
								Done
								<FiCheck />
							</button>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default ReactSwipeable;
