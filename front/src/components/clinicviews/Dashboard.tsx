"use client";

import { useEffect, useState } from "react";
// import "@/survey.analytics.css";
// import "@/tables/table.scss";
// import { Model } from "../../surveyjs-core/survey-library_dev/build/survey-core/survey.core.js";
import "survey-analytics/survey.analytics.css";
import { Model } from "survey-core";
import { data, json } from "../../data/dashboard_data-0";
// import { Model } from "/Users/rpalm/Downloads/surveyjs/build/survey-core";
// import { Model } from "../../surveyjs-core/survey-library_dev/src/entries/core";
// import { Model } from "../../surveyjs-core/survey-library_dev/build/survey-core/typings/entries/core.d";
// export * from "../../surveyjs-core/survey-library_dev/build/survey-core/typings/entries/core-wo-model.d";

export default function Dashboard() {
    const [vizPanel, setVizPanel] = useState<any>(null);

    useEffect(() => {
        const loadSurveyAnalytics = async () => {
            // const { VisualizationPanel } = await import(
            // 	"../../surveyjs-core/survey-analytics_dev/src/visualizationPanel"
            // );
            const { VisualizationPanel } = await import("survey-analytics");
            // const { VisualizationPanel } = await import(
            // 	"/Users/rpalm/Downloads/surveyjs/survey-analytics/src/entries/summary"
            // );
            // const { VisualizationPanel } = await import("@/entries/summary");
            // const { VisualizationPanel } = await import(
            // 	"../../surveyjs-core/survey-analytics_dev/src/entries/summary"
            // );
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
            style={{ margin: "auto", width: "100%" /*, maxWidth: "1400px"*/ }}
        ></div>
    );
}
