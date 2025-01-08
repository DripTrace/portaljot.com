import { OverlayButton } from "@/components/modify/atoms";
import { useVideoSettings } from "./useVideoSettings";
import {
	sectionBoxStyles,
	titleStyles,
	settingsBoxStyles,
	settingsTitleStyles,
	ratioCardList,
	resolutionCardList,
	ratioCardBoxStyles,
	ratioFigureBoxStyles,
	ratioFigureStyles,
	ratioCardTitleStyles,
	RATIO_FIGURE_BOX_WIDTH,
	RATIO_FIGURE_BOX_HEIGHT,
	resolutionCardBoxStyles,
	resolutionTitleStyles,
} from "./VideoSettingsSection.css";
import {
	RATIO_RESOLUTIONS,
	RATIOS,
	type RatioKey,
} from "@/constants/modify/video-size";
// import { RATIO_RESOLUTIONS, RATIOS, type RatioKey } from "@/constants/modify";

interface Settings {
	ratio: RatioKey;
	resolution: string;
	// Add other properties as needed
}

interface VideoSettingsSectionProps {
	settings: Settings;
}

export const VideoSettingsSection = ({
	settings,
}: VideoSettingsSectionProps) => {
	const { settings: settingsState, setSettings } = useVideoSettings();

	// Add this type assertion
	const ratio = settingsState.ratio as RatioKey;

	const onRatioChange = (ratio: RatioKey) => {
		setSettings({
			ratio,
			resolution: RATIO_RESOLUTIONS[ratio].prefered,
		});
	};

	const onResolutionChange = (resolution: string) => {
		setSettings({ resolution });
	};

	return (
		<div className={sectionBoxStyles}>
			<h3 className={titleStyles}>Video settings</h3>
			<div className={settingsBoxStyles}>
				<div className={settingsTitleStyles}>Ratio</div>
				<div className={ratioCardList}>
					{RATIOS.map((ratio) => {
						const [width, height] = ratio.split(":").map(Number);
						return (
							<RatioCard
								key={ratio}
								width={width}
								height={height}
								onSelect={() => onRatioChange(ratio)}
								active={settingsState.ratio === ratio}
							/>
						);
					})}
				</div>
			</div>
			<div className={settingsBoxStyles}>
				<div className={settingsTitleStyles}>Resolution</div>
				<div className={resolutionCardList}>
					{RATIO_RESOLUTIONS[ratio].resolutions.map((resolution) => {
						return (
							<ResolutionCard
								key={resolution}
								label={resolution}
								onSelect={() => onResolutionChange(resolution)}
								active={settingsState.resolution === resolution}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

interface RatioCardProps {
	width: number;
	height: number;
	active: boolean;
	onSelect(): void;
}

const RatioCard = ({ width, height, active, onSelect }: RatioCardProps) => {
	let widthSize, heightSize;

	if (RATIO_FIGURE_BOX_WIDTH / width <= RATIO_FIGURE_BOX_HEIGHT / height) {
		widthSize = RATIO_FIGURE_BOX_WIDTH;
		heightSize = widthSize * (height / width);
	} else {
		heightSize = RATIO_FIGURE_BOX_HEIGHT;
		widthSize = heightSize * (width / height);
	}

	return (
		<div className={ratioCardBoxStyles({ active })}>
			<OverlayButton
				onClick={onSelect}
				bgHoverColor={active ? "white5" : "white10"}
			/>
			<div className={ratioFigureBoxStyles}>
				<div
					className={ratioFigureStyles}
					style={{ width: widthSize, height: heightSize }}
				/>
			</div>
			<div className={ratioCardTitleStyles}>
				{width}:{height}
			</div>
		</div>
	);
};

interface ResolutionCardProps {
	active: boolean;
	label: string;
	onSelect(): void;
}

const ResolutionCard = ({ active, label, onSelect }: ResolutionCardProps) => {
	return (
		<div className={resolutionCardBoxStyles({ active })}>
			<OverlayButton
				onClick={onSelect}
				bgHoverColor={active ? "white5" : "white10"}
			/>
			<div className={resolutionTitleStyles}>{label}</div>
		</div>
	);
};
