"use client";

import { useEffect, useState } from "react";
import "survey-analytics/survey.analytics.css";
import { Model } from "survey-core";
import { data, json } from "@/data/clinicviews/dashboard_data-0";

export default function Dashboard() {
	const [vizPanel, setVizPanel] = useState<any>(null);

	useEffect(() => {
		const loadSurveyAnalytics = async () => {
			const { VisualizationPanel } = await import("survey-analytics");
			const survey = new Model(json);
			const newVizPanel = new VisualizationPanel(
				survey.getAllQuestions(),
				data
			);
			setVizPanel(newVizPanel);
		};

		loadSurveyAnalytics();
	}, []);

	useEffect(() => {
		if (vizPanel) {
			requestAnimationFrame(() => {
				vizPanel.render("surveyVizPanel");
			});
		}
		return () => {
			if (vizPanel) {
				vizPanel.clear();
			}
		};
	}, [vizPanel]);

	return (
		<div
			id="surveyVizPanel"
			style={{ margin: "auto", width: "100%" }}
		></div>
	);
}
