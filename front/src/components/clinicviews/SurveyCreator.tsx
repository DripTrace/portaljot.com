// "use client";

// import { useEffect, useState } from "react";
// import "survey-core/defaultV2.css";
// import "survey-creator-core/survey-creator-core.css";
// import { json as defaultJson } from "../../data/survey_json";

// const defaultCreatorOptions = {
// 	showLogicTab: true,
// 	showTranslationTab: true,
// };

// export default function SurveyCreatorWidget(props: {
// 	json?: Object;
// 	options?: any;
// }) {
// 	const [creator, setCreator] = useState<any>(null);
// 	const [SurveyCreatorComponent, setSurveyCreatorComponent] =
// 		useState<any>(null);

// 	useEffect(() => {
// 		const loadSurveyCreator = async () => {
// 			try {
// 				const surveyCreatorReact = await import("survey-creator-react");
// 				const surveyCreatorCore = await import("survey-creator-core");

// 				const SurveyCreator = surveyCreatorReact.SurveyCreator;
// 				const SurveyCreatorComponent =
// 					surveyCreatorReact.SurveyCreatorComponent;

// 				if (!SurveyCreator) {
// 					console.error(
// 						"SurveyCreator is not available in the imported module."
// 					);
// 					return;
// 				}

// 				const newCreator = new SurveyCreator(
// 					props.options || defaultCreatorOptions
// 				);

// 				newCreator.saveSurveyFunc = (
// 					no: number,
// 					callback: (num: number, status: boolean) => void
// 				) => {
// 					console.log(
// 						"Saving survey:",
// 						JSON.stringify(newCreator.JSON)
// 					);
// 					callback(no, true);
// 				};

// 				setCreator(newCreator);
// 				setSurveyCreatorComponent(() => SurveyCreatorComponent);
// 			} catch (error) {
// 				console.error("Error loading SurveyCreator:", error);
// 			}
// 		};

// 		if (!creator) {
// 			loadSurveyCreator();
// 		} else {
// 			creator.JSON = props.json || defaultJson;
// 		}
// 	}, [creator, props.options, props.json]);

// 	if (!creator || !SurveyCreatorComponent) {
// 		return <div>Loading...</div>;
// 	}

// 	return (
// 		<div style={{ height: "80vh", width: "100%" }}>
// 			<SurveyCreatorComponent creator={creator} />
// 		</div>
// 	);
// }

// "use client";

// import { useEffect, useState } from "react";
// import "survey-core/defaultV2.css";
// import { ICreatorOptions } from "survey-creator-core";
// import "survey-creator-core/survey-creator-core.css";
// import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";

// import { json as defaultJson } from "../../data/survey_json";

// const defaultCreatorOptions: ICreatorOptions = {
// 	showLogicTab: true,
// 	showTranslationTab: true,
// };

// export default function SurveyCreatorWidget(props: {
// 	json?: Object;
// 	options?: ICreatorOptions;
// }) {
// 	const [creator, setCreator] = useState<SurveyCreator>();

// 	useEffect(() => {
// 		if (!creator) {
// 			const newCreator = new SurveyCreator(
// 				props.options || defaultCreatorOptions
// 			);

// 			newCreator.saveSurveyFunc = (
// 				no: number,
// 				callback: (num: number, status: boolean) => void
// 			) => {
// 				console.log(JSON.stringify(newCreator?.JSON));
// 				callback(no, true);
// 			};

// 			newCreator.JSON = props.json || defaultJson;
// 			setCreator(newCreator);
// 		}
// 	}, [creator, props.json, props.options]);

// 	return (
// 		<div style={{ height: "80vh", width: "100%" }}>
// 			{creator && <SurveyCreatorComponent creator={creator} />}
// 		</div>
// 	);
// }

"use client";

import { useEffect, useState } from "react";
import "survey-core/defaultV2.css";
import { ICreatorOptions } from "survey-creator-core";
import "survey-creator-core/survey-creator-core.css";
import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";

import { json as defaultJson } from "../../data/survey_json";
// import { json as defaultJson } from "../../data/survey_json-0";
// import { SurveyCreator } from "../../surveyjs-core/survey-creator/packages/survey-creator/src/editor";
// import "@/survey-creator-core.css";
// import "@/defaultV2.css";

// import { ICreatorOptions } from "../../surveyjs-core/survey-creator_dev/packages/survey-creator/src/creator-base";

// import { SurveyCreator } from "../../surveyjs-core/survey-creator_dev/packages/survey-creator/src/editor";
// import { SurveyCreatorComponent } from "../../surveyjs-core/survey-creator_dev/packages/survey-creator-react/src/SurveyCreator";

// import { ICreatorOptions } from "../../surveyjs-core/survey-creator/packages/survey-creator/src/creator-base";
// import { SurveyCreatorComponent } from "../../surveyjs-core/survey-creator/packages/survey-creator-react/build/typings/SurveyCreator";
// import {
//     SurveyCreator,
//     SurveyCreatorComponent,
// } from "../../surveyjs-core/survey-creator_dev/packages/survey-creator-react/src/SurveyCreator";

const defaultCreatorOptions: ICreatorOptions = {
	showLogicTab: true,
	showTranslationTab: true,
};

export default function SurveyCreatorWidget(props: {
	json?: Object;
	options?: ICreatorOptions;
}) {
	const defaultCreatorOptions: ICreatorOptions = {
		showThemeTab: true,
		showLogicTab: true,
		showTranslationTab: true,
		// showEmbededSurveyTab: true,
	};

	const [creator, setCreator] = useState<SurveyCreator | null>(null);

	useEffect(() => {
		if (!creator) {
			const newCreator = new SurveyCreator(
				props.options || defaultCreatorOptions
			);
			newCreator.saveSurveyFunc = (
				no: number,
				callback: (num: number, status: boolean) => void
			) => {
				console.log(JSON.stringify(newCreator?.JSON));
				callback(no, true);
			};

			newCreator.JSON = props.json || defaultJson;
			setCreator(newCreator);
		}
	}, [creator, props.json, props.options]);

	return (
		<div style={{ height: "100vh", width: "100%" }}>
			{creator && <SurveyCreatorComponent creator={creator} />}
		</div>
	);
}
