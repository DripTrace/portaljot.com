"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Model } from "survey-core";
import { data, json } from "@/data/clinicviews/dashboard_data-0";
import "datatables.net-colreorder-dt/css/colReorder.dataTables.css";
import "survey-analytics/survey.analytics.datatables.css";

const DashboardDatatables = () => {
	const [vizPanel, setVizPanel] = useState<any>(null);

	useEffect(() => {
		const loadDependencies = async () => {
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
				const survey = new Model(json);
				const newVizPanel = new DataTables(survey, data);
				setVizPanel(newVizPanel);

				console.log("DataTables initialized successfully.");
			} catch (error) {
				console.error("Error loading dependencies:", error);
			}
		};

		loadDependencies();
	}, []);

	useEffect(() => {
		if (vizPanel) {
			requestAnimationFrame(() => {
				vizPanel.render("summaryContainer");
			});
		}
		return () => {
			if (vizPanel) {
				requestAnimationFrame(() => {
					vizPanel.render("summaryContainer");
				});
			}
		};
	}, [vizPanel]);

	return (
		<div
			style={{ height: "80vh", width: "100%" }}
			id="summaryContainer"
		></div>
	);
};

export default dynamic(() => Promise.resolve(DashboardDatatables), {
	ssr: false,
});
