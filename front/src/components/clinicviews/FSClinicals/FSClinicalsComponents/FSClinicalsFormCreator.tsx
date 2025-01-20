"use client";

import {
	useEffect as useFsclinicalsEffect,
	useState as useFsclinicalsState,
} from "react";
import "survey-core/defaultV2.css";
import { ICreatorOptions as FSClinicalsICreatorOptions } from "survey-creator-core";
import "survey-creator-core/survey-creator-core.css";
import {
	SurveyCreator as FSClinicalsFormCreator,
	SurveyCreatorComponent as FSClinicalsCreatorComponent,
} from "survey-creator-react";
import { fsclinicalsForm } from "@/data/fsclinicals-config";

export default function FSClinicalsFormCreatorWidget(fsclinicalsProps: {
	fsclinicalsJson?: Object;
	fsclinicalsOptions?: FSClinicalsICreatorOptions;
}) {
	const fsclinicalsDefaultCreatorOptions: FSClinicalsICreatorOptions = {
		showThemeTab: true,
		showLogicTab: true,
		showTranslationTab: true,
	};

	const [fsclinicalsCreator, setFsclinicalsCreator] =
		useFsclinicalsState<FSClinicalsFormCreator | null>(null);

	useFsclinicalsEffect(() => {
		if (!fsclinicalsCreator) {
			const newFsclinicalsCreator = new FSClinicalsFormCreator(
				fsclinicalsProps.fsclinicalsOptions ||
					fsclinicalsDefaultCreatorOptions
			);
			newFsclinicalsCreator.saveSurveyFunc = (
				fsclinicalsNo: number,
				callback: (
					fsclinicalsNum: number,
					fsclinicalsStatus: boolean
				) => void
			) => {
				console.log(JSON.stringify(newFsclinicalsCreator?.JSON));
				callback(fsclinicalsNo, true);
			};

			newFsclinicalsCreator.JSON =
				fsclinicalsProps.fsclinicalsJson || fsclinicalsForm;
			setFsclinicalsCreator(newFsclinicalsCreator);
		}
	}, [
		fsclinicalsCreator,
		fsclinicalsProps.fsclinicalsJson,
		fsclinicalsProps.fsclinicalsOptions,
	]);

	return (
		<div style={{ height: "100vh", width: "100%" }}>
			{fsclinicalsCreator && (
				<FSClinicalsCreatorComponent creator={fsclinicalsCreator} />
			)}
		</div>
	);
}
