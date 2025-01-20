import {
    fsclinicalsForm,
    fsclinicalsTheme,
    softwareAgreementForm,
} from "@/data/fsclinicals-config";
import { FSClinicalsRootState } from "@/store/fsclinicalsStore";
import { useState as useFsclinicalsState, useState } from "react";
import { useSelector } from "react-redux";
import { Model as FSClinicalsModel } from "survey-core";
import "survey-core/defaultV2.css";
import { SurveyPDF as FSClinicalsFormPDF } from "survey-pdf";
import { Survey as FSClinicalsForm } from "survey-react-ui";
// Import the form configuration from the correct path
// import { fsclinicalsForm, fsclinicalsTheme } from '@/data/fsclinicalsFormConfig';

function createFSClinicalsFormPDFModel(
    fsclinicalsFormModel: FSClinicalsModel
): FSClinicalsFormPDF {
    const options = {
        fontSize: 10,
        margins: {
            left: 10,
            right: 10,
            top: 10,
            bot: 10,
        },
        format: [210, 297] as [number, number],
        fontName: "helvetica",
    };
    const surveyPDF = new FSClinicalsFormPDF(fsclinicalsForm, options);
    if (fsclinicalsFormModel) {
        surveyPDF.data = fsclinicalsFormModel.data;
    }
    return surveyPDF;
}

interface PatientData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dob: string;
    reason: string;
}

export default function FSClinicalsFormComponent() {
    const isDarkMode = useSelector(
        (state: FSClinicalsRootState) => state.theme.fsclinicalsIsDarkMode
    );
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState("");
    const [patientData, setPatientData] = useState<PatientData>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dob: "",
        reason: "",
    });

    function arrayBufferToBase64(buffer: ArrayBuffer): string {
        let binary = "";
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    const handleSubmit = async (sender: FSClinicalsModel) => {
        setIsLoading(true);
        setResponse("");

        const formData = sender.data;
        const pdfModel = createFSClinicalsFormPDFModel(sender);

        try {
            const pdfData = await pdfModel.raw();

            // Convert to Base64 if it's not already
            const pdfBase64 =
                typeof pdfData === "string"
                    ? pdfData
                    : arrayBufferToBase64(pdfData);

            const res = await fetch("/api/register-fsclinicals-patient", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...patientData,
                    suggestAppointment: formData.suggestAppointment,
                    appointmentDate: formData.appointmentDate,
                    appointmentTime: formData.appointmentTime,
                    pdfBase64: pdfBase64,
                }),
            });

            const data = await res.json();
            setResponse(data.message || data.error);
        } catch (error) {
            setResponse("An error occurred while processing your registration");
        }

        setIsLoading(false);
    };

    const fsclinicalsModel = new FSClinicalsModel(fsclinicalsForm);
    fsclinicalsModel.applyTheme(fsclinicalsTheme);
    fsclinicalsModel.onValueChanged.add((sender, options) => {
        if (options.name === "first_name") {
            setPatientData((prev) => ({ ...prev, firstName: options.value }));
        } else if (options.name === "last_name") {
            setPatientData((prev) => ({ ...prev, lastName: options.value }));
        } else if (options.name === "email") {
            setPatientData((prev) => ({ ...prev, email: options.value }));
        } else if (options.name === "phone") {
            setPatientData((prev) => ({ ...prev, phone: options.value }));
        } else if (options.name === "dob") {
            setPatientData((prev) => ({ ...prev, dob: options.value }));
        } else if (options.name === "reason") {
            setPatientData((prev) => ({ ...prev, reason: options.value }));
        }
    });
    fsclinicalsModel.onComplete.add(handleSubmit);

    return (
        <div className={isDarkMode ? "dark" : ""}>
            <FSClinicalsForm model={fsclinicalsModel} />
            {isLoading && <p>Processing your registration...</p>}
            {response && <p>{response}</p>}
        </div>
    );
}

async function blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === "string") {
                resolve(reader.result.split(",")[1]);
            } else {
                reject(new Error("Failed to convert blob to base64"));
            }
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

// export default function FSClinicalsFormComponent() {}
