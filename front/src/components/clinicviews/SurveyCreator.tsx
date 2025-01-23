"use client";

import { useEffect, useState } from "react";
import "survey-core/defaultV2.css";
import { ICreatorOptions } from "survey-creator-core";
import "survey-creator-core/survey-creator-core.css";
import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";

import { json as defaultJson } from "@/data/clinicviews/survey_json";

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
