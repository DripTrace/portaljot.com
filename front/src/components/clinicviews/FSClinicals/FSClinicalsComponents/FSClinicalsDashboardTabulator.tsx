"use client";

import dynamic from "next/dynamic";
import {
	useEffect as useFsclinicalsEffect,
	useState as useFsclinicalsState,
} from "react";
import "survey-analytics/survey.analytics.tabulator.css";
import { Model as FSClinicalsModel } from "survey-core";
import "tabulator-tables/dist/css/tabulator.min.css";
import {
	data as fsclinicalsData,
	json as fsclinicalsJson,
} from "../../../../data/dashboard_data-0";

const FSClinicalsDashboardTabulator = () => {
	const [fsclinicalsVizPanel, setFsclinicalsVizPanel] =
		useFsclinicalsState<any>(null);
	const [fsclinicalsInitialized, setFsclinicalsInitialized] =
		useFsclinicalsState(false);

	useFsclinicalsEffect(() => {
		const loadFsclinicalsDependencies = async () => {
			try {
				console.log("Loading FSClinicalsTSPDF...");
				const fsclinicalsJsPDF = (await import("jspdf")).default;
				await import("jspdf-autotable");
				console.log("FSClinicalsTSPDF loaded successfully.");

				console.log("Loading FSClinicalsTabulator...");
				const { Tabulator } = await import(
					"survey-analytics/survey.analytics.tabulator.js"
				);
				console.log("FSClinicalsTabulator loaded successfully.");

				(window as any)["jsPDF"] = fsclinicalsJsPDF;

				const fsclinicalsForm = new FSClinicalsModel(fsclinicalsJson);
				const newFsclinicalsVizPanel = new Tabulator(
					fsclinicalsForm,
					fsclinicalsData
				);
				console.log(
					"FSClinicalsTabulator created:",
					newFsclinicalsVizPanel
				);

				setFsclinicalsVizPanel(newFsclinicalsVizPanel);

				setFsclinicalsInitialized(true);
			} catch (error) {
				console.error("Error loading FSClinicals dependencies:", error);
			}
		};

		loadFsclinicalsDependencies();
	}, []);

	useFsclinicalsEffect(() => {
		if (fsclinicalsVizPanel) {
			requestAnimationFrame(() => {
				fsclinicalsVizPanel.render("fsclinicalsSummaryContainer");
			});
		}
		return () => {
			if (fsclinicalsVizPanel) {
				requestAnimationFrame(() => {
					fsclinicalsVizPanel.render("fsclinicalsSummaryContainer");
				});
			}
		};
	}, [fsclinicalsVizPanel]);

	return (
		<div
			style={{ height: "100vh", width: "100%" }}
			id="fsclinicalsSummaryContainer"
		>
			{fsclinicalsInitialized
				? "FSClinicalsTabulator Initialized"
				: "Loading..."}
		</div>
	);
};

export default dynamic(() => Promise.resolve(FSClinicalsDashboardTabulator), {
	ssr: false,
});
