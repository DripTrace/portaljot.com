"use client";

import { useRouter } from "next/navigation";
import { Model, SurveyModel } from "survey-core";
import "survey-core/defaultV2.css";
import { Survey } from "survey-react-ui";
import { SurveyPDF } from "survey-pdf";
import { useState, useEffect } from "react";
import { fsclinicalsForm, fsclinicalsTheme } from "@/data/fsclinicals-config";
// import { fsclinicalsForm as fsclinicalsExtendedForm } from "@/data/fsclinicals-extended";
// import { fsclinicalsForm as fsclinicalsPatientForm } from "@/data/fsclinicals-extended";
// import { fsclinicalsPatientForm } from "@/data/fsclinicals-patient-form";
// import { fsclinicalsPatientForm } from "@/data/fsclinicals-patient-form-bk";
import { fsclinicalsPatientForm } from "@/data/fsclinicals-cleaned-data";
import { useDomainSelector } from "@/store/domainHooks";
{
    useDomainSelector;
}

export default function FSClinicalsFormComponent() {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState("");
    const [formResults, setFormResults] = useState<any>({});
    const [pdfData, setPdfData] = useState<string>("");

    const storageItemKey = "fsclinicals-patient-form";

    function createSurveyPdfModel(surveyModel: SurveyModel) {
        const pdfWidth = 210;
        const pdfHeight = 297;
        const options = {
            fontSize: 9,
            margins: {
                top: 10,
                bot: 10,
                left: 15,
                right: 15,
            },
            format: [pdfWidth, pdfHeight],
            fontName: "Courier",
            useCustomFontInHtml: true,
        };
        // const surveyPDF = new SurveyPDF(fsclinicalsExtendedForm, options);
        const surveyPDF = new SurveyPDF(fsclinicalsPatientForm, options);
        if (surveyModel) {
            surveyPDF.mode = "display";
            surveyPDF.data = surveyModel.data;
        }
        return surveyPDF;
    }

    const handleSubmit = async () => {
        setIsLoading(true);
        setResponse("");

        try {
            const formData = new FormData();
            formData.append(
                "file",
                new Blob([pdfData], { type: "application/pdf" }),
                "fsclinicals-newpatient.pdf"
            );

            // Add additional form fields
            formData.append(
                "patientName",
                `${formResults["first-name"]} ${formResults["last-name"]}`
            );
            formData.append("email", formResults["email"]);
            formData.append("phone", formResults["phone-cell"]);
            formData.append("reason", formResults["reason"]);
            // // Calculate and append DAST score
            // const dastScore = Object.entries(formResults.dast_questions).reduce(
            //     (score, [_, answer]) => {
            //         return score + (answer === "Yes" ? 1 : 0);
            //     },
            //     0
            // );
            // console.log("dastScore: ", dastScore);
            // formData.append("dast_score", String(dastScore));

            // // Calculate and append ASRS score
            // const asrsScoreMap: { [key: string]: number } = {
            //     Never: 0,
            //     Rarely: 1,
            //     Sometimes: 2,
            //     Often: 3,
            //     "Very Often": 4,
            // };
            // const asrsScore = [1, 2, 3, 4, 5, 6].reduce(
            //     (sum, i) =>
            //         sum +
            //         (asrsScoreMap[
            //             formResults[
            //                 `question_${i}`
            //             ] as keyof typeof asrsScoreMap
            //         ] || 0),
            //     0
            // );
            // formData.append("asrs_score", String(asrsScore));

            // // Calculate and append PHQ-9 score
            // const phq9Score = Object.values(formResults.phq9_questions).reduce(
            //     (sum: number, score) =>
            //         sum + (typeof score === "number" ? score : 0),
            //     0
            // );
            // formData.append("phq9_score", String(phq9Score));

            // // Calculate and append GAD-7 score
            // const gad7Score = Object.values(formResults.gad7_questions).reduce(
            //     (sum: number, score) =>
            //         sum + (typeof score === "number" ? score : 0),
            //     0
            // );
            // formData.append("gad7_score", String(gad7Score));
            // formData.append(
            //     "suggestAppointment",
            //     String(formResults["suggestAppointment"])
            // );
            formData.append("appointmentDate", formResults["appointmentDate"]);
            formData.append("appointmentTime", formResults["appointmentTime"]);
            console.log("FORM RESULTS:\n", formResults);

            console.log("Sending form data: ", formData);

            const res = await fetch("/api/register-fsclinicals-patient/route", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.log("res:\n", res);
                throw new Error(
                    `HTTP error! status: ${res.status}, body: ${errorText}`
                );
            }
            console.log("res\n", res);

            const data = await res.json();
            setResponse(data.message || data.error);
        } catch (error: unknown) {
            console.error("Error in handleSubmit:", error);
            if (error instanceof Error) {
                setResponse(
                    `An error occurred while sending the form: ${error.message}`
                );
            } else {
                setResponse("An unknown error occurred while sending the form");
            }
        }

        setIsLoading(false);
        router.refresh();
        router.push("/");
    };

    const model = new Model(fsclinicalsPatientForm);
    // model.mode = "display";
    model.validationAllowSwitchPages = true;

    model.navigationBar.getActionById("sv-nav-complete").visible = false;
    // model.addNavigationItem({
    //     id: "survey_pdf_preview",
    //     title: "Preview PDF",
    //     action: previewPdf,
    // });
    // model.addNavigationItem({
    //     id: "model_save_as_file",
    //     title: "Save as PDF",
    //     action: () => {
    //         saveSurveyToPdf("modelResult.pdf", model);
    //     },
    // });
    // model.addNavigationItem({
    //     id: "patient_registry",
    //     title: "Register",
    //     action: () => {
    //         const pdfOutput = saveSurveyToPdf(
    //             "registration-results.pdf",
    //             model
    //         );
    //         console.log("pdfOutput: ", pdfOutput);
    //     },
    // });
    // model.addNavigationItem({
    //     id: "model_save_via_blob",
    //     title: "Save via Blob",
    //     action: savePdfViaRealBlob,
    // });
    model.applyTheme(fsclinicalsTheme);

    model.onComplete.add((sender, options) => {
        const resultData: any = {};
        for (const key in sender.data) {
            const question = sender.getQuestionByName(key);
            if (question) {
                resultData[key] = question.value;
            }
        }
        setFormResults(resultData);

        const modelPDF = createSurveyPdfModel(model);
        modelPDF.raw("blob").then((pdfData: string) => {
            setPdfData(pdfData);
        });

        window.localStorage.setItem(storageItemKey, "");
    });

    useEffect(() => {
        console.log("formResults:\n", formResults);

        if (Object.keys(formResults).length !== 0 && pdfData) {
            handleSubmit();
            console.log("Submitting form with updated data:\n", formResults);
        }
    }, [formResults, pdfData]);

    function saveFormData(form: SurveyModel) {
        const data = form.data;
        data.pageNo = form.currentPageNo;
        // only push to prod when auth is built
        // window.localStorage.setItem(storageItemKey, JSON.stringify(data));
    }

    model.onValueChanged.add(saveFormData);
    model.onCurrentPageChanged.add(saveFormData);

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

    function savePdfViaRealBlob() {
        const modelPDF = createSurveyPdfModel(model);
        modelPDF.raw("blob").then(function (rawblob) {
            console.log("rawblob:\n", rawblob);
            const a = document.createElement("a");
            a.href = rawblob;
            a.download = "modelViaBlob.pdf";
            document.body.appendChild(a);
            a.click();
        });
    }

    function saveSurveyToPdf(filename: string, surveyModel: SurveyModel) {
        createSurveyPdfModel(surveyModel).save(filename);
    }

    // useEffect(() => {
    //     setDomainFormContext(retrievedDomainContext);
    //     console.log("retrievedDomainContext: ", domainFormContext);
    // }, [retrievedDomainContext]);

    return (
        <>
            <Survey
                model={model}
                // style={
                //     "{cursor: auto !important;} .sv-header {display: none !important;}"
                // }
                className="h-full"
            />
            <div id="surveyElement"></div>
            {isLoading && <p>Processing your registration...</p>}
            {response && <p>{response}</p>}
            {/* <div id="pdf-preview"></div> */}
        </>
    );
}
