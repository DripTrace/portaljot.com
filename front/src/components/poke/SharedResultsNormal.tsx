"use client";

import React, {
	useState,
	useEffect,
	useRef,
	useMemo,
	useCallback,
} from "react";
import NextImage from "next/image";
import { motion } from "framer-motion";
import {
	FaPlay,
	FaPause,
	FaInfoCircle,
	FaEye,
	FaStar,
	FaMedal,
	FaHandsHelping,
	FaRandom,
	FaShoppingCart,
	FaTshirt,
	FaChevronRight,
	FaSpinner,
} from "react-icons/fa";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Tooltip from "./Tooltip";
import { typeStyles } from "@/lib/poke/typeStyles";
import { Pokemon, HatVariant } from "@/lib/poke/constants"; // Updated import

/** Utility Functions */
const getFilterId = () => "filter-" + String(Math.random()).slice(2);

const urlToImage = (url: string): Promise<HTMLImageElement> =>
	new Promise<HTMLImageElement>((resolve, reject) => {
		const image = new Image();
		image.crossOrigin = "anonymous";
		image.onload = () => resolve(image);
		image.onerror = () =>
			reject(new Error("Couldn't convert SVG to image element"));
		image.src = url;
	});

const svgToImage = async (svg: SVGSVGElement): Promise<HTMLImageElement> => {
	const svgString = new XMLSerializer().serializeToString(svg);
	const blob = new Blob([svgString], {
		type: "image/svg+xml;charset=utf-8",
	});
	const url = URL.createObjectURL(blob);
	const image = await urlToImage(url);
	URL.revokeObjectURL(url);
	return image;
};

const sourceToSvg = async (
	source: string,
	options?: SourceOptions
): Promise<SVGSVGElement> => {
	const { type = "image/svg+xml", trim = false, color = "" } = options || {};
	const ns = "http://www.w3.org/2000/svg";
	const parser = new DOMParser();
	const doc = parser.parseFromString(source, type);
	const svg = doc.querySelector("svg");

	let error = doc.querySelector("parsererror")?.textContent || "";
	[
		"This page contains the following errors:",
		"Below is a rendering of the page up to the first error.",
	].forEach((phrase) => (error = error.replace(phrase, "")));
	if (error) throw new Error(error);
	if (!svg) throw new Error("No root SVG element");

	if (trim) {
		document.body.append(svg);
		let { x, y, width, height } = svg.getBBox();
		const strokeWidths = Array.from(svg.querySelectorAll("*")).map(
			(el) => parseFloat(getComputedStyle(el).strokeWidth) || 0
		);
		const margin = Math.max(...strokeWidths) / 2;
		x -= margin;
		y -= margin;
		width += 2 * margin;
		height += 2 * margin;
		document.body.removeChild(svg);
		svg.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);
	}

	if (color.startsWith("~")) {
		svg.setAttribute("color", color.replace(/^~/, ""));
	} else if (color) {
		const filterId = getFilterId();
		const filter = document.createElementNS(ns, "filter");
		filter.setAttribute("id", filterId);

		const flood = document.createElementNS(ns, "feFlood");
		flood.setAttribute("flood-color", color);
		flood.setAttribute("result", "flood");

		const composite = document.createElementNS(ns, "feComposite");
		composite.setAttribute("operator", "in");
		composite.setAttribute("in", "flood");
		composite.setAttribute("in2", "SourceAlpha");

		filter.appendChild(flood);
		filter.appendChild(composite);
		svg.appendChild(filter);
		svg.setAttribute("filter", `url(#${filterId})`);
	}

	return svg;
};

/** Types */
type SourceOptions = {
	type?: DOMParserSupportedType;
	trim?: boolean;
	color?: string;
};

/** SharedResultsProps Interface */
interface SharedResultsProps {
	resultId: string;
	trainerName: string;
	teamSummary: string;
	allPokemon: Pokemon[];
	rankings?: {
		grass?: { top: string; runnerUp: string; canRelate: string };
		fire?: { top: string; runnerUp: string; canRelate: string };
		water?: { top: string; runnerUp: string; canRelate: string };
	};
}

/** Define hexColors and typeEmojis */
const hexColors: Record<string, string> = {
	grass: "#78C850",
	fire: "#F08030",
	water: "#6890F0",
};

const typeEmojis: Record<string, string> = {
	grass: "🌿",
	fire: "🔥",
	water: "💧",
};

/** Subcomponents */

/** ProductSelector Component */
const ProductSelector = ({
	variants,
	selectedVariant,
	onVariantChange,
	onRandomize,
	isLoading,
}: {
	variants: HatVariant[];
	selectedVariant: HatVariant | null;
	onVariantChange: (variant: HatVariant) => void;
	onRandomize: () => void;
	isLoading: boolean;
}) => {
	return (
		<div className="flex flex-col gap-4 w-full max-w-sm">
			<div className="flex items-center gap-2">
				<Select
					value={selectedVariant?.id?.toString() || ""}
					onValueChange={(value: string) => {
						const variant = variants.find(
							(v) => v.id.toString() === value
						);
						if (variant) onVariantChange(variant);
					}}
				>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Select a product style" />
					</SelectTrigger>
					<SelectContent>
						{variants.map((variant: HatVariant) => (
							<SelectItem
								key={variant.id}
								value={variant.id.toString()}
							>
								{variant.name} - $
								{variant.retailPrice.toFixed(2)}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Button
					variant="outline"
					size="icon"
					onClick={onRandomize}
					disabled={isLoading}
					aria-label="Randomize Selection"
				>
					{isLoading ? (
						<FaSpinner className="animate-spin h-4 w-4" />
					) : (
						<FaRandom className="h-4 w-4" />
					)}
				</Button>
			</div>
		</div>
	);
};

/** ProductViewer Component */
const ProductViewer = ({
	variant,
	pngImage,
	isGeneratingMockup,
	mockupUrl,
	onCheckout,
}: {
	variant: HatVariant | null;
	pngImage: string;
	isGeneratingMockup: boolean;
	mockupUrl: string | null;
	onCheckout: () => void;
}) => {
	return (
		<div className="flex flex-col items-center gap-6 w-full">
			<Tabs defaultValue="original" className="w-full">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="original">Original Design</TabsTrigger>
					<TabsTrigger value="mockup" disabled={!mockupUrl}>
						Product Preview
					</TabsTrigger>
				</TabsList>
				<TabsContent
					value="original"
					className="flex justify-center items-center min-h-[512px]"
				>
					<Card className="w-full h-full flex justify-center items-center">
						<CardContent className="p-4 flex justify-center items-center">
							<div className="relative w-[512px] h-[512px] flex justify-center items-center">
								<NextImage
									src={`data:image/png;base64,${pngImage}`}
									alt="Original design"
									fill
									className="object-contain"
								/>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent
					value="mockup"
					className="flex justify-center items-center min-h-[512px]"
				>
					<Card className="w-full h-full flex justify-center items-center">
						<CardContent className="p-4 flex justify-center items-center">
							{isGeneratingMockup ? (
								<div className="flex items-center justify-center w-[512px] h-[512px]">
									<FaSpinner className="animate-spin h-8 w-8 text-purple-600" />
									<span className="ml-2">
										Generating preview...
									</span>
								</div>
							) : mockupUrl ? (
								<div className="relative w-[512px] h-[512px] flex justify-center items-center">
									<NextImage
										src={mockupUrl}
										alt="Product mockup"
										fill
										className="object-contain"
									/>
								</div>
							) : null}
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>

			<Button
				size="lg"
				className="w-full max-w-sm"
				onClick={onCheckout}
				disabled={!variant || isGeneratingMockup}
				aria-label="Proceed to Checkout"
			>
				<FaShoppingCart className="mr-2" />
				{isGeneratingMockup ? "Preparing Checkout..." : "Buy Now"}
			</Button>
		</div>
	);
};

/** ProductModal Component */
const ProductModal = ({
	isVisible,
	onClose,
	pokemon,
	pngImage,
	resultId, // Pass resultId as a prop
}: {
	isVisible: boolean;
	onClose: () => void;
	pokemon: Pokemon | undefined;
	pngImage: string | null;
	resultId: string; // Define the type
}) => {
	const [variants, setVariants] = useState<HatVariant[]>([]);
	const [selectedVariant, setSelectedVariant] = useState<HatVariant | null>(
		null
	);
	const [isLoading, setIsLoading] = useState(false);
	const [isGeneratingMockup, setIsGeneratingMockup] = useState(false);
	const [mockupUrl, setMockupUrl] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (isVisible && pngImage) {
			fetchVariants();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isVisible, pngImage]);

	const fetchVariants = async () => {
		try {
			setIsLoading(true);
			console.log("Fetching variants with resultId:", resultId); // Added log
			if (!pngImage) {
				console.error("pngImage is null or undefined");
				return; // or handle the error as needed
			}
			const base64Data = pngImage.startsWith("data:image/png;base64,")
				? pngImage.replace(/^data:image\/png;base64,/, "")
				: pngImage;

			console.log(base64Data);

			const response = await fetch("/api/poke/get-hat-variants", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ resultId, pngBase64: base64Data }),
			});
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Failed to fetch variants");
			}
			const data = await response.json();

			if (!data || !data.variant) {
				throw new Error("Invalid response structure");
			}

			const allVariants: HatVariant[] = [data.variant]; // Assuming single variant

			setVariants(allVariants);
			if (allVariants.length > 0) {
				setSelectedVariant(allVariants[0]);
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error("Error fetching variants:", error.message);
				setError("Failed to load products. Please try again later.");
			} else {
				console.error("Unexpected error:", error);
				setError("An unexpected error occurred.");
			}
		} finally {
			setIsLoading(false);
		}
	};

	const handleRandomize = () => {
		if (variants.length === 0) return;
		const randomIndex = Math.floor(Math.random() * variants.length);
		setSelectedVariant(variants[randomIndex]);
	};

	const generateMockup = useCallback(async () => {
		if (!selectedVariant || !pngImage) return;

		setIsGeneratingMockup(true);
		try {
			// Since the mockup URL is provided by the backend via /api/poke/get-hat-variants,
			// we can directly use it if available.
			if (selectedVariant.image) {
				setMockupUrl(selectedVariant.image);
			} else {
				throw new Error("Mockup URL not found in variant data");
			}
		} catch (error) {
			console.error("Error generating mockup:", error);
			setError("Failed to generate product preview");
		} finally {
			setIsGeneratingMockup(false);
		}
	}, [selectedVariant, pngImage]);

	useEffect(() => {
		if (selectedVariant && pngImage) {
			generateMockup();
		}
	}, [selectedVariant, pngImage, generateMockup]);

	const handleCheckout = async () => {
		if (!selectedVariant) return;

		try {
			const response = await fetch("/api/poke/create-checkout-session", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					priceId: selectedVariant.stripePriceId,
				}),
			});
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.error || "Failed to create checkout session"
				);
			}
			const data = await response.json();
			if (data.url) {
				window.location.href = data.url;
			} else {
				throw new Error("Failed to create checkout session");
			}
		} catch (error) {
			console.error("Error during purchase:", error);
			setError("Failed to initiate purchase. Please try again later.");
		}
	};

	if (!isVisible || !pokemon || !pngImage) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<Card className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto">
				<CardHeader className="border-b">
					<button
						className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
						onClick={onClose}
						aria-label="Close Modal"
					>
						×
					</button>
					<div className="flex items-center">
						<FaTshirt className="text-3xl text-purple-600 mr-3" />
						<h2 className="text-2xl font-bold text-purple-800">
							Create Your Custom {pokemon.name} Product
						</h2>
					</div>
				</CardHeader>

				<CardContent className="p-6">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						<div className="space-y-6">
							{error && (
								<div className="bg-red-100 text-red-700 p-3 rounded">
									{error}
								</div>
							)}

							<ProductSelector
								variants={variants}
								selectedVariant={selectedVariant}
								onVariantChange={setSelectedVariant}
								onRandomize={handleRandomize}
								isLoading={isLoading}
							/>

							<div className="border-t pt-4">
								<h3 className="text-lg font-semibold mb-2 flex items-center">
									<FaChevronRight className="mr-2" />
									About Your Design
								</h3>
								<p className="text-gray-600">
									Custom {pokemon.name} design with{" "}
									{pokemon.type}-type styling. Perfect for
									showing off your trainer personality!
								</p>
							</div>
						</div>

						<ProductViewer
							variant={selectedVariant}
							pngImage={pngImage}
							isGeneratingMockup={isGeneratingMockup}
							mockupUrl={mockupUrl}
							onCheckout={handleCheckout}
						/>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

/** Pokeball Component */
const Pokeball = ({
	isOpen,
	children,
	imageSize,
}: {
	isOpen: boolean;
	children: React.ReactNode;
	imageSize: number;
}) => (
	<div
		className="relative flex items-center justify-center"
		style={{
			width: `${imageSize}px`,
			height: `${imageSize}px`,
			overflow: "hidden",
		}}
	>
		<svg viewBox="0 0 100 100" className="w-full h-full">
			<circle cx="50" cy="50" r="50" fill="#f2f2f2" />
			<path
				d="M5,50 a1,1 0 0,1 90,0"
				fill="#ff1a1a"
				className={`transition-all duration-1000 ${
					isOpen ? "translate-y-[-25px] rotate-[-25deg]" : ""
				}`}
			/>
			<circle
				cx="50"
				cy="50"
				r="12"
				fill="#2c2c2c"
				stroke="#f2f2f2"
				strokeWidth="2"
			/>
			<path
				d="M95,50 a1,1 0 0,1 -90,0"
				fill="#f2f2f2"
				className={`transition-all duration-1000 ${
					isOpen ? "translate-y-[25px] rotate-[25deg]" : ""
				}`}
			/>
		</svg>
		<div
			className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
				isOpen ? "opacity-100" : "opacity-0"
			}`}
		>
			{children}
		</div>
	</div>
);

/** Main SharedResults Component */

const SharedResults = ({
	allPokemon,
	teamSummary,
	trainerName,
	resultId,
	rankings,
}: SharedResultsProps) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
	const [audioStatus, setAudioStatus] = useState<string>("pending");
	const [loadingAudio, setLoadingAudio] = useState<boolean>(true);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [unlockedPokemon, setUnlockedPokemon] = useState<
		Record<string, boolean>
	>({});
	const [hoveredPokemon, setHoveredPokemon] = useState<string | null>(null);
	const [clickedPokemon, setClickedPokemon] = useState<string | null>(null);
	const iconRefs = useRef<Record<string, HTMLDivElement | null>>({});

	const [pngImages, setPngImages] = useState<Record<string, string>>({});
	const [isLoadingPng, setIsLoadingPng] = useState<Record<string, boolean>>(
		{}
	);

	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | undefined>(
		undefined
	);
	const [selectedPngImage, setSelectedPngImage] = useState<string | null>(
		null
	);

	const orderedPokemon = useMemo(() => {
		const types = ["grass", "fire", "water"] as const;
		const ranks = ["top", "runnerUp", "canRelate"] as const;

		if (rankings) {
			return ranks
				.flatMap((rank) =>
					types.map((type) => {
						const pokemonName = rankings[type]?.[rank];
						return allPokemon.find(
							(p) => p.name === pokemonName && p.type === type
						);
					})
				)
				.filter((p): p is Pokemon => p !== undefined);
		} else {
			return types
				.flatMap((type) => {
					const typePokemon = allPokemon.filter(
						(p) => p.type === type
					);
					return [typePokemon[0], typePokemon[1], typePokemon[2]];
				})
				.filter(Boolean) as Pokemon[];
		}
	}, [allPokemon, rankings]);

	useEffect(() => {
		const initialUnlocked: Record<string, boolean> = {};
		orderedPokemon.forEach((pokemon, index) => {
			initialUnlocked[pokemon.name] = index < 3;
		});
		setUnlockedPokemon(initialUnlocked);
	}, [orderedPokemon]);

	useEffect(() => {
		async function fetchAudioData() {
			try {
				const response = await fetch(`/api/poke/get-audio/${resultId}`);
				if (!response.ok) {
					throw new Error("Failed to fetch audio data");
				}
				const data = await response.json();

				setAudioStatus(data.audioStatus);

				if (data.audioStatus === "completed" && data.audioBase64) {
					const binaryString = atob(data.audioBase64);
					const len = binaryString.length;
					const bytes = new Uint8Array(len);
					for (let i = 0; i < len; i++) {
						bytes[i] = binaryString.charCodeAt(i);
					}
					const audioBlob = new Blob([bytes], { type: "audio/mp3" });
					const audioUrl = URL.createObjectURL(audioBlob);
					const audioElement = new window.Audio(audioUrl);
					setAudio(audioElement);
					setLoadingAudio(false);
				} else if (data.audioStatus === "failed") {
					setErrorMessage(
						"Failed to generate audio. Please try again later."
					);
					setLoadingAudio(false);
				}
			} catch (error) {
				console.error("Error fetching audio data:", error);
				setErrorMessage(
					"Failed to load audio. Please try again later."
				);
				setLoadingAudio(false);
			}
		}

		fetchAudioData();
	}, [resultId]);

	useEffect(() => {
		async function fetchPngImages() {
			const promises = Object.keys(unlockedPokemon).map(
				async (pokemonName: string) => {
					if (unlockedPokemon[pokemonName]) {
						const response = await fetch(
							"/api/poke/get-pokemon-png",
							{
								method: "POST",
								headers: {
									"Content-Type": "application/json",
								},
								body: JSON.stringify({
									resultId,
									pokemonName,
								}),
							}
						);
						if (response.ok) {
							const data = await response.json();
							if (data.pngBase64) {
								setPngImages((prev) => ({
									...prev,
									[pokemonName]: data.pngBase64,
								}));
							}
						}
					}
				}
			);

			await Promise.all(promises);
		}

		fetchPngImages();
	}, [unlockedPokemon, resultId]);

	const handlePlay = () => {
		if (!audio) return;
		if (isPlaying) {
			audio.pause();
		} else {
			audio.play().catch((e) => {
				console.error("Error playing audio:", e);
				setErrorMessage("Failed to play audio. Please try again.");
			});
		}
		setIsPlaying(!isPlaying);
	};

	const handleUnlock = (pokemonName: string) => {
		setUnlockedPokemon((prev) => ({
			...prev,
			[pokemonName]: true,
		}));
	};

	const handleViewPng = async (pokemon: Pokemon, index: number) => {
		if (pngImages[pokemon.name]) {
			setSelectedPokemon(pokemon);
			setSelectedPngImage(pngImages[pokemon.name]);
			setIsModalVisible(true);
			return;
		}
		setIsLoadingPng((prev) => ({ ...prev, [pokemon.name]: true }));
		try {
			const response = await fetch("/api/poke/get-pokemon-png", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					resultId,
					pokemonName: pokemon.name,
				}),
			});
			if (response.ok) {
				const data = await response.json();
				if (data.pngBase64) {
					setPngImages((prev) => ({
						...prev,
						[pokemon.name]: data.pngBase64,
					}));
					setSelectedPokemon(pokemon);
					setSelectedPngImage(data.pngBase64);
					setIsModalVisible(true);
					return;
				}
			}
			// If fetching PNG failed, attempt to generate it
			const generateResponse = await fetch(
				"/api/poke/generate-pokemon-svg",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						pokemon,
						index,
						hexColor: hexColors[pokemon.type],
						emoji: typeEmojis[pokemon.type],
						originalImageSize: getImageSize(index),
						originalFontSize: getFontSize(index),
					}),
				}
			);

			if (!generateResponse.ok) {
				const errorData = await generateResponse.json();
				throw new Error(errorData.error || "Failed to generate SVG");
			}

			const svgText = await generateResponse.text();
			const svgElement = await sourceToSvg(svgText, {});
			const image = await svgToImage(svgElement);

			const canvas = document.createElement("canvas");
			canvas.width = image.width;
			canvas.height = image.height;
			const ctx = canvas.getContext("2d");
			if (!ctx) throw new Error("Failed to get canvas context");

			ctx.drawImage(image, 0, 0);
			const pngBase64 = canvas.toDataURL("image/png").split(",")[1]; // Remove data prefix

			setPngImages((prev) => ({
				...prev,
				[pokemon.name]: pngBase64,
			}));

			// Upload the generated PNG to the backend
			const uploadResponse = await fetch("/api/poke/upload-pokemon-png", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					resultId,
					pokemonName: pokemon.name,
					pngBase64,
				}),
			});

			if (!uploadResponse.ok) {
				const errorData = await uploadResponse.json();
				throw new Error(errorData.error || "Failed to upload PNG");
			}

			setSelectedPokemon(pokemon);
			setSelectedPngImage(pngBase64);
			setIsModalVisible(true);
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error("Error fetching/generating PNG:", error.message);
				setErrorMessage("Failed to load PNG. Please try again.");
			} else {
				console.error("Unexpected error:", error);
				setErrorMessage("Failed to load PNG. Please try again.");
			}
		} finally {
			setIsLoadingPng((prev) => ({ ...prev, [pokemon.name]: false }));
		}
	};

	const toggleTooltip = (pokemonName: string) => {
		setClickedPokemon((prev) =>
			prev === pokemonName ? null : pokemonName
		);
	};

	const getCardStyle = (type: "grass" | "fire" | "water"): string => {
		return typeStyles[type].background;
	};

	const getFontSize = (index: number): string => {
		if (index < 3) return "text-xl md:text-2xl";
		if (index < 6) return "text-lg md:text-xl";
		return "text-sm md:text-lg";
	};

	const getImageSize = (index: number): number => {
		if (index < 3) return 240;
		if (index < 6) return 220;
		return 200;
	};

	const getRankIcon = (index: number): JSX.Element => {
		if (index < 3) return <FaStar />;
		if (index >= 3 && index < 6) return <FaMedal />;
		return <FaHandsHelping />;
	};

	const handleCloseModal = () => {
		setIsModalVisible(false);
		setSelectedPokemon(undefined);
		setSelectedPngImage(null);
	};

	return (
		<div className="min-h-screen w-full bg-gradient-to-b from-blue-100 to-purple-100 flex justify-center">
			<Card className="relative z-10 max-w-6xl mx-auto m-4 md:m-8">
				<CardHeader>
					<h1 className="text-3xl md:text-6xl font-bold text-center text-purple-800 capitalize">
						{trainerName}&apos;s Pokémon Starters
					</h1>
				</CardHeader>
				<CardContent>
					{loadingAudio ? (
						<p className="text-center">Loading audio...</p>
					) : audioStatus === "completed" && audio ? (
						<div className="flex flex-col items-center mb-6">
							<motion.button
								onClick={handlePlay}
								className="focus:outline-none bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded flex items-center"
								whileTap={{ scale: 0.95 }}
								aria-label={
									isPlaying ? "Pause Audio" : "Play Audio"
								}
							>
								{isPlaying ? <FaPause /> : <FaPlay />}
								<span className="ml-2">
									{isPlaying ? "Pause" : "Play"} Audio Summary
								</span>
							</motion.button>
						</div>
					) : (
						<p className="text-center">Audio is not available.</p>
					)}

					{errorMessage && (
						<p className="text-red-500 text-center my-4">
							{errorMessage}
						</p>
					)}

					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<Card>
							<CardHeader>
								<h2 className="text-2xl font-bold text-center text-purple-800">
									Team Summary
								</h2>
							</CardHeader>
							<CardContent>
								<p className="text-gray-800 text-justify">
									{teamSummary}
								</p>
							</CardContent>
						</Card>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 place-items-center">
						{orderedPokemon.map(
							(pokemon: Pokemon, index: number) => (
								<div
									key={index}
									style={{
										width: `${getImageSize(index) + 40}px`,
									}}
									className={`${getCardStyle(
										pokemon.type
									)} mb-8`}
								>
									<motion.div
										initial={{ opacity: 0, y: 50 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -50 }}
										transition={{
											duration: 0.5,
											delay: index * 0.1,
										}}
										className={`border shadow-md rounded-lg p-4 flex flex-col items-center h-full relative overflow-hidden`}
									>
										{unlockedPokemon[pokemon.name] && (
											<div
												className="absolute top-2 right-2 cursor-pointer"
												ref={(el) => {
													iconRefs.current[
														pokemon.name
													] = el;
												}}
												onClick={() =>
													toggleTooltip(pokemon.name)
												}
												onMouseEnter={() =>
													setHoveredPokemon(
														pokemon.name
													)
												}
												onMouseLeave={() =>
													setHoveredPokemon(null)
												}
											>
												<FaInfoCircle
													className="text-gray-700 text-lg"
													aria-label="View Traits"
												/>
												<Tooltip
													content={
														Array.isArray(
															pokemon.traits
														)
															? pokemon.traits
															: [pokemon.traits]
													}
													anchorRef={{
														current:
															iconRefs.current[
																pokemon.name
															],
													}}
													isVisible={
														hoveredPokemon ===
															pokemon.name ||
														clickedPokemon ===
															pokemon.name
													}
													toggleVisibility={() =>
														toggleTooltip(
															pokemon.name
														)
													}
												/>
											</div>
										)}

										{unlockedPokemon[pokemon.name] && (
											<h2
												className={`${getFontSize(
													index
												)} font-semibold mb-2 text-center text-gray-900`}
											>
												{pokemon.name}
											</h2>
										)}

										<div
											style={{
												width: "100%",
												height: `${getImageSize(
													index
												)}px`,
												position: "relative",
											}}
											className="mb-4 flex items-center justify-center"
										>
											<Pokeball
												isOpen={
													unlockedPokemon[
														pokemon.name
													]
												}
												imageSize={getImageSize(index)}
											>
												<NextImage
													src={
														pokemon.image ||
														"/placeholder-pokemon.png"
													}
													alt={
														pokemon.name ||
														"Pokemon"
													}
													width={getImageSize(index)}
													height={getImageSize(index)}
													className="rounded-md object-contain"
												/>
											</Pokeball>
										</div>

										<div className="text-center mt-2">
											{unlockedPokemon[pokemon.name] ? (
												<p
													className={`${
														index >= 6
															? "text-xs"
															: "text-sm"
													} text-gray-700`}
												>
													{pokemon.description ||
														"No description available."}
												</p>
											) : (
												<motion.button
													onClick={() =>
														handleUnlock(
															pokemon.name
														)
													}
													className="px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-sm"
													whileTap={{ scale: 0.95 }}
													aria-label={`Unlock ${pokemon.name}`}
												>
													Unlock
												</motion.button>
											)}
										</div>

										{unlockedPokemon[pokemon.name] && (
											<div className="mt-4 flex items-center gap-2">
												<Button
													onClick={() =>
														handleViewPng(
															pokemon,
															index
														)
													}
													disabled={
														isLoadingPng[
															pokemon.name
														]
													}
													className="flex items-center gap-2"
													aria-label={`View and Shop ${pokemon.name}`}
												>
													{isLoadingPng[
														pokemon.name
													] ? (
														<>
															<FaSpinner className="animate-spin" />
															Loading...
														</>
													) : (
														<>
															<FaEye />
															<FaTshirt className="mr-1" />
															View & Shop
															<FaChevronRight className="ml-1" />
														</>
													)}
												</Button>
											</div>
										)}

										<span
											className={`${
												index >= 6
													? "text-xs"
													: "text-sm"
											} font-bold mt-auto flex items-center gap-2 ${
												typeStyles[pokemon.type].text
											}`}
										>
											{getRankIcon(index)}
											{index < 3
												? "Your Top Match!"
												: index >= 3 && index < 6
													? "Runner Up"
													: "Can Relate To"}
										</span>
									</motion.div>
								</div>
							)
						)}
					</div>
				</CardContent>
			</Card>

			{/* Product Modal */}
			<ProductModal
				isVisible={isModalVisible}
				onClose={handleCloseModal}
				pokemon={selectedPokemon}
				pngImage={selectedPngImage}
				resultId={resultId} // Pass resultId here
			/>

			{/* Audio controls */}
			{audio && (
				<audio
					src={audio.src}
					onEnded={() => setIsPlaying(false)}
					style={{ display: "none" }}
				/>
			)}
		</div>
	);
};

export default SharedResults;
