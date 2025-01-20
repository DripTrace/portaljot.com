"use client";

import {
	useEffect as useFsclinicalsEffect,
	useState as useFsclinicalsState,
} from "react";
import "survey-analytics/survey.analytics.css";
import { Model as FSClinicalsModel } from "survey-core";
import {
	data as fsclinicalsData,
	json as fsclinicalsJson,
} from "../../../../data/dashboard_data-0";

export default function FSClinicalsDashboard() {
	const [fsclinicalsVizPanel, setFsclinicalsVizPanel] =
		useFsclinicalsState<any>(null);

	useFsclinicalsEffect(() => {
		const loadFsclinicalsSurveyAnalytics = async () => {
			const { VisualizationPanel } = await import("survey-analytics");
			const fsclinicalsForm = new FSClinicalsModel(fsclinicalsJson);
			const newFsclinicalsVizPanel = new VisualizationPanel(
				fsclinicalsForm.getAllQuestions(),
				fsclinicalsData
			);
			setFsclinicalsVizPanel(newFsclinicalsVizPanel);
		};

		loadFsclinicalsSurveyAnalytics();
	}, []);

	useFsclinicalsEffect(() => {
		if (fsclinicalsVizPanel) {
			requestAnimationFrame(() => {
				fsclinicalsVizPanel.render("fsclinicalsFormVizPanel");
			});
		}
		return () => {
			if (fsclinicalsVizPanel) {
				fsclinicalsVizPanel.clear();
			}
		};
	}, [fsclinicalsVizPanel]);

	return (
		<div
			id="fsclinicalsFormVizPanel"
			style={{ margin: "auto", width: "100%" }}
		></div>
	);
}
