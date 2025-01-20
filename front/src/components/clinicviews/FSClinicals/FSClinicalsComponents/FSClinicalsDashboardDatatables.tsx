"use client";

import dynamic from "next/dynamic";
import {
	useEffect as useFsclinicalsEffect,
	useState as useFsclinicalsState,
} from "react";
import { Model as FSClinicalsModel } from "survey-core";
import {
	data as fsclinicalsData,
	json as fsclinicalsJson,
} from "../../../../data/dashboard_data-0";
import "datatables.net-colreorder-dt/css/colReorder.dataTables.css";
import "survey-analytics/survey.analytics.datatables.css";

const FSClinicalsDashboardDatatables = () => {
	const [fsclinicalsVizPanel, setFsclinicalsVizPanel] =
		useFsclinicalsState<any>(null);

	useFsclinicalsEffect(() => {
		const loadFsclinicalsDependencies = async () => {
			try {
				const $ = (await import("jquery")).default;
				await import("datatables.net-dt/js/dataTables.dataTables.js");
				await import("datatables.net-buttons/js/dataTables.buttons.js");
				await import("datatables.net-buttons/js/buttons.print.js");
				await import("datatables.net-buttons/js/buttons.html5.js");
				await import(
					"datatables.net-colreorder/js/dataTables.colReorder.js"
				);
				await import(
					"datatables.net-rowgroup/js/dataTables.rowGroup.js"
				);
				const { DataTables } = await import(
					"survey-analytics/survey.analytics.datatables.js"
				);

				DataTables.initJQuery($);
				const fsclinicalsForm = new FSClinicalsModel(fsclinicalsJson);
				const newFsclinicalsVizPanel = new DataTables(
					fsclinicalsForm,
					fsclinicalsData
				);
				setFsclinicalsVizPanel(newFsclinicalsVizPanel);

				console.log("FSClinicalsDataTables initialized successfully.");
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
		></div>
	);
};

export default dynamic(() => Promise.resolve(FSClinicalsDashboardDatatables), {
	ssr: false,
});
