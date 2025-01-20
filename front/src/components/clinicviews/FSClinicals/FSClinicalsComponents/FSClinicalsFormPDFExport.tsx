"use client";

import { Model as FSClinicalsModel } from "survey-core";
import { SurveyPDF as FSClinicalsFormPDF } from "survey-pdf";
import { json as fsclinicalsJson } from "../../../../data/survey_json-0.js";

function saveFsclinicalsPDF(fsclinicalsModel: FSClinicalsModel) {
	const fsclinicalsPdfWidth =
		!!fsclinicalsModel && fsclinicalsModel.fsclinicalsPdfWidth
			? fsclinicalsModel.fsclinicalsPdfWidth
			: 210;
	const fsclinicalsPdfHeight =
		!!fsclinicalsModel && fsclinicalsModel.fsclinicalsPdfHeight
			? fsclinicalsModel.fsclinicalsPdfHeight
			: 297;
	const fsclinicalsOptions = {
		fontSize: 8,
		margins: {
			left: 10,
			right: 10,
			top: 10,
			bot: 10,
		},
		format: [fsclinicalsPdfWidth, fsclinicalsPdfHeight],
		fontName: "Roboto",
		useCustomFontInHtml: true,
	};

	const fsclinicalsFormPDF = new FSClinicalsFormPDF(
		fsclinicalsJson,
		fsclinicalsOptions
	);
	fsclinicalsFormPDF.data = fsclinicalsModel.data;
	fsclinicalsFormPDF.save();
}

export default function FSClinicalsFormPDFExport() {
	const fsclinicalsModel = new FSClinicalsModel(fsclinicalsJson);
	return (
		<div className="flex min-h-screen flex-col items-center /*p-24*/">
			<h1 className="mb-12 text-3xl font-bold tracking-tight md:text-xl xl:text-2xl">
				FSClinicalsTS PDF Generator
			</h1>
			<div className="text-lg text-neutral-500 dark:text-neutral-300">
				<p>
					FSClinicalsTS PDF Generator is a client-side extension over
					FSClinicalsTS Form Library that enables users to save
					surveys as PDF documents.
				</p>
				<p>
					NOTE: Dynamic FSClinicals elements and characteristics
					(visibility, validation, navigation buttons) are not
					supported.
				</p>
				<p>
					Click the FSClinicals button below to export FSClinicals
					form to a PDF document.
				</p>
				<div className="flex items-center p-4">
					<button
						onClick={() => saveFsclinicalsPDF(fsclinicalsModel)}
						className="inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
					>
						Save as FSClinicals PDF
					</button>
				</div>
			</div>
		</div>
	);
}
