// 'use client'

// import { useEffect, useState } from "react";
// import { data, json } from "../../data/dashboard_data";
// import { DataTables } from "survey-analytics/survey.analytics.datatables.js";
// import { Model } from "survey-core";
// import $ from "jquery";
// import "datatables.net/js/jquery.dataTables.js";
// import "datatables.net-dt/js/dataTables.dataTables.js";
// import "datatables.net-buttons/js/dataTables.buttons.js";
// import "datatables.net-buttons/js/buttons.print.js";
// import "datatables.net-buttons/js/buttons.html5.js";
// import "datatables.net-colreorder/js/dataTables.colReorder.js";
// import "datatables.net-rowgroup/js/dataTables.rowGroup.js";
// import "datatables.net-colreorder-dt/css/colReorder.dataTables.css";
// import "survey-analytics/survey.analytics.datatables.css";

// export default function DashboardDatatables() {
//   let [vizPanel, setVizPanel] = useState<DataTables>();

//   if (!vizPanel) {
//     DataTables.initJQuery($);
//     const survey = new Model(json);
//     vizPanel = new DataTables(survey, data);
//     setVizPanel(vizPanel);
//   }

//   useEffect(() => {
//     vizPanel?.render("summaryContainer");
//   }, [vizPanel]);

//   return <div style={{ height: "80vh", width: "100%" }} id="summaryContainer"></div>;
// }

"use client";

// import "@/survey-analytics/survey.analytics.datatables.css";
// import "datatables.net-buttons-dt/css/buttons.dataTables.css";
// import "datatables.net-colreorder-dt/css/colReorder.dataTables.css";
// import "datatables.net-dt/css/jquery.dataTables.css";
// import "datatables.net-dt/js/dataTables.dataTables.js";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
// import { Model } from "survey-core";
// import { Model } from "../../surveyjs-core/survey-library_dev/build/survey-core/survey.core.js";
import { Model } from "survey-core";
import { data, json } from "../../data/dashboard_data-0";
// import $ from "jquery";
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
			// console.log("Rendering vizPanel");
			// vizPanel.render("summaryContainer");
			requestAnimationFrame(() => {
				vizPanel.render("summaryContainer");
			});
		}
		return () => {
			if (vizPanel) {
				// console.log("Clearing vizPanel");
				// vizPanel.clear();
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
