"use client";
import { useRouter } from "next/navigation";
import { Model, Question, SurveyModel } from "survey-core";
import "survey-core/defaultV2.css";
import { Survey } from "survey-react-ui";
import { SurveyPDF } from "survey-pdf";
import { useEffect, useState } from "react";
import {
	json,
	themeJson,
} from "@/data/clinicviews/accessable/llpmg-patient-form";
// import { json, themeJson } from "@/data/clinicviews/llpmg-patient-form";

interface FormResultItem {
	name: string;
	value: any;
	title: string;
	displayValue: string;
}

export default function IntakePacket() {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);
	const [response, setResponse] = useState("");
	const [patientFirstName, setPatientFirstName] = useState<Question>();
	const [patientLastName, setPatientLastName] = useState<Question>();
	// const [formResults, setFormResults] = useState<any>([]);
	const [blobURL, setBlobURL] = useState<string>("");

	const storageItemKey = "patient-form";

	const [formResults, setFormResults] = useState<FormResultItem[]>([]);

	function createSurveyPdfModel(surveyModel: SurveyModel) {
		const pdfWidth =
			!!surveyModel && surveyModel.pdfWidth ? surveyModel.pdfWidth : 210;
		const pdfHeight =
			!!surveyModel && surveyModel.pdfHeight
				? surveyModel.pdfHeight
				: 297;
		const options = {
			fontSize: 10,
			margins: {
				left: 10,
				right: 10,
				top: 10,
				bot: 10,
			},
			format: [pdfWidth, pdfHeight],
			fontName: "helvetica", // Changed from "Roboto" to "helvetica"
			useCustomFontInHtml: false, // Changed to false
		};
		const surveyPDF = new SurveyPDF(json, options);
		if (surveyModel) {
			surveyPDF.data = surveyModel.data;
		}
		return surveyPDF;
	}

	const handleSubmit = async (pdfData: string) => {
		setIsLoading(true);
		setResponse("");

		try {
			const formData = new FormData();
			formData.append(
				"file",
				new Blob([pdfData], { type: "application/pdf" }),
				"newpatient.pdf"
			);

			const newPatient = JSON.stringify(formResults, null, 3);

			const res = await fetch("/api/clinicviews/upload-form/route", {
				method: "POST",
				body: formData,
			});

			if (!res.ok) {
				const errorText = await res.text();
				throw new Error(
					`HTTP error! status: ${res.status}, body: ${errorText}`
				);
			} else {
				console.log("res.ok: ", res.ok);
				router.push("https://lomalindapsych.com");
			}

			const data = await res.json();
			setResponse(data.message || data.error);
			console.log(response);
		} catch (error: unknown) {
			console.error("Error in handleSubmit:", error);
			if (error instanceof Error) {
				setResponse(
					`An error occurred while sending the PDF: ${error.message}`
				);
			} else {
				setResponse("An unknown error occurred while sending the PDF");
			}
		}

		setIsLoading(false);
		// router.push("/clinicviews/");
		router.push("https://lomalindapsych.com");
	};

	// const handleFormSubmit = async (newpatient: string) => {
	// 	setIsLoading(true);
	// 	setResponse("");

	// 	try {
	// 		const res = await fetch("/api/clinicviews/newPatient/route", {
	// 			method: "POST",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 			body: JSON.stringify({ newpatient }),
	// 		});
	// 		const data = await res.json();
	// 		setResponse(data.message || data.error);
	// 	} catch (error) {
	// 		setResponse("An error occurred while sending the email");
	// 	}

	// 	setIsLoading(false);
	// };

	const model = new Model(json);
	model.navigationBar.getActionById("sv-nav-complete").visible = false;

	// model.addNavigationItem({
	// 	id: "survey_pdf_preview",
	// 	title: "Preview PDF",
	// 	action: previewPdf,
	// });
	// model.addNavigationItem({
	//     id: "model_save_as_file",
	//     title: "Save as PDF",
	//     action: () => {
	//         saveSurveyToPdf("modelResult.pdf", model);
	//     },
	// });
	// model.addNavigationItem({
	// 	id: "patient_registry",
	// 	title: "Register",
	// 	action: () => {
	// 		const pdfOutput = saveSurveyToPdf(
	// 			"registration-results.pdf",
	// 			model
	// 		);
	// 		console.log("pdfOutput: ", pdfOutput);
	// 	},
	// });
	// model.addNavigationItem({
	// 	id: "model_save_via_blob",
	// 	title: "Save via Blob",
	// 	action: savePdfViaRealBlob,
	// });
	model.applyTheme(themeJson);

	// model.onComplete.add((sender, options) => {
	//     // setPatientFirstName(model.getQuestionByName("first_name").value);
	//     // setPatientLastName(model.getQuestionByName("last_name").value);
	//     // const patientName = {
	//     // 	firstName: patientFirstName,
	//     // 	lastName: patientLastName,
	//     // };
	//     // console.log("patientName:\n", patientName);
	//     const newPatient = JSON.stringify(sender.data, null, 3);
	//     console.log("newPatient:\n", newPatient);
	//     const resultData = [];
	//     for (const key in model.data) {
	//         const question = model.getQuestionByName(key);
	//         if (!!question) {
	//             const item = {
	//                 name: key,
	//                 value: question.value,
	//                 title: question.displayValue,
	//                 displayValue: question.displayValue,
	//             };
	//             resultData.push(item);
	//             setFormResults(resultData);
	//         }
	//     }

	//     const modelPDF = createSurveyPdfModel(model);
	//     modelPDF.raw("blob").then((pdfData: string) => {
	//         // console.log("pdfData:\n", pdfData);
	//         handleSubmit(pdfData);
	//     });

	//     // const firstName = model.getQuestionByName("first_name");
	//     // const lastName = model.getQuestionByName("last_name");

	//     // console.log("first name:\n", firstName.value);
	//     // console.log("last name:\n", lastName.value);

	//     window.localStorage.setItem(storageItemKey, "");
	// });

	model.onComplete.add((sender, options) => {
		const newPatient = JSON.stringify(sender.data, null, 3);
		console.log("newPatient:\n", newPatient);

		const resultData: FormResultItem[] = [];
		for (const key in model.data) {
			const question = model.getQuestionByName(key);
			if (question) {
				const item: FormResultItem = {
					name: key,
					value: question.value,
					title: question.title,
					displayValue: question.displayValue,
				};
				resultData.push(item);
			}
		}
		setFormResults(resultData);

		const modelPDF = createSurveyPdfModel(model);
		modelPDF.raw("blob").then((pdfData: string) => {
			handleSubmit(pdfData);
		});

		window.localStorage.setItem(storageItemKey, "");
	});
	// function savePdfViaRealBlob() {
	// 	const modelPDF = createSurveyPdfModel(model);
	// 	modelPDF.raw("blob").then(function (rawblob) {
	// 		console.log("rawblob:\n", rawblob);
	// 		setBlobURL(rawblob);
	// 		const a = document.createElement("a");
	// 		a.href = rawblob;
	// 		a.download = "modelViaBlob.pdf";
	// 		document.body.appendChild(a);
	// 		a.click();
	// 	});
	// }
	function saveSurveyToPdf(filename: string, surveyModel: SurveyModel) {
		createSurveyPdfModel(surveyModel).save(filename);
	}
	function saveFormData(form: SurveyModel) {
		const data = form.data;
		data.pageNo = form.currentPageNo;
		window.localStorage.setItem(storageItemKey, JSON.stringify(data));
	}

	// Save survey results to the local storage
	model.onValueChanged.add(saveFormData);
	model.onCurrentPageChanged.add(saveFormData);

	// Restore survey results
	const prevData = window.localStorage.getItem(storageItemKey) || null;
	if (prevData) {
		const data = JSON.parse(prevData);
		model.data = data;
		if (data.pageNo) {
			model.currentPageNo = data.pageNo;
		}
	}
	function previewPdf() {
		const surveyPDF = createSurveyPdfModel(model);
		const oldFrame = document.getElementById("pdf-preview-frame");
		if (oldFrame && oldFrame.parentNode)
			oldFrame.parentNode.removeChild(oldFrame);
		surveyPDF.raw().then(function (uint8Array) {
			const blob = new Blob([uint8Array], { type: "application/pdf" });
			const url = URL.createObjectURL(blob);
			const pdfEmbed = document.createElement("embed");
			pdfEmbed.setAttribute("id", "pdf-preview-frame");
			pdfEmbed.setAttribute("type", "application/pdf");
			pdfEmbed.setAttribute("style", "width:100%");
			pdfEmbed.setAttribute("height", `${window.innerHeight - 100}`);
			pdfEmbed.setAttribute("src", url);
			const previewDiv = document.getElementById("pdf-preview");
			if (previewDiv) {
				previewDiv.appendChild(pdfEmbed);
			} else {
				const hiddenElements = document.createElement("div");
				hiddenElements.setAttribute("style", "display: none;");
				hiddenElements.appendChild(pdfEmbed);
				document.body.appendChild(hiddenElements);
			}
		});
	}

	useEffect(() => {
		console.log(
			"(src/components/clinicviews/Survey)\nformResults:\n",
			formResults
		);
	}, [formResults]);

	return (
		<div className="relative overflow-x-hidden w-full">
			<div className="fixed top-0 left-0 w-full h-screen z-0">
				<video
					autoPlay
					muted
					loop
					className="object-cover w-full h-full"
					src="https://firebasestorage.googleapis.com/v0/b/photo-gallery-upload.appspot.com/o/20535743-uhd_3840_2160_25fps.mp4?alt=media&token=0b59399b-488b-499a-a47f-fcb617a56189"
				>
					Your browser does not support the video tag.
				</video>
			</div>
			<div className="fixed top-0 left-0 w-full h-full bg-black/30 dark:bg-black/50 z-20"></div>
			<div className="relative z-20 w-full">
				<div className="flex items-center justify-center flex-col size-full">
					<Survey model={model} />
					<div id="surveyElement"></div>
					{isLoading && <p>Loading...</p>}
				</div>
			</div>
		</div>
	);
}
