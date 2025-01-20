// export const fsclinicalsForm = {
//     title: "Four Square Clinicals Forms",
//     pages: [
//         {
//             name: "patient_information",
//             title: "Patient Information",
//             elements: [
//                 {
//                     type: "text",
//                     name: "last_name",
//                     title: "Last Name",
//                 },
//                 {
//                     type: "text",
//                     name: "first_name",
//                     title: "First Name",
//                 },
//                 {
//                     type: "text",
//                     name: "middle_initial",
//                     title: "MI",
//                 },
//                 {
//                     type: "text",
//                     name: "dob",
//                     title: "DOB",
//                 },
//                 {
//                     type: "text",
//                     name: "address",
//                     title: "Address",
//                 },
//                 {
//                     type: "text",
//                     name: "city",
//                     title: "City",
//                 },
//                 {
//                     type: "text",
//                     name: "state",
//                     title: "State",
//                 },
//                 {
//                     type: "text",
//                     name: "zip",
//                     title: "Zip",
//                 },
//                 {
//                     type: "text",
//                     name: "telephone",
//                     title: "Telephone",
//                 },
//                 {
//                     type: "text",
//                     name: "email",
//                     title: "Email",
//                 },
//             ],
//         },
//         {
//             name: "authorization_release",
//             title: "Authorization for Use or Disclosure of Behavioral Health Record",
//             elements: [
//                 {
//                     type: "text",
//                     name: "release_from",
//                     title: "Release From: Person/Entity",
//                 },
//                 {
//                     type: "text",
//                     name: "release_from_address",
//                     title: "Address",
//                 },
//                 {
//                     type: "text",
//                     name: "release_from_city",
//                     title: "City/State/Zip",
//                 },
//                 {
//                     type: "text",
//                     name: "release_from_phone",
//                     title: "Phone",
//                 },
//                 {
//                     type: "text",
//                     name: "release_from_fax",
//                     title: "Fax",
//                 },
//                 {
//                     type: "text",
//                     name: "release_to",
//                     title: "Release To: Person/Entity",
//                 },
//                 {
//                     type: "text",
//                     name: "release_to_address",
//                     title: "Address",
//                 },
//                 {
//                     type: "text",
//                     name: "release_to_city",
//                     title: "City/State/Zip",
//                 },
//                 {
//                     type: "text",
//                     name: "release_to_phone",
//                     title: "Phone",
//                 },
//                 {
//                     type: "text",
//                     name: "release_to_fax",
//                     title: "Fax",
//                 },
//                 {
//                     type: "checkbox",
//                     name: "release_purpose",
//                     title: "Purpose",
//                     choices: [
//                         "Continuing Treatment",
//                         "Legal",
//                         "Insurance",
//                         "Personal Use",
//                         "Other",
//                     ],
//                 },
//                 {
//                     type: "panel",
//                     name: "information_to_release",
//                     title: "Information to Release",
//                     elements: [
//                         {
//                             type: "text",
//                             name: "date_range_from",
//                             title: "Date Range of Records Requested: From",
//                         },
//                         {
//                             type: "text",
//                             name: "date_range_to",
//                             title: "To",
//                         },
//                         {
//                             type: "checkbox",
//                             name: "information_requested",
//                             title: "Please initial next to each type of information requested",
//                             choices: [
//                                 "Summary Letter",
//                                 "Attendance Record",
//                                 "Medications List",
//                                 "Contact Log",
//                                 "Initial Evaluation",
//                                 "Treatment Plan",
//                                 "Progress Notes",
//                                 "Psychotherapy Notes",
//                                 "Self-Care Management Plan",
//                                 "Results of Diagnostic Testing",
//                                 "Other",
//                             ],
//                         },
//                         {
//                             type: "radiogroup",
//                             name: "family_counseling_release",
//                             title: "Joint/Family Counseling: Information disclosed may include notes/records from joint/family counseling sessions, if any. Initial one of the following statements:",
//                             choices: [
//                                 "I do authorize release of information from joint/family counseling sessions",
//                                 "I do not authorize release of information from joint/family counseling sessions",
//                             ],
//                         },
//                         {
//                             type: "text",
//                             name: "sensitive_information_acknowledgement",
//                             title: "Sensitive Information: My initials demonstrate my acknowledgement and authorization to release or disclose this type of information:",
//                         },
//                         {
//                             type: "radiogroup",
//                             name: "delivery_instructions",
//                             title: "Delivery Instructions",
//                             choices: [
//                                 "Mail",
//                                 "Fax records directly to person/entity specified above",
//                                 "Call patient when records are ready for pick up",
//                                 "Patient/Representative authorizes to pick up the copies",
//                                 "Other instructions",
//                             ],
//                         },
//                         {
//                             type: "text",
//                             name: "expiration",
//                             title: "Expiration: Without my written revocation, this authorization will automatically expire upon satisfaction of the need for disclosure, or one year from the date signed, unless otherwise specified:",
//                         },
//                     ],
//                 },
//                 {
//                     type: "html",
//                     name: "notice_of_rights",
//                     title: "Notice of Rights",
//                     isCollapsed: true,
//                     html: `
//                         <h3>Notice of Rights:</h3>
//                         <ul>
//                             <li>If I refuse to sign this authorization, my refusal will not affect my ability to obtain treatment.</li>
//                             <li>I may inspect or obtain a copy of the health information requested in this authorization.</li>
//                             <li>I may revoke this authorization at any time in writing, signed by me or on my behalf, and delivered to Four Square Clinicals, Medical Records, 100 N Arlington Ave, Suite 340A, Reno, NV 89501.</li>
//                             <li>If I revoke this authorization, the revocation will not have any effect on any actions taken prior to Four Square Clinicals’ receipt of the revocation.</li>
//                             <li>I have a right to receive a copy of this authorization.</li>
//                             <li>Information disclosed pursuant to this authorization could be re-disclosed by the recipient and may no longer be protected by the federal privacy rule (HIPAA). However, Nevada law prohibits the person receiving my health information from making further disclosure of it unless another authorization for such disclosure is obtained from me or unless such disclosure is specifically required or permitted by law.</li>
//                         </ul>
//                     `,
//                 },
//                 {
//                     type: "text",
//                     name: "patient_signature",
//                     title: "Signature of Patient or Legal Representative",
//                 },
//                 {
//                     type: "text",
//                     name: "patient_signature_date",
//                     title: "Date",
//                 },
//                 {
//                     type: "text",
//                     name: "relationship",
//                     title: "Relationship (if Legal Representative)",
//                 },
//                 {
//                     type: "text",
//                     name: "provider_signature",
//                     title: "Signature of Provider",
//                 },
//                 {
//                     type: "text",
//                     name: "provider_signature_date",
//                     title: "Date",
//                 },
//             ],
//         },
//         {
//             name: "nichq_vanderbilt_assessment_scale",
//             title: "NICHQ Vanderbilt Assessment Scale",
//             elements: [
//                 {
//                     type: "text",
//                     name: "date",
//                     title: "Today's Date",
//                 },
//                 {
//                     type: "text",
//                     name: "child_name",
//                     title: "Child's Name",
//                 },
//                 {
//                     type: "text",
//                     name: "child_dob",
//                     title: "Date of Birth",
//                 },
//                 {
//                     type: "text",
//                     name: "informant_name",
//                     title: "Informant's Name (Parent/Teacher)",
//                 },
//                 {
//                     type: "text",
//                     name: "informant_phone",
//                     title: "Informant's Phone Number",
//                 },
//                 {
//                     type: "radiogroup",
//                     name: "evaluation_basis",
//                     title: "Is this evaluation based on a time when the child was on medication?",
//                     choices: [
//                         "Was on medication",
//                         "Was not on medication",
//                         "Not sure",
//                     ],
//                 },
//                 {
//                     type: "matrix",
//                     name: "symptoms",
//                     title: "Symptoms",
//                     columns: [
//                         { value: "never", text: "Never" },
//                         { value: "occasionally", text: "Occasionally" },
//                         { value: "often", text: "Often" },
//                         { value: "very_often", text: "Very Often" },
//                     ],
//                     rows: [
//                         {
//                             value: "attention_details",
//                             text: "Fails to give attention to details or makes careless mistakes in schoolwork",
//                         },
//                         {
//                             value: "difficulty_attention",
//                             text: "Has difficulty sustaining attention to tasks or activities",
//                         },
//                         {
//                             value: "does_not_listen",
//                             text: "Does not seem to listen when spoken to directly",
//                         },
//                         {
//                             value: "follow_directions",
//                             text: "Does not follow through on instructions and fails to finish schoolwork (not due to oppositional behavior or failure to understand)",
//                         },
//                         {
//                             value: "organizing_tasks",
//                             text: "Has difficulty organizing tasks and activities",
//                         },
//                         {
//                             value: "avoids_tasks",
//                             text: "Avoids, dislikes, or is reluctant to engage in tasks that require sustained mental effort",
//                         },
//                         {
//                             value: "loses_things",
//                             text: "Loses things necessary for tasks or activities (school assignments, pencils, or books)",
//                         },
//                         {
//                             value: "easily_distracted",
//                             text: "Is easily distracted by extraneous stimuli",
//                         },
//                         {
//                             value: "forgetful_daily",
//                             text: "Is forgetful in daily activities",
//                         },
//                         {
//                             value: "fidgets",
//                             text: "Fidgets with hands or feet or squirms in seat",
//                         },
//                         {
//                             value: "leaves_seat",
//                             text: "Leaves seat in classroom or in other situations in which remaining seated is expected",
//                         },
//                         {
//                             value: "runs_climbs",
//                             text: "Runs about or climbs excessively in situations in which remaining seated is expected",
//                         },
//                         {
//                             value: "difficulty_playing",
//                             text: "Has difficulty playing or engaging in leisure activities quietly",
//                         },
//                         {
//                             value: "on_the_go",
//                             text: "Is 'on the go' or often acts as if 'driven by a motor'",
//                         },
//                         { value: "talks_too_much", text: "Talks excessively" },
//                         {
//                             value: "blurts_out",
//                             text: "Blurts out answers before questions have been completed",
//                         },
//                         {
//                             value: "difficulty_waiting",
//                             text: "Has difficulty waiting in line",
//                         },
//                         {
//                             value: "interrupts_intrudes",
//                             text: "Interrupts or intrudes on others (eg, butts into conversations/games)",
//                         },
//                         { value: "loses_temper", text: "Loses temper" },
//                         {
//                             value: "defies_refuses",
//                             text: "Actively defies or refuses to comply with adult’s requests or rules",
//                         },
//                         {
//                             value: "angry_resentful",
//                             text: "Is angry or resentful",
//                         },
//                         {
//                             value: "spiteful_vindictive",
//                             text: "Is spiteful and vindictive",
//                         },
//                         {
//                             value: "bullies_threatens",
//                             text: "Bullies, threatens, or intimidates others",
//                         },
//                         {
//                             value: "starts_fights",
//                             text: "Initiates physical fights",
//                         },
//                         {
//                             value: "lies_to_get_out",
//                             text: "Lies to obtain goods for favors or to avoid obligations (eg, 'cons' others)",
//                         },
//                         {
//                             value: "physically_cruel_people",
//                             text: "Is physically cruel to people",
//                         },
//                         {
//                             value: "stolen_things_value",
//                             text: "Has stolen items of nontrivial value",
//                         },
//                         {
//                             value: "deliberately_destroys_property",
//                             text: "Deliberately destroys others’ property",
//                         },
//                         {
//                             value: "fearful_anxious",
//                             text: "Is fearful, anxious, or worried",
//                         },
//                         {
//                             value: "self_conscious",
//                             text: "Is self-conscious or easily embarrassed",
//                         },
//                         {
//                             value: "afraid_try_new_things",
//                             text: "Is afraid to try new things for fear of making mistakes",
//                         },
//                         {
//                             value: "feels_worthless_inferior",
//                             text: "Feels worthless or inferior",
//                         },
//                         {
//                             value: "blames_self",
//                             text: "Blames self for problems; feels guilty",
//                         },
//                         {
//                             value: "feels_lonely",
//                             text: "Feels lonely, unwanted, or unloved; complains that 'no one loves him or her'",
//                         },
//                         {
//                             value: "sad_unhappy",
//                             text: "Is sad, unhappy, or depressed",
//                         },
//                     ],
//                 },
//                 {
//                     type: "matrix",
//                     name: "performance",
//                     title: "Performance",
//                     columns: [
//                         { value: "excellent", text: "Excellent" },
//                         {
//                             value: "above_average",
//                             text: "Somewhat Above Average",
//                         },
//                         { value: "average", text: "Average" },
//                         { value: "problem", text: "Problem" },
//                         { value: "problematic", text: "Problematic" },
//                     ],
//                     rows: [
//                         {
//                             value: "overall_school_performance",
//                             text: "Overall school performance",
//                         },
//                         { value: "reading", text: "Reading" },
//                         { value: "writing", text: "Writing" },
//                         { value: "mathematics", text: "Mathematics" },
//                         {
//                             value: "relationship_with_parents",
//                             text: "Relationship with parents",
//                         },
//                         {
//                             value: "relationship_with_siblings",
//                             text: "Relationship with siblings",
//                         },
//                         {
//                             value: "relationship_with_peers",
//                             text: "Relationship with peers",
//                         },
//                         {
//                             value: "participation_organized_activities",
//                             text: "Participation in organized activities (eg, teams)",
//                         },
//                     ],
//                 },
//                 {
//                     type: "comment",
//                     name: "comments",
//                     title: "Comments",
//                 },
//             ],
//         },
//         {
//             name: "medication_informed_consent",
//             title: "Medication Informed Consent Form",
//             elements: [
//                 {
//                     type: "html",
//                     name: "medication_informed_consent_content",
//                     title: "Medication Informed Consent Form",
//                     isCollapsed: true,
//                     html: `
//               <h3>Medication Informed Consent Form</h3>
//               <strong>Four Square Clinicals needs to maintain a written record of your decision to consent to the administration of psychotropic medications. You may be treated with psychotropic medication only after you have been informed of your right to accept or refuse such medications. In order to allow you to make an informed decision, your physician must have provided to you sufficient information regarding the proposed psychotropic medication, which shall include the following:</strong>
//               <ol>
//                 <li>The nature of your psychiatric condition.</li>
//                 <li>The reason for taking such medication, including the likelihood of your improving or not improving without such medication, and that your consent, once given, may be withdrawn at any time by your stating such intentions to your physician.</li>
//                 <li>The reasonable alternative treatments available, if any.</li>
//                 <li>The type, range of frequency, amount, and duration of taking the medications.</li>
//                 <li>The probable side effects of these medications known to commonly occur, risks, as well as expected benefits, and approximate time course to improvement.</li>
//                 <li>The possible additional side effects which may occur if you take such medication beyond three months. (specifically, neuroleptics/antipsychotics). You should have been advised that such side effects may include persistent involuntary movement of the face, mouth or might at times include similar movement of the hands and feet, and that these symptoms known as tardive dyskinesia are potentially irreversible and may appear after medications have been discontinued.</li>
//               </ol>
//               <strong>It is important to not abruptly stop any medication without first discussing it with your physician. You must understand that combining alcohol and/or illicit drugs with medications is potentially dangerous and not advised by your physician.</strong>
//               <strong>The original and/or subsequent class(es) of medication(s) discussed, and recommended by your provider is/are:</strong>
//               <ul>
//                 <li>Antipsychotics/Neuroleptics</li>
//                 <li>Antidepressant</li>
//                 <li>MAO Inhibitors Antidepressants</li>
//                 <li>Anxiolytics/Sedatives</li>
//                 <li>Benzodiazepines/Hypnotics</li>
//                 <li>Stimulants</li>
//                 <li>Mood Stabilizers/Antiepileptic</li>
//                 <li>Antiparkinson agents</li>
//                 <li>Lithium</li>
//                 <li>Other:</li>
//               </ul>
//               <strong>The general side effect profile(s) of the above medication(s) have been reviewed with me and could include some specifically from the list below:</strong>
//               <ul>
//                 <li>Insomnia</li>
//                 <li>Diarrhea/Constipation</li>
//                 <li>Motor changes/EPS</li>
//                 <li>Headaches</li>
//                 <li>Weight gain/loss</li>
//                 <li>Glaucoma</li>
//                 <li>Sedation/Stimulation</li>
//                 <li>Cardiac conduction changes</li>
//                 <li>Stroke</li>
//                 <li>Drowsiness</li>
//                 <li>Confusion</li>
//                 <li>Nausea/Vomiting</li>
//                 <li>Changes in blood pressure</li>
//                 <li>Dry mouth</li>
//                 <li>Dizziness</li>
//                 <li>Elevated cholesterol/triglycerides</li>
//                 <li>Liver inflammation</li>
//                 <li>Seizures</li>
//                 <li>Hypothyroidism</li>
//                 <li>Renal impairment</li>
//                 <li>Diabetes/elevated glucose</li>
//                 <li>Hyponatremia</li>
//                 <li>Congenital abnormalities to fetus</li>
//               </ul>
//               <strong>Your signature below constitutes your acknowledgement:</strong>
//               <ul>
//                 <li>That you have read and agree to the forgoing.</li>
//                 <li>That the medications and treatment set forth above have been adequately explained and/or discussed with you by your physician, and that you have received all the information you desire concerning such medication and treatment.</li>
//                 <li>That if you encounter side effects or difficulties with this/these medication(s) you will contact your physician or your pharmacist.</li>
//                 <li>That if you have a reason to believe you have become pregnant (if applicable) while on medication, you will contact your physician immediately.</li>
//                 <li>That you authorize and consent to the administration of such medication and treatment.</li>
//               </ul>
//             `,
//                 },
//                 {
//                     type: "text",
//                     name: "patient_signature",
//                     title: "Signature",
//                 },
//                 {
//                     type: "text",
//                     name: "signature_date",
//                     title: "Date",
//                 },
//                 {
//                     type: "text",
//                     name: "patient_full_name",
//                     title: "Printed Full Name of Patient",
//                 },
//             ],
//         },
//         {
//             name: "patient_health_questionnaire",
//             title: "Patient Health Questionnaire-9 (PHQ-9)",
//             elements: [
//                 {
//                     type: "matrix",
//                     name: "phq9_questions",
//                     title: "Over the last 2 weeks, how often have you been bothered by any of the following problems? (Use “✔” to indicate your answer)",
//                     columns: [
//                         { value: "not_at_all", text: "Not at all" },
//                         { value: "several_days", text: "Several days" },
//                         {
//                             value: "more_than_half",
//                             text: "More than half the days",
//                         },
//                         {
//                             value: "nearly_every_day",
//                             text: "Nearly every day",
//                         },
//                     ],
//                     rows: [
//                         {
//                             value: "little_interest",
//                             text: "Little interest or pleasure in doing things",
//                         },
//                         {
//                             value: "feeling_down",
//                             text: "Feeling down, depressed, or hopeless",
//                         },
//                         {
//                             value: "trouble_sleeping",
//                             text: "Trouble falling or staying asleep, or sleeping too much",
//                         },
//                         {
//                             value: "feeling_tired",
//                             text: "Feeling tired or having little energy",
//                         },
//                         {
//                             value: "poor_appetite",
//                             text: "Poor appetite or overeating",
//                         },
//                         {
//                             value: "feeling_bad_about_self",
//                             text: "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
//                         },
//                         {
//                             value: "trouble_concentrating",
//                             text: "Trouble concentrating on things, such as reading the newspaper or watching television",
//                         },
//                         {
//                             value: "slow_movement",
//                             text: "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
//                         },
//                         {
//                             value: "thoughts_of_self_harm",
//                             text: "Thoughts that you would be better off dead or of hurting yourself in some way",
//                         },
//                     ],
//                 },
//                 {
//                     type: "radiogroup",
//                     name: "difficulty_problems",
//                     title: "If you checked off any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?",
//                     choices: [
//                         "Not difficult at all",
//                         "Somewhat difficult",
//                         "Very difficult",
//                         "Extremely difficult",
//                     ],
//                 },
//                 {
//                     type: "text",
//                     name: "phq9_total_score",
//                     title: "Total Score",
//                 },
//             ],
//         },
//         {
//             name: "drug_screening_questionnaire",
//             title: "Drug Screening Questionnaire (DAST)",
//             elements: [
//                 {
//                     type: "checkbox",
//                     name: "recreational_drugs_used",
//                     title: "Which recreational drugs have you used in the past year? (Check all that apply)",
//                     choices: [
//                         "Methamphetamines (speed, crystal)",
//                         "Cocaine",
//                         "Cannabis (marijuana, pot)",
//                         "Narcotics (heroin, oxycodone, methadone, etc.)",
//                         "Inhalants (paint thinner, aerosol, glue)",
//                         "Hallucinogens (LSD, mushrooms)",
//                         "Tranquilizers (valium)",
//                         "Other",
//                     ],
//                 },
//                 {
//                     type: "radiogroup",
//                     name: "frequency_drug_use",
//                     title: "How often have you used these drugs?",
//                     choices: [
//                         "Monthly or less",
//                         "Weekly",
//                         "Daily or almost daily",
//                     ],
//                 },
//                 {
//                     type: "radiogroup",
//                     name: "dast_questions",
//                     title: "DAST Questions",
//                     choices: ["No", "Yes"],
//                     rows: [
//                         "Have you used drugs other than those required for medical reasons?",
//                         "Do you abuse (use) more than one drug at a time?",
//                         "Are you unable to stop using drugs when you want to?",
//                         "Have you ever had blackouts or flashbacks as a result of drug use?",
//                         "Do you ever feel bad or guilty about your drug use?",
//                         "Does your spouse (or parents) ever complain about your involvement with drugs?",
//                         "Have you neglected your family because of your use of drugs?",
//                         "Have you engaged in illegal activities in order to obtain drugs?",
//                         "Have you ever experienced withdrawal symptoms (felt sick) when you stopped taking drugs?",
//                         "Have you had medical problems as a result of your drug use (e.g. memory loss, hepatitis, convulsions, bleeding)?",
//                     ],
//                 },
//                 {
//                     type: "radiogroup",
//                     name: "inject_drugs",
//                     title: "Do you inject drugs?",
//                     choices: ["No", "Yes"],
//                 },
//                 {
//                     type: "radiogroup",
//                     name: "drug_treatment",
//                     title: "Have you ever been in treatment for a drug problem?",
//                     choices: ["No", "Yes"],
//                 },
//                 {
//                     type: "text",
//                     name: "dast_score",
//                     title: "Total Score",
//                 },
//                 {
//                     type: "html",
//                     name: "dast_explanation",
//                     title: "Explanation of DAST Score",
//                     isCollapsed: true,
//                     html: `
//               <h3>Explanation of DAST Score:</h3>
//               <ul>
//                 <li>0: Low Risk</li>
//                 <li>1-2: Risky</li>
//                 <li>3-5: Harmful</li>
//                 <li>6-10: Severe</li>
//               </ul>
//             `,
//                 },
//             ],
//         },
//         {
//             name: "consent_release_information",
//             title: "Consent for the Release of Information under 42 C.F.R. PART 2",
//             elements: [
//                 {
//                     type: "text",
//                     name: "patient_authorization",
//                     title: "I, (Name of patient), authorize (Name of provider)",
//                 },
//                 {
//                     type: "checkbox",
//                     name: "release_information",
//                     title: "I authorize the release or disclosure of the substance use disorder records below:",
//                     choices: [
//                         "All my substance use disorder records",
//                         "Attendance",
//                         "Toxicology Results",
//                         "Medication(s)/dosing",
//                         "Assessments",
//                         "Progress in Treatment",
//                         "Treatment plan",
//                         "Lab results",
//                         "Appointments",
//                         "Diagnostic information",
//                         "Insurance info/demographics",
//                         "Discharge Summary",
//                         "Substance Use History",
//                         "Trauma History Summary",
//                         "Other",
//                     ],
//                 },
//                 {
//                     type: "text",
//                     name: "release_to_person",
//                     title: "To: (Name of person or organization to which disclosure is to be made)",
//                 },
//                 {
//                     type: "text",
//                     name: "release_to_phone",
//                     title: "Phone",
//                 },
//                 {
//                     type: "text",
//                     name: "release_to_fax",
//                     title: "Fax",
//                 },
//                 {
//                     type: "checkbox",
//                     name: "purpose_of_disclosure",
//                     title: "For (purpose of disclosure):",
//                     choices: [
//                         "Continuity of Care",
//                         "Coordinating Treatment",
//                         "Payment/benefits administration",
//                         "Other",
//                     ],
//                 },
//                 {
//                     type: "text",
//                     name: "specific_date_event",
//                     title: "If not previously revoked, this consent will terminate either in one year from the date of signature OR 90 days after discharge (whichever comes first); OR upon a specific date, event, or condition as listed here:",
//                 },
//                 {
//                     type: "text",
//                     name: "patient_signature",
//                     title: "Patient’s Signature",
//                 },
//                 {
//                     type: "text",
//                     name: "patient_signature_date",
//                     title: "Date",
//                 },
//                 {
//                     type: "text",
//                     name: "patient_name",
//                     title: "Print Name",
//                 },
//                 {
//                     type: "text",
//                     name: "patient_dob",
//                     title: "Date of Birth (MM/DD/YY)",
//                 },
//                 {
//                     type: "text",
//                     name: "representative_signature",
//                     title: "Signature of Personal Representative",
//                 },
//                 {
//                     type: "text",
//                     name: "representative_name",
//                     title: "Print",
//                 },
//                 {
//                     type: "text",
//                     name: "representative_date",
//                     title: "Date",
//                 },
//                 {
//                     type: "text",
//                     name: "legal_authority",
//                     title: "Legal Authority",
//                 },
//             ],
//         },
//         {
//             name: "ptsd_checklist_civilian",
//             title: "PTSD Checklist - Civilian Version (PCL-C)",
//             elements: [
//                 {
//                     type: "text",
//                     name: "client_name",
//                     title: "Client's Name",
//                 },
//                 {
//                     type: "matrix",
//                     name: "ptsd_questions",
//                     title: "Instruction to patient: Below is a list of problems and complaints that veterans sometimes have in response to stressful life experiences. Please read each one carefully, put an “X” in the box to indicate how much you have been bothered by that problem in the last month.",
//                     columns: [
//                         { value: "not_at_all", text: "Not at all (1)" },
//                         { value: "a_little_bit", text: "A little bit (2)" },
//                         { value: "moderately", text: "Moderately (3)" },
//                         { value: "quite_a_bit", text: "Quite a bit (4)" },
//                         { value: "extremely", text: "Extremely (5)" },
//                     ],
//                     rows: [
//                         {
//                             value: "repeated_memories",
//                             text: "Repeated, disturbing memories, thoughts, or images of a stressful experience from the past?",
//                         },
//                         {
//                             value: "repeated_dreams",
//                             text: "Repeated, disturbing dreams of a stressful experience from the past?",
//                         },
//                         {
//                             value: "suddenly_feeling",
//                             text: "Suddenly acting or feeling as if a stressful experience were happening again (as if you were reliving it)?",
//                         },
//                         {
//                             value: "very_upset",
//                             text: "Feeling very upset when something reminded you of a stressful experience from the past?",
//                         },
//                         {
//                             value: "physical_reactions",
//                             text: "Having physical reactions (e.g., heart pounding, trouble breathing, or sweating) when something reminded you of a stressful experience from the past?",
//                         },
//                         {
//                             value: "avoid_thinking",
//                             text: "Avoid thinking about or talking about a stressful experience from the past or avoid having feelings related to it?",
//                         },
//                         {
//                             value: "avoid_activities",
//                             text: "Avoid activities or situations because they remind you of a stressful experience from the past?",
//                         },
//                         {
//                             value: "trouble_remembering",
//                             text: "Trouble remembering important parts of a stressful experience from the past?",
//                         },
//                         {
//                             value: "loss_interest",
//                             text: "Loss of interest in things that you used to enjoy?",
//                         },
//                         {
//                             value: "feeling_distant",
//                             text: "Feeling distant or cut off from other people?",
//                         },
//                         {
//                             value: "feeling_numb",
//                             text: "Feeling emotionally numb or being unable to have loving feelings for those close to you?",
//                         },
//                         {
//                             value: "feeling_short_future",
//                             text: "Feeling as if your future will somehow be cut short?",
//                         },
//                         {
//                             value: "trouble_sleeping",
//                             text: "Trouble falling or staying asleep?",
//                         },
//                         {
//                             value: "feeling_irritable",
//                             text: "Feeling irritable or having angry outbursts?",
//                         },
//                         {
//                             value: "difficulty_concentrating",
//                             text: "Having difficulty concentrating?",
//                         },
//                         {
//                             value: "super_alert",
//                             text: "Being “super alert” or watchful on guard?",
//                         },
//                         {
//                             value: "feeling_jumpy",
//                             text: "Feeling jumpy or easily startled?",
//                         },
//                     ],
//                 },
//             ],
//         },
//         {
//             name: "cage_questionnaire",
//             title: "CAGE Questionnaire",
//             elements: [
//                 {
//                     type: "radiogroup",
//                     name: "cut_down",
//                     title: "Have you ever felt you should Cut down on your drinking?",
//                     choices: ["Yes", "No"],
//                 },
//                 {
//                     type: "radiogroup",
//                     name: "annoyed",
//                     title: "Have people Annoyed you by criticizing your drinking?",
//                     choices: ["Yes", "No"],
//                 },
//                 {
//                     type: "radiogroup",
//                     name: "guilty",
//                     title: "Have you ever felt bad or Guilty about your drinking?",
//                     choices: ["Yes", "No"],
//                 },
//                 {
//                     type: "radiogroup",
//                     name: "eye_opener",
//                     title: "Have you ever had a drink first thing in the morning to steady your nerves or to get rid of a hangover (Eye opener)?",
//                     choices: ["Yes", "No"],
//                 },
//                 {
//                     type: "html",
//                     name: "cage_explanation",
//                     title: "Scoring",
//                     isCollapsed: true,
//                     html: `
//               <h3>Scoring:</h3>
//               <strong>Item responses on the CAGE are scored 0 or 1, with a higher score an indication of alcohol problems. A total score of 2 or greater is considered clinically significant.</strong>
//             `,
//                 },
//             ],
//         },
//         {
//             name: "intake_packet_medical_history",
//             title: "Four Square Clinicals Intake Packet - Past Medical History",
//             elements: [
//                 {
//                     type: "checkbox",
//                     name: "medical_conditions",
//                     title: "Medical Conditions",
//                     choices: [
//                         "Circulation Problem",
//                         "Diabetes",
//                         "Heart Disease",
//                         "High Blood Pressure",
//                         "Palpitations",
//                         "Stroke",
//                         "Fibromyalgia",
//                         "Cancer",
//                         "Other",
//                     ],
//                 },
//                 {
//                     type: "checkbox",
//                     name: "neurovascular",
//                     title: "Neurovascular",
//                     choices: [
//                         "Aneurysm with clipping",
//                         "Shunts/Implants",
//                         "Hearing Loss",
//                         "Tinnitus (Ringing in the ears)",
//                         "Dizziness",
//                         "Fainting",
//                     ],
//                 },
//                 {
//                     type: "checkbox",
//                     name: "neurological_psychological",
//                     title: "Neurological/Psychological",
//                     choices: [
//                         "Addiction",
//                         "Anxiety",
//                         "Brain Fog",
//                         "Depression",
//                         "Insomnia",
//                         "Memory Problems",
//                         "Sleep Apnea",
//                         "Vertigo",
//                     ],
//                 },
//                 {
//                     type: "checkbox",
//                     name: "pain",
//                     title: "Pain",
//                     choices: [
//                         "Arthritis",
//                         "Ankle",
//                         "Chest",
//                         "Hip",
//                         "Knee",
//                         "Leg",
//                         "Lower Back",
//                         "Mid Back",
//                         "Neck",
//                         "Wrist/Hand",
//                     ],
//                 },
//                 {
//                     type: "text",
//                     name: "other_conditions",
//                     title: "Other medical conditions or concerns?",
//                 },
//             ],
//         },
//         {
//             name: "current_medications",
//             title: "Current Medications",
//             elements: [
//                 {
//                     type: "matrixdynamic",
//                     name: "medications",
//                     title: "Medication Name",
//                     columns: [
//                         {
//                             name: "medication_name",
//                             title: "Medication Name",
//                             cellType: "dropdown",
//                             choices: [
//                                 "Antipsychotics/Neuroleptics",
//                                 "Antidepressant",
//                                 "MAO Inhibitors Antidepressants",
//                                 "Anxiolytics/Sedatives",
//                                 "Benzodiazepines/Hypnotics",
//                                 "Stimulants",
//                                 "Mood Stabilizers/Antiepileptic",
//                                 "Antiparkinson agents",
//                                 "Lithium",
//                                 "Other",
//                             ],
//                         },
//                         {
//                             name: "dose",
//                             title: "Dose",
//                             cellType: "text",
//                         },
//                         {
//                             name: "frequency",
//                             title: "Frequency",
//                             cellType: "text",
//                         },
//                     ],
//                     rowCount: 5,
//                 },
//             ],
//         },
//         {
//             name: "current_allergies",
//             title: "Current Allergies",
//             elements: [
//                 {
//                     type: "matrixdynamic",
//                     name: "allergies",
//                     title: "Allergy Name",
//                     columns: [
//                         {
//                             name: "allergy_name",
//                             title: "Allergy Name",
//                             cellType: "text",
//                         },
//                         {
//                             name: "reaction",
//                             title: "Reaction",
//                             cellType: "text",
//                         },
//                     ],
//                     rowCount: 3,
//                 },
//                 {
//                     type: "checkbox",
//                     name: "no_current_medications",
//                     title: "",
//                     choices: ["No current medications"],
//                 },
//                 {
//                     type: "checkbox",
//                     name: "no_known_drug_allergies",
//                     title: "",
//                     choices: ["No Known Drug Allergies"],
//                 },
//             ],
//         },
//         {
//             name: "past_surgical_history",
//             title: "Past Surgical History",
//             elements: [
//                 {
//                     type: "checkbox",
//                     name: "no_surgical_history",
//                     title: "",
//                     choices: [
//                         "I have NEVER had any surgical procedures performed",
//                     ],
//                 },
//                 {
//                     type: "matrixdynamic",
//                     name: "surgical_procedures",
//                     title: "Please list any surgical procedures you have had done in the past including date:",
//                     columns: [
//                         {
//                             name: "procedure_name",
//                             title: "Procedure Name",
//                             cellType: "text",
//                         },
//                         {
//                             name: "procedure_date",
//                             title: "Date",
//                             cellType: "text",
//                         },
//                     ],
//                     rowCount: 3,
//                 },
//             ],
//         },
//         {
//             name: "family_history",
//             title: "Family History",
//             elements: [
//                 {
//                     type: "checkbox",
//                     name: "no_family_history",
//                     title: "",
//                     choices: ["No Family History"],
//                 },
//                 {
//                     type: "checkbox",
//                     name: "medical_conditions_family",
//                     title: "Medical Conditions",
//                     choices: [
//                         "Arthritis",
//                         "Osteoporosis",
//                         "Headaches/migraines",
//                         "Dementia",
//                         "Liver problems",
//                         "Diabetes",
//                         "Seizures",
//                         "Kidney Problems",
//                         "Cancer",
//                         "Mental Health Condition(s)",
//                         "Asthma",
//                         "High Cholesterol",
//                         "Other",
//                     ],
//                 },
//                 {
//                     type: "checkbox",
//                     name: "muscle_bone_family",
//                     title: "Muscle/Bone",
//                     choices: [
//                         "Fibromyalgia",
//                         "Rheumatoid Arthritis",
//                         "Bone Fractures",
//                     ],
//                 },
//                 {
//                     type: "checkbox",
//                     name: "vascular_family",
//                     title: "Vascular",
//                     choices: [
//                         "Heart Problems",
//                         "Stroke",
//                         "Circulation Problem",
//                         "Palpitations",
//                     ],
//                 },
//                 {
//                     type: "text",
//                     name: "other_conditions_family",
//                     title: "Other medical conditions or concerns?",
//                 },
//             ],
//         },
//         {
//             name: "insurance_information",
//             title: "Insurance Information",
//             elements: [
//                 {
//                     type: "text",
//                     name: "primary_insurance",
//                     title: "Primary Insurance",
//                 },
//                 {
//                     type: "text",
//                     name: "primary_subscriber_name",
//                     title: "Subscriber Name",
//                 },
//                 {
//                     type: "text",
//                     name: "primary_dob",
//                     title: "Subscriber DOB",
//                 },
//                 {
//                     type: "text",
//                     name: "primary_relationship",
//                     title: "Relationship to Subscriber",
//                 },
//                 {
//                     type: "text",
//                     name: "primary_policy_number",
//                     title: "Policy Number",
//                 },
//                 {
//                     type: "text",
//                     name: "primary_group_number",
//                     title: "Group Number",
//                 },
//                 {
//                     type: "text",
//                     name: "secondary_insurance",
//                     title: "Secondary Insurance",
//                 },
//                 {
//                     type: "text",
//                     name: "secondary_subscriber_name",
//                     title: "Subscriber Name",
//                 },
//                 {
//                     type: "text",
//                     name: "secondary_dob",
//                     title: "Subscriber DOB",
//                 },
//                 {
//                     type: "text",
//                     name: "secondary_relationship",
//                     title: "Relationship to Subscriber",
//                 },
//                 {
//                     type: "text",
//                     name: "secondary_policy_number",
//                     title: "Policy Number",
//                 },
//                 {
//                     type: "text",
//                     name: "secondary_group_number",
//                     title: "Group Number",
//                 },
//             ],
//         },
//         {
//             name: "acknowledgement_of_privacy",
//             title: "Acknowledgement of Receipt of Notice of Privacy Practices",
//             elements: [
//                 {
//                     type: "html",
//                     name: "privacy_acknowledgement_content",
//                     title: "Privacy Practices",
//                     isCollapsed: true,
//                     html: `
//               <strong>Patient Acknowledgement: I understand that as part of my healthcare, Four Square Clinicals originates and maintains health records describing my health history, symptoms, diagnosis, treatment, and any plans for future care or treatment. I understand that this information serves as:</strong>
//               <ul>
//                 <li>A basis for planning my care and treatment</li>
//                 <li>A means of communication among the health professionals who contribute to my care</li>
//                 <li>A source of information for applying my diagnosis and surgical information to my bill</li>
//                 <li>A means by which a third-party payer can verify that services billed were actually provided</li>
//                 <li>A tool for routine healthcare operations such as assessing quality and reviewing the competence of healthcare professionals</li>
//               </ul>
//               <strong>I have been provided with a Notice of Privacy Practices that provides a more complete description of information uses and disclosures. I understand that I have the following rights and privileges:</strong>
//               <ul>
//                 <li>The right to review the notice prior to signing this consent</li>
//                 <li>The right to object to the use of my health information for directory purposes</li>
//                 <li>The right to request restrictions as to how my health information may be used or disclosed to carry out treatment, payment, or healthcare operations</li>
//               </ul>
//               <strong>I understand that Four Square Clinicals is not required to agree to the restrictions requested. I understand that I may revoke this consent in writing, except to the extent that the organization has already taken action in reliance thereon. I also understand that by refusing to sign this consent or revoking this consent, this organization may refuse to treat me as permitted by Section 164.506 of the Code of Federal Regulations. I further understand that Four Square Clinicals reserves the right to change their notice and practices, and prior to implementation, in accordance with Section 164.520 of the Code of Federal Regulations. Should Four Square Clinicals change their notice, they will send a copy of any revised notice to the address I’ve provided (whether U.S. mail or, if I agree, email). I understand that as part of this organization’s treatment, payment, or healthcare operations, it may become necessary to disclose my protected health information to another entity, and I consent to such disclosure for these permitted uses, including disclosures via fax.</strong>
//               <strong>I fully understand and accept the terms of this consent.</strong>
//             `,
//                 },
//                 {
//                     type: "text",
//                     name: "patient_signature",
//                     title: "Signature of Patient or Legal Representative",
//                 },
//                 {
//                     type: "text",
//                     name: "patient_signature_date",
//                     title: "Date",
//                 },
//                 {
//                     type: "text",
//                     name: "relationship",
//                     title: "Relationship (if Legal Representative)",
//                 },
//             ],
//         },
//         {
//             name: "patient_rights_responsibilities",
//             title: "Patient Rights and Responsibilities",
//             elements: [
//                 {
//                     type: "html",
//                     name: "patient_rights_responsibilities_content",
//                     title: "Patient Rights and Responsibilities",
//                     isCollapsed: true,
//                     html: `
//               <h3>Patient Rights and Responsibilities</h3>
//               <strong>We at Four Square Clinicals recognize that you have certain rights and responsibilities as a patient receiving behavioral health services from us. We have provided the following information to help you understand what those rights and responsibilities are:</strong>
//               <h5>Patient Rights</h5>
//               <ul>
//                 <li>You have the right to be treated with dignity and respect.</li>
//                 <li>You have the right to be informed about your treatment and to participate in the planning of your care.</li>
//                 <li>You have the right to privacy and confidentiality regarding your care and treatment.</li>
//                 <li>You have the right to be informed of the fees and payment policies for services provided.</li>
//                 <li>You have the right to receive treatment that is free from discrimination.</li>
//               </ul>
//               <h5>Patient Responsibilities</h5>
//               <ul>
//                 <li>You are responsible for providing accurate and complete information about your health and medical history.</li>
//                 <li>You are responsible for following the treatment plan recommended by your healthcare provider.</li>
//                 <li>You are responsible for informing your healthcare provider if you do not understand your treatment plan or if you are unable to follow it.</li>
//                 <li>You are responsible for keeping your appointments and for notifying the office if you need to cancel or reschedule.</li>
//                 <li>You are responsible for paying for the services provided in accordance with the fees and payment policies.</li>
//               </ul>
//               <strong>By signing below, you acknowledge that you have read and understand your rights and responsibilities as a patient receiving services from Four Square Clinicals.</strong>
//             `,
//                 },
//                 {
//                     type: "text",
//                     name: "patient_signature",
//                     title: "Signature of Patient or Legal Representative",
//                 },
//                 {
//                     type: "text",
//                     name: "patient_signature_date",
//                     title: "Date",
//                 },
//                 {
//                     type: "text",
//                     name: "relationship",
//                     title: "Relationship (if Legal Representative)",
//                 },
//             ],
//         },
//         {
//             name: "limitations_of_confidentiality",
//             title: "Limits of Confidentiality",
//             elements: [
//                 {
//                     type: "html",
//                     name: "limitations_confidentiality_content",
//                     title: "Limits of Confidentiality",
//                     isCollapsed: true,
//                     html: `
//               <h3>Limits of Confidentiality</h3>
//               <strong>Information disclosed in therapy is generally confidential and is protected by state and federal laws. However, there are certain circumstances under which confidentiality may be limited:</strong>
//               <ul>
//                 <li>If there is reason to believe that a child, elderly person, or disabled person is being abused or neglected.</li>
//                 <li>If there is a risk of imminent harm to yourself or others.</li>
//                 <li>If you provide written consent to release your information.</li>
//                 <li>If records are subpoenaed by a court of law.</li>
//               </ul>
//               <strong>By signing below, you acknowledge that you have read and understand the limits of confidentiality as described above.</strong>
//             `,
//                 },
//                 {
//                     type: "text",
//                     name: "patient_signature",
//                     title: "Signature of Patient or Legal Representative",
//                 },
//                 {
//                     type: "text",
//                     name: "patient_signature_date",
//                     title: "Date",
//                 },
//                 {
//                     type: "text",
//                     name: "relationship",
//                     title: "Relationship (if Legal Representative)",
//                 },
//             ],
//         },
//         {
//             name: "policy_agreement",
//             title: "Policy Agreement",
//             elements: [
//                 {
//                     type: "html",
//                     name: "policy_agreement_content",
//                     title: "Policy Agreement",
//                     isCollapsed: true,
//                     html: `
//               <h3>Policy Agreement</h3>
//               <strong>Please read and sign below indicating your agreement to the following policies:</strong>
//               <ul>
//                 <li><strong>Appointments:</strong> It is your responsibility to attend scheduled appointments. If you need to cancel or reschedule, please do so at least 24 hours in advance.</li>
//                 <li><strong>Payment:</strong> Payment is due at the time of service unless other arrangements have been made. We accept cash, check, and credit cards.</li>
//                 <li><strong>Insurance:</strong> If you have insurance, we will file claims on your behalf. However, you are responsible for any co-pays, deductibles, or non-covered services.</li>
//                 <li><strong>Confidentiality:</strong> Your records are confidential and will not be released without your written consent, except as required by law.</li>
//               </ul>
//             `,
//                 },
//                 {
//                     type: "text",
//                     name: "patient_signature",
//                     title: "Signature of Patient or Legal Representative",
//                 },
//                 {
//                     type: "text",
//                     name: "patient_signature_date",
//                     title: "Date",
//                 },
//                 {
//                     type: "text",
//                     name: "relationship",
//                     title: "Relationship (if Legal Representative)",
//                 },
//             ],
//         },
//         {
//             name: "local_24_hour_access",
//             title: "Local 24-Hour Access Information",
//             elements: [
//                 {
//                     type: "html",
//                     name: "local_24_hour_access_content",
//                     title: "Local 24-Hour Access Information",
//                     isCollapsed: true,
//                     html: `
//               <h3>Local 24-Hour Access Information</h3>
//               <strong>For emergency assistance, please use the following resources:</strong>
//               <ul>
//                 <li><strong>Emergency Services:</strong> Dial 911</li>
//                 <li><strong>Local Crisis Hotline:</strong> [Insert Local Crisis Hotline Number]</li>
//                 <li><strong>Nearest Hospital:</strong> [Insert Nearest Hospital Name and Address]</li>
//                 <li><strong>Local Police Department:</strong> [Insert Local Police Department Name and Phone Number]</li>
//               </ul>
//               <strong>If you need to contact our office outside of regular business hours, please call [Insert After-Hours Contact Information].</strong>
//             `,
//                 },
//                 {
//                     type: "text",
//                     name: "patient_signature",
//                     title: "Signature of Patient or Legal Representative",
//                 },
//                 {
//                     type: "text",
//                     name: "patient_signature_date",
//                     title: "Date",
//                 },
//                 {
//                     type: "text",
//                     name: "relationship",
//                     title: "Relationship (if Legal Representative)",
//                 },
//             ],
//         },
//     ],
// };

export const fsclinicalsForm = {
    title: "Four Square Clinicals Forms",
    description:
        "Your privacy is important to us. All information is subject to our Patient Privacy Policy.",
    width: 1024,
    height: 1024,
    completedHtml:
        '<div style="max-width:540px;text-align:left;margin:0 auto;padding:40px 48px;background-color:#fff;border:1px solid rgba(0,0,0,0.25);"><h3>Thank you for completing your patient registration form.</h3><strong>Dear {first_name},<br><br>Your information has been successfully received. We look forward to providing you with the highest level of care.<br><br>If you have any questions or need to schedule an appointment, please contact our office.<br><br>Warm regards,<br>Four Square Clinicals</strong></div>',
    pages: [
        //     {
        //         name: "patient_information",
        //         title: "Patient Information",
        //         elements: [
        //             {
        //                 type: "panel",
        //                 name: "basic_info",
        //                 title: "Basic Information",
        //                 elements: [
        //                     {
        //                         type: "text",
        //                         name: "last_name",
        //                         title: "Last Name",
        //                         width: "50%",
        //                         minWidth: "256px",
        //                         //isRequired: true,
        //                     },
        //                     {
        //                         type: "text",
        //                         name: "first_name",
        //                         title: "First Name",
        //                         width: "50%",
        //                         minWidth: "256px",
        //                         //isRequired: true,
        //                         startWithNewLine: false,
        //                     },
        //                     {
        //                         type: "text",
        //                         name: "middle_initial",
        //                         title: "MI",
        //                         width: "50%",
        //                         minWidth: "256px",
        //                     },
        //                     {
        //                         type: "text",
        //                         name: "dob",
        //                         title: "DOB",
        //                         inputType: "date",
        //                         width: "50%",
        //                         minWidth: "256px",
        //                         startWithNewLine: false,
        //                         //isRequired: true,
        //                     },
        //                     {
        //                         type: "text",
        //                         name: "address",
        //                         title: "Address",
        //                         width: "100%",
        //                         minWidth: "256px",
        //                     },
        //                     {
        //                         type: "text",
        //                         name: "city",
        //                         title: "City",
        //                         width: "33%",
        //                         minWidth: "128px",
        //                     },
        //                     {
        //                         type: "dropdown",
        //                         name: "state",
        //                         title: "State",
        //                         choices: [
        //                             "Alabama",
        //                             "Alaska",
        //                             "Arizona",
        //                             "Arkansas",
        //                             "California",
        //                             "Colorado",
        //                             "Connecticut",
        //                             "Delaware",
        //                             "Florida",
        //                             "Georgia",
        //                             "Hawaii",
        //                             "Idaho",
        //                             "Illinois",
        //                             "Indiana",
        //                             "Iowa",
        //                             "Kansas",
        //                             "Kentucky",
        //                             "Louisiana",
        //                             "Maine",
        //                             "Maryland",
        //                             "Massachusetts",
        //                             "Michigan",
        //                             "Minnesota",
        //                             "Mississippi",
        //                             "Missouri",
        //                             "Montana",
        //                             "Nebraska",
        //                             "Nevada",
        //                             "New Hampshire",
        //                             "New Jersey",
        //                             "New Mexico",
        //                             "New York",
        //                             "North Carolina",
        //                             "North Dakota",
        //                             "Ohio",
        //                             "Oklahoma",
        //                             "Oregon",
        //                             "Pennsylvania",
        //                             "Rhode Island",
        //                             "South Carolina",
        //                             "South Dakota",
        //                             "Tennessee",
        //                             "Texas",
        //                             "Utah",
        //                             "Vermont",
        //                             "Virginia",
        //                             "Washington",
        //                             "West Virginia",
        //                             "Wisconsin",
        //                             "Wyoming",
        //                             "District of Columbia",
        //                         ],
        //                         width: "33%",
        //                         minWidth: "128px",
        //                         startWithNewLine: false,
        //                     },
        //                     {
        //                         type: "text",
        //                         name: "zip",
        //                         inputType: "number",
        //                         title: "Zip Code",
        //                         width: "34%",
        //                         minWidth: "128px",
        //                         startWithNewLine: false,
        //                     },
        //                     {
        //                         type: "text",
        //                         name: "telephone",
        //                         title: "Telephone",
        //                         inputType: "tel",
        //                         width: "50%",
        //                         minWidth: "256px",
        //                     },
        //                     {
        //                         type: "text",
        //                         name: "email",
        //                         title: "Email",
        //                         inputType: "email",
        //                         width: "50%",
        //                         minWidth: "256px",
        //                         startWithNewLine: false,
        //                     },
        //                 ],
        //             },
        //         ],
        //     },
        //     {
        //         name: "authorization_release",
        //         title: "Authorization for Use or Disclosure of Behavioral Health Record",
        //         elements: [
        //             {
        //                 type: "panel",
        //                 name: "release_information",
        //                 title: "Release Information",
        //                 elements: [
        //                     {
        //                         type: "text",
        //                         name: "release_from",
        //                         title: "Release From: Person/Entity",
        //                         width: "50%",
        //                         minWidth: "256px",
        //                     },
        //                     {
        //                         type: "text",
        //                         name: "release_from_address",
        //                         title: "Address",
        //                         width: "50%",
        //                         minWidth: "256px",
        //                         startWithNewLine: false,
        //                     },
        //                     {
        //                         type: "text",
        //                         name: "release_from_city",
        //                         title: "City/State/Zip",
        //                         width: "50%",
        //                         minWidth: "256px",
        //                     },
        //                     {
        //                         type: "text",
        //                         name: "release_from_phone",
        //                         title: "Phone",
        //                         inputType: "tel",
        //                         width: "50%",
        //                         minWidth: "256px",
        //                         startWithNewLine: false,
        //                     },
        //                     {
        //                         type: "text",
        //                         name: "release_from_fax",
        //                         title: "Fax",
        //                         inputType: "tel",
        //                         width: "50%",
        //                         minWidth: "256px",
        //                     },
        //                     {
        //                         type: "text",
        //                         name: "release_to",
        //                         title: "Release To: Person/Entity",
        //                         width: "50%",
        //                         minWidth: "256px",
        //                     },
        //                     {
        //                         type: "text",
        //                         name: "release_to_address",
        //                         title: "Address",
        //                         width: "50%",
        //                         minWidth: "256px",
        //                         startWithNewLine: false,
        //                     },
        //                     {
        //                         type: "text",
        //                         name: "release_to_city",
        //                         title: "City/State/Zip",
        //                         width: "50%",
        //                         minWidth: "256px",
        //                     },
        //                     {
        //                         type: "text",
        //                         name: "release_to_phone",
        //                         title: "Phone",
        //                         inputType: "tel",
        //                         width: "50%",
        //                         minWidth: "256px",
        //                         startWithNewLine: false,
        //                     },
        //                     {
        //                         type: "text",
        //                         name: "release_to_fax",
        //                         title: "Fax",
        //                         inputType: "tel",
        //                         width: "50%",
        //                         minWidth: "256px",
        //                     },
        //                     {
        //                         type: "checkbox",
        //                         name: "release_purpose",
        //                         title: "Purpose",
        //                         choices: [
        //                             "Continuing Treatment",
        //                             "Legal",
        //                             "Insurance",
        //                             "Personal Use",
        //                             "Other",
        //                         ],
        //                         colCount: 1,
        //                     },
        //                 ],
        //             },
        //             {
        //                 type: "panel",
        //                 name: "information_to_release",
        //                 title: "Information to Release",
        //                 elements: [
        //                     {
        //                         type: "text",
        //                         name: "date_range_from",
        //                         title: "Date Range of Records Requested: From",
        //                         width: "50%",
        //                         minWidth: "256px",
        //                     },
        //                     {
        //                         type: "text",
        //                         name: "date_range_to",
        //                         title: "To",
        //                         width: "50%",
        //                         minWidth: "256px",
        //                         startWithNewLine: false,
        //                     },
        //                     {
        //                         type: "checkbox",
        //                         name: "information_requested",
        //                         title: "Please initial next to each type of information requested",
        //                         choices: [
        //                             "Summary Letter",
        //                             "Attendance Record",
        //                             "Medications List",
        //                             "Contact Log",
        //                             "Initial Evaluation",
        //                             "Treatment Plan",
        //                             "Progress Notes",
        //                             "Psychotherapy Notes",
        //                             "Self-Care Management Plan",
        //                             "Results of Diagnostic Testing",
        //                             "Other",
        //                         ],
        //                         colCount: 1,
        //                     },
        //                     {
        //                         type: "radiogroup",
        //                         name: "family_counseling_release",
        //                         title: "Joint/Family Counseling: Information disclosed may include notes/records from joint/family counseling sessions, if any. Initial one of the following statements:",
        //                         choices: [
        //                             "I do authorize release of information from joint/family counseling sessions",
        //                             "I do not authorize release of information from joint/family counseling sessions",
        //                         ],
        //                     },
        //                     {
        //                         type: "text",
        //                         name: "sensitive_information_acknowledgement",
        //                         title: "Sensitive Information: My initials demonstrate my acknowledgement and authorization to release or disclose this type of information:",
        //                         width: "100%",
        //                         minWidth: "256px",
        //                     },
        //                     {
        //                         type: "radiogroup",
        //                         name: "delivery_instructions",
        //                         title: "Delivery Instructions",
        //                         choices: [
        //                             "Mail",
        //                             "Fax records directly to person/entity specified above",
        //                             "Call patient when records are ready for pick up",
        //                             "Patient/Representative authorizes to pick up the copies",
        //                             "Other instructions",
        //                         ],
        //                     },
        //                     {
        //                         type: "text",
        //                         name: "expiration",
        //                         title: "Expiration: Without my written revocation, this authorization will automatically expire upon satisfaction of the need for disclosure, or one year from the date signed, unless otherwise specified:",
        //                         width: "100%",
        //                         minWidth: "256px",
        //                     },
        //                 ],
        //             },
        //             {
        //                 type: "html",
        //                 name: "notice_of_rights",
        //                 html: "<h3>Notice of Rights:</h3><ul><li>If I refuse to sign this authorization, my refusal will not affect my ability to obtain treatment.</li><li>I may inspect or obtain a copy of the health information requested in this authorization.</li><li>I may revoke this authorization at any time in writing, signed by me or on my behalf, and delivered to Four Square Clinicals, Medical Records, 100 N Arlington Ave, Suite 340A, Reno, NV 89501.</li><li>If I revoke this authorization, the revocation will not have any effect on any actions taken prior to Four Square Clinicals’ receipt of the revocation.</li><li>I have a right to receive a copy of this authorization.</li><li>Information disclosed pursuant to this authorization could be re-disclosed by the recipient and may no longer be protected by the federal privacy rule (HIPAA). However, Nevada law prohibits the person receiving my health information from making further disclosure of it unless another authorization for such disclosure is obtained from me or unless such disclosure is specifically required or permitted by law.</li></ul>",
        //                 width: "100%",
        //                 minWidth: "256px",
        //             },
        //             {
        //                 type: "text",
        //                 name: "patient_signature",
        //                 title: "Signature of Patient or Legal Representative",
        //                 width: "50%",
        //                 minWidth: "256px",
        //             },
        //             {
        //                 type: "text",
        //                 name: "patient_signature_date",
        //                 title: "Date",
        //                 width: "50%",
        //                 minWidth: "256px",
        //                 startWithNewLine: false,
        //             },
        //             {
        //                 type: "text",
        //                 name: "relationship",
        //                 title: "Relationship (if Legal Representative)",
        //                 width: "50%",
        //                 minWidth: "256px",
        //             },
        //             {
        //                 type: "text",
        //                 name: "provider_signature",
        //                 title: "Signature of Provider",
        //                 width: "50%",
        //                 minWidth: "256px",
        //                 startWithNewLine: false,
        //             },
        //             {
        //                 type: "text",
        //                 name: "provider_signature_date",
        //                 title: "Date",
        //                 width: "50%",
        //                 minWidth: "256px",
        //             },
        //         ],
        //     },
        //     {
        //         name: "nichq_vanderbilt_assessment_scale_parent",
        //         title: "NICHQ Vanderbilt Assessment Scale—PARENT Informant",
        //         elements: [
        //             {
        //                 type: "text",
        //                 name: "date",
        //                 title: "Today's Date",
        //                 width: "50%",
        //                 minWidth: "256px",
        //             },
        //             {
        //                 type: "text",
        //                 name: "child_name",
        //                 title: "Child's Name",
        //                 width: "50%",
        //                 minWidth: "256px",
        //                 startWithNewLine: false,
        //             },
        //             {
        //                 type: "text",
        //                 name: "child_dob",
        //                 title: "Date of Birth",
        //                 inputType: "date",
        //                 width: "50%",
        //                 minWidth: "256px",
        //             },
        //             {
        //                 type: "text",
        //                 name: "parent_name",
        //                 title: "Parent's Name",
        //                 width: "50%",
        //                 minWidth: "256px",
        //                 startWithNewLine: false,
        //             },
        //             {
        //                 type: "text",
        //                 name: "parent_phone",
        //                 title: "Parent's Phone Number",
        //                 inputType: "tel",
        //                 width: "50%",
        //                 minWidth: "256px",
        //             },
        //             {
        //                 type: "radiogroup",
        //                 name: "evaluation_basis",
        //                 title: "Is this evaluation based on a time when the child was on medication?",
        //                 choices: [
        //                     "Was on medication",
        //                     "Was not on medication",
        //                     "Not sure",
        //                 ],
        //                 width: "50%",
        //                 minWidth: "256px",
        //                 startWithNewLine: false,
        //             },
        //             {
        //                 type: "matrix",
        //                 name: "symptoms",
        //                 title: "Symptoms",
        //                 columns: [
        //                     { value: "never", text: "Never" },
        //                     { value: "occasionally", text: "Occasionally" },
        //                     { value: "often", text: "Often" },
        //                     { value: "very_often", text: "Very Often" },
        //                 ],
        //                 rows: [
        //                     {
        //                         value: "attention_details",
        //                         text: "Does not pay attention to details or makes careless mistakes with, for example, homework",
        //                     },
        //                     {
        //                         value: "difficulty_attention",
        //                         text: "Has difficulty keeping attention to what needs to be done",
        //                     },
        //                     {
        //                         value: "does_not_listen",
        //                         text: "Does not seem to listen when spoken to directly",
        //                     },
        //                     {
        //                         value: "follow_directions",
        //                         text: "Does not follow through when given directions and fails to finish activities (not due to refusal or failure to understand)",
        //                     },
        //                     {
        //                         value: "organizing_tasks",
        //                         text: "Has difficulty organizing tasks and activities",
        //                     },
        //                     {
        //                         value: "avoids_tasks",
        //                         text: "Avoids, dislikes, or does not want to start tasks that require ongoing mental effort",
        //                     },
        //                     {
        //                         value: "loses_things",
        //                         text: "Loses things necessary for tasks or activities (toys, assignments, pencils, or books)",
        //                     },
        //                     {
        //                         value: "easily_distracted",
        //                         text: "Is easily distracted by noises or other stimuli",
        //                     },
        //                     {
        //                         value: "forgetful_daily",
        //                         text: "Is forgetful in daily activities",
        //                     },
        //                     {
        //                         value: "fidgets",
        //                         text: "Fidgets with hands or feet or squirms in seat",
        //                     },
        //                     {
        //                         value: "leaves_seat",
        //                         text: "Leaves seat when remaining seated is expected",
        //                     },
        //                     {
        //                         value: "runs_climbs",
        //                         text: "Runs about or climbs too much when remaining seated is expected",
        //                     },
        //                     {
        //                         value: "difficulty_playing",
        //                         text: "Has difficulty playing or beginning quiet play activities",
        //                     },
        //                     {
        //                         value: "on_the_go",
        //                         text: "Is “on the go” or often acts as if “driven by a motor”",
        //                     },
        //                     { value: "talks_too_much", text: "Talks too much" },
        //                     {
        //                         value: "blurts_out",
        //                         text: "Blurts out answers before questions have been completed",
        //                     },
        //                     {
        //                         value: "difficulty_waiting",
        //                         text: "Has difficulty waiting his or her turn",
        //                     },
        //                     {
        //                         value: "interrupts_intrudes",
        //                         text: "Interrupts or intrudes in on others’ conversations and/or activities",
        //                     },
        //                     { value: "argues_adults", text: "Argues with adults" },
        //                     { value: "loses_temper", text: "Loses temper" },
        //                     {
        //                         value: "defies_refuses",
        //                         text: "Actively defies or refuses to go along with adults’ requests or rules",
        //                     },
        //                     {
        //                         value: "deliberately_annoys",
        //                         text: "Deliberately annoys people",
        //                     },
        //                     {
        //                         value: "blames_others",
        //                         text: "Blames others for his or her mistakes or misbehaviors",
        //                     },
        //                     {
        //                         value: "touchy_easily_annoyed",
        //                         text: "Is touchy or easily annoyed by others",
        //                     },
        //                     {
        //                         value: "angry_resentful",
        //                         text: "Is angry or resentful",
        //                     },
        //                     {
        //                         value: "spiteful_get_even",
        //                         text: "Is spiteful and wants to get even",
        //                     },
        //                     {
        //                         value: "bullies_threatens",
        //                         text: "Bullies, threatens, or intimidates others",
        //                     },
        //                     {
        //                         value: "starts_fights",
        //                         text: "Starts physical fights",
        //                     },
        //                     {
        //                         value: "lies_to_get_out",
        //                         text: "Lies to get out of trouble or to avoid obligations (ie, “cons” others)",
        //                     },
        //                     {
        //                         value: "truant_school",
        //                         text: "Is truant from school (skips school) without permission",
        //                     },
        //                     {
        //                         value: "physically_cruel_people",
        //                         text: "Is physically cruel to people",
        //                     },
        //                     {
        //                         value: "stolen_things_value",
        //                         text: "Has stolen things that have value",
        //                     },
        //                     {
        //                         value: "deliberately_destroys_property",
        //                         text: "Deliberately destroys others’ property",
        //                     },
        //                     {
        //                         value: "used_weapon",
        //                         text: "Has used a weapon that can cause serious harm (bat, knife, brick, gun)",
        //                     },
        //                     {
        //                         value: "physically_cruel_animals",
        //                         text: "Is physically cruel to animals",
        //                     },
        //                     {
        //                         value: "set_fires",
        //                         text: "Has deliberately set fires to cause damage",
        //                     },
        //                     {
        //                         value: "broken_into",
        //                         text: "Has broken into someone else’s home, business, or car",
        //                     },
        //                     {
        //                         value: "stayed_out_night",
        //                         text: "Has stayed out at night without permission",
        //                     },
        //                     {
        //                         value: "run_away",
        //                         text: "Has run away from home overnight",
        //                     },
        //                     {
        //                         value: "forced_sexual_activity",
        //                         text: "Has forced someone into sexual activity",
        //                     },
        //                     {
        //                         value: "fearful_anxious",
        //                         text: "Is fearful, anxious, or worried",
        //                     },
        //                     {
        //                         value: "afraid_try_new_things",
        //                         text: "Is afraid to try new things for fear of making mistakes",
        //                     },
        //                     {
        //                         value: "feels_worthless_inferior",
        //                         text: "Feels worthless or inferior",
        //                     },
        //                     {
        //                         value: "blames_self",
        //                         text: "Blames self for problems, feels guilty",
        //                     },
        //                     {
        //                         value: "feels_lonely",
        //                         text: "Feels lonely, unwanted, or unloved; complains that “no one loves him or her”",
        //                     },
        //                     {
        //                         value: "sad_unhappy",
        //                         text: "Is sad, unhappy, or depressed",
        //                     },
        //                     {
        //                         value: "self_conscious",
        //                         text: "Is self-conscious or easily embarrassed",
        //                     },
        //                 ],
        //             },
        //             {
        //                 type: "matrix",
        //                 name: "performance",
        //                 title: "Performance",
        //                 columns: [
        //                     { value: "excellent", text: "Excellent" },
        //                     {
        //                         value: "above_average",
        //                         text: "Somewhat Above Average",
        //                     },
        //                     { value: "average", text: "Average" },
        //                     { value: "problem", text: "Problem" },
        //                     { value: "problematic", text: "Problematic" },
        //                 ],
        //                 rows: [
        //                     {
        //                         value: "overall_school_performance",
        //                         text: "Overall school performance",
        //                     },
        //                     { value: "reading", text: "Reading" },
        //                     { value: "writing", text: "Writing" },
        //                     { value: "mathematics", text: "Mathematics" },
        //                     {
        //                         value: "relationship_with_parents",
        //                         text: "Relationship with parents",
        //                     },
        //                     {
        //                         value: "relationship_with_siblings",
        //                         text: "Relationship with siblings",
        //                     },
        //                     {
        //                         value: "relationship_with_peers",
        //                         text: "Relationship with peers",
        //                     },
        //                     {
        //                         value: "participation_organized_activities",
        //                         text: "Participation in organized activities (eg, teams)",
        //                     },
        //                 ],
        //             },
        //             {
        //                 type: "comment",
        //                 name: "parent_comments",
        //                 title: "Comments",
        //                 width: "100%",
        //                 minWidth: "256px",
        //             },
        //         ],
        //     },
        //     {
        //         name: "nichq_vanderbilt_assessment_scale_teacher",
        //         title: "NICHQ Vanderbilt Assessment Scale—TEACHER Informant",
        //         elements: [
        //             {
        //                 type: "text",
        //                 name: "teacher_name",
        //                 title: "Teacher's Name",
        //                 width: "50%",
        //                 minWidth: "256px",
        //             },
        //             {
        //                 type: "text",
        //                 name: "class_time",
        //                 title: "Class Time",
        //                 width: "50%",
        //                 minWidth: "256px",
        //                 startWithNewLine: false,
        //             },
        //             {
        //                 type: "text",
        //                 name: "class_name_period",
        //                 title: "Class Name/Period",
        //                 width: "50%",
        //                 minWidth: "256px",
        //             },
        //             {
        //                 type: "text",
        //                 name: "date",
        //                 title: "Today's Date",
        //                 inputType: "date",
        //                 width: "50%",
        //                 minWidth: "256px",
        //                 startWithNewLine: false,
        //             },
        //             {
        //                 type: "text",
        //                 name: "child_name",
        //                 title: "Child's Name",
        //                 width: "50%",
        //                 minWidth: "256px",
        //             },
        //             {
        //                 type: "text",
        //                 name: "grade_level",
        //                 title: "Grade Level",
        //                 width: "50%",
        //                 minWidth: "256px",
        //                 startWithNewLine: false,
        //             },
        //             {
        //                 type: "text",
        //                 name: "evaluation_period",
        //                 title: "Please indicate the number of weeks or months you have been able to evaluate the behaviors",
        //                 width: "50%",
        //                 minWidth: "256px",
        //             },
        //             {
        //                 type: "radiogroup",
        //                 name: "evaluation_basis",
        //                 title: "Is this evaluation based on a time when the child was on medication?",
        //                 choices: [
        //                     "Was on medication",
        //                     "Was not on medication",
        //                     "Not sure",
        //                 ],
        //                 width: "50%",
        //                 minWidth: "256px",
        //                 startWithNewLine: false,
        //             },
        //             {
        //                 type: "matrix",
        //                 name: "symptoms",
        //                 title: "Symptoms",
        //                 columns: [
        //                     { value: "never", text: "Never" },
        //                     { value: "occasionally", text: "Occasionally" },
        //                     { value: "often", text: "Often" },
        //                     { value: "very_often", text: "Very Often" },
        //                 ],
        //                 rows: [
        //                     {
        //                         value: "attention_details",
        //                         text: "Fails to give attention to details or makes careless mistakes in schoolwork",
        //                     },
        //                     {
        //                         value: "difficulty_attention",
        //                         text: "Has difficulty sustaining attention to tasks or activities",
        //                     },
        //                     {
        //                         value: "does_not_listen",
        //                         text: "Does not seem to listen when spoken to directly",
        //                     },
        //                     {
        //                         value: "follow_directions",
        //                         text: "Does not follow through on instructions and fails to finish schoolwork (not due to oppositional behavior or failure to understand)",
        //                     },
        //                     {
        //                         value: "organizing_tasks",
        //                         text: "Has difficulty organizing tasks and activities",
        //                     },
        //                     {
        //                         value: "avoids_tasks",
        //                         text: "Avoids, dislikes, or is reluctant to engage in tasks that require sustained mental effort",
        //                     },
        //                     {
        //                         value: "loses_things",
        //                         text: "Loses things necessary for tasks or activities (school assignments, pencils, or books)",
        //                     },
        //                     {
        //                         value: "easily_distracted",
        //                         text: "Is easily distracted by extraneous stimuli",
        //                     },
        //                     {
        //                         value: "forgetful_daily",
        //                         text: "Is forgetful in daily activities",
        //                     },
        //                     {
        //                         value: "fidgets",
        //                         text: "Fidgets with hands or feet or squirms in seat",
        //                     },
        //                     {
        //                         value: "leaves_seat",
        //                         text: "Leaves seat in classroom or in other situations in which remaining seated is expected",
        //                     },
        //                     {
        //                         value: "runs_climbs",
        //                         text: "Runs about or climbs excessively in situations in which remaining seated is expected",
        //                     },
        //                     {
        //                         value: "difficulty_playing",
        //                         text: "Has difficulty playing or engaging in leisure activities quietly",
        //                     },
        //                     {
        //                         value: "on_the_go",
        //                         text: "Is “on the go” or often acts as if “driven by a motor”",
        //                     },
        //                     { value: "talks_too_much", text: "Talks excessively" },
        //                     {
        //                         value: "blurts_out",
        //                         text: "Blurts out answers before questions have been completed",
        //                     },
        //                     {
        //                         value: "difficulty_waiting",
        //                         text: "Has difficulty waiting in line",
        //                     },
        //                     {
        //                         value: "interrupts_intrudes",
        //                         text: "Interrupts or intrudes on others (eg, butts into conversations/games)",
        //                     },
        //                     { value: "loses_temper", text: "Loses temper" },
        //                     {
        //                         value: "defies_refuses",
        //                         text: "Actively defies or refuses to comply with adult’s requests or rules",
        //                     },
        //                     {
        //                         value: "angry_resentful",
        //                         text: "Is angry or resentful",
        //                     },
        //                     {
        //                         value: "spiteful_vindictive",
        //                         text: "Is spiteful and vindictive",
        //                     },
        //                     {
        //                         value: "bullies_threatens",
        //                         text: "Bullies, threatens, or intimidates others",
        //                     },
        //                     {
        //                         value: "starts_fights",
        //                         text: "Initiates physical fights",
        //                     },
        //                     {
        //                         value: "lies_to_get_out",
        //                         text: "Lies to obtain goods for favors or to avoid obligations (eg, “cons” others)",
        //                     },
        //                     {
        //                         value: "physically_cruel_people",
        //                         text: "Is physically cruel to people",
        //                     },
        //                     {
        //                         value: "stolen_things_value",
        //                         text: "Has stolen items of nontrivial value",
        //                     },
        //                     {
        //                         value: "deliberately_destroys_property",
        //                         text: "Deliberately destroys others’ property",
        //                     },
        //                     {
        //                         value: "fearful_anxious",
        //                         text: "Is fearful, anxious, or worried",
        //                     },
        //                     {
        //                         value: "afraid_try_new_things",
        //                         text: "Is afraid to try new things for fear of making mistakes",
        //                     },
        //                     {
        //                         value: "feels_worthless_inferior",
        //                         text: "Feels worthless or inferior",
        //                     },
        //                     {
        //                         value: "blames_self",
        //                         text: "Blames self for problems; feels guilty",
        //                     },
        //                     {
        //                         value: "feels_lonely",
        //                         text: "Feels lonely, unwanted, or unloved; complains that “no one loves him or her”",
        //                     },
        //                     {
        //                         value: "sad_unhappy",
        //                         text: "Is sad, unhappy, or depressed",
        //                     },
        //                     {
        //                         value: "self_conscious",
        //                         text: "Is self-conscious or easily embarrassed",
        //                     },
        //                 ],
        //             },
        //             {
        //                 type: "matrix",
        //                 name: "performance",
        //                 title: "Performance",
        //                 columns: [
        //                     { value: "excellent", text: "Excellent" },
        //                     {
        //                         value: "above_average",
        //                         text: "Somewhat Above Average",
        //                     },
        //                     { value: "average", text: "Average" },
        //                     { value: "problem", text: "Problem" },
        //                     { value: "problematic", text: "Problematic" },
        //                 ],
        //                 rows: [
        //                     {
        //                         value: "overall_academic_performance",
        //                         text: "Overall academic performance",
        //                     },
        //                     { value: "reading", text: "Reading" },
        //                     { value: "writing", text: "Writing" },
        //                     { value: "mathematics", text: "Mathematics" },
        //                     {
        //                         value: "relationship_with_peers",
        //                         text: "Relationship with peers",
        //                     },
        //                     {
        //                         value: "following_directions",
        //                         text: "Following directions/rules",
        //                     },
        //                     {
        //                         value: "classroom_behavior",
        //                         text: "Classroom behavior",
        //                     },
        //                     {
        //                         value: "working_with_adults",
        //                         text: "Working with adults",
        //                     },
        //                 ],
        //             },
        //             {
        //                 type: "comment",
        //                 name: "teacher_comments",
        //                 title: "Comments",
        //                 width: "100%",
        //                 minWidth: "256px",
        //             },
        //         ],
        //     },
        //     {
        //         name: "anxiety_assessment",
        //         title: "Generalized Anxiety Disorder (GAD-7) Assessment",
        //         elements: [
        //             {
        //                 type: "matrix",
        //                 name: "gad7_questions",
        //                 title: "Over the last 2 weeks, how often have you been bothered by any of the following problems?",
        //                 columns: [
        //                     "Not at all",
        //                     "Several days",
        //                     "More than half the days",
        //                     "Nearly every day",
        //                 ],
        //                 rows: [
        //                     "Feeling nervous, anxious, or on edge",
        //                     "Not being able to stop or control worrying",
        //                     "Worrying too much about different things",
        //                     "Trouble relaxing",
        //                     "Being so restless that it's hard to sit still",
        //                     "Becoming easily annoyed or irritable",
        //                     "Feeling afraid as if something awful might happen",
        //                 ],
        //             },
        //         ],
        //     },
        //     {
        //         name: "phq9_assessment",
        //         title: "Patient Health Questionnaire (PHQ-9)",
        //         elements: [
        //             {
        //                 type: "matrix",
        //                 name: "phq9_questions",
        //                 title: "Over the last 2 weeks, how often have you been bothered by any of the following problems?",
        //                 columns: [
        //                     "Not at all",
        //                     "Several days",
        //                     "More than half the days",
        //                     "Nearly every day",
        //                 ],
        //                 rows: [
        //                     "Little interest or pleasure in doing things",
        //                     "Feeling down, depressed, or hopeless",
        //                     "Trouble falling or staying asleep, or sleeping too much",
        //                     "Feeling tired or having little energy",
        //                     "Poor appetite or overeating",
        //                     "Feeling bad about yourself – or that you are a failure or have let yourself or your family down",
        //                     "Trouble concentrating on things, such as reading the newspaper or watching television",
        //                     "Moving or speaking so slowly that other people could have noticed? Or the opposite – being so fidgety or restless that you have been moving around a lot more than usual",
        //                     "Thoughts that you would be better off dead or of hurting yourself in some way",
        //                 ],
        //             },
        //             {
        //                 type: "radiogroup",
        //                 name: "phq9_difficulty",
        //                 title: "If you checked off any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?",
        //                 choices: [
        //                     "Not difficult at all",
        //                     "Somewhat difficult",
        //                     "Very difficult",
        //                     "Extremely difficult",
        //                 ],
        //             },
        //         ],
        //     },
        //     {
        //         name: "other_assessments",
        //         title: "Other Assessments",
        //         elements: [
        //             {
        //                 type: "panel",
        //                 name: "ocd_assessment",
        //                 title: "OCD Assessment",
        //                 elements: [
        //                     {
        //                         type: "matrix",
        //                         name: "ocd_questions",
        //                         title: "Please answer the following questions:",
        //                         columns: ["Yes", "No"],
        //                         rows: [
        //                             "Do you have any tendency to keep things extremely clean or wash your hands very frequently, more than other people you know?",
        //                             "Do you check things over and over to excess?",
        //                             "Do you have to straighten, order, or tidy things so much that it interferes with other things you want to do?",
        //                             "Do you worry excessively about acting or speaking more aggressively then you should?",
        //                             "Do you have great difficulty discarding things even when they have no practical value?",
        //                         ],
        //                     },
        //                     {
        //                         type: "matrix",
        //                         name: "ocd_duration",
        //                         title: "Please indicate the duration of the following:",
        //                         columns: [
        //                             "None",
        //                             "< 1 hr/day",
        //                             "1-3 hr/day",
        //                             "3-8 hr/day",
        //                             "> 8 hr/day",
        //                         ],
        //                         rows: [
        //                             "How much of your time is occupied by obsessive thoughts?",
        //                             "How much time do you spend performing compulsive behaviors?",
        //                         ],
        //                     },
        //                     {
        //                         type: "matrix",
        //                         name: "ocd_interference",
        //                         title: "How much do these issues interfere with your daily life?",
        //                         columns: [
        //                             "None",
        //                             "Slightly",
        //                             "Definitely, but manageable",
        //                             "Substantially",
        //                             "Extremely",
        //                         ],
        //                         rows: [
        //                             "How much do your obsessive thoughts interfere with functioning in your social, work or other roles?",
        //                             "How much do your compulsive behaviors interfere with functioning in your social, work or other roles?",
        //                         ],
        //                     },
        //                 ],
        //             },
        //             {
        //                 type: "panel",
        //                 name: "mood_disorder_assessment",
        //                 title: "Mood Disorder Assessment",
        //                 elements: [
        //                     {
        //                         type: "matrix",
        //                         name: "mood_disorder_questions",
        //                         title: "Please answer the following questions:",
        //                         columns: ["Yes", "No"],
        //                         rows: [
        //                             "Have any of your blood relatives been diagnosed as 'Manic-Depressive' or as having Bipolar Disorder?",
        //                             "Have you ever had far more energy than usual, slept very little, and engaged in activities that may have been risky or dangerous?",
        //                             "Has there ever been a period of time when you were not your usual self and you felt so good or hyper that other people thought you were not your normal self, or you were so hyper that you got into trouble?",
        //                             "You were so irritable that you shouted at people or started fights or arguments?",
        //                             "You felt much more self-confident than usual?",
        //                             "You were much more talkative or spoke much faster than usual?",
        //                             "You got much less sleep than usual and found you didn't really miss it?",
        //                             "Thoughts raced through your head or you couldn't slow your mind down?",
        //                             "You were so easily distracted by things around you that you had trouble concentrating or staying on track?",
        //                             "You had much more energy than usual?",
        //                             "You were much more active or did many more things than usual?",
        //                             "You were much more social or outgoing than usual - for example, you telephoned friends in the middle of the night?",
        //                             "You were much more interested in sex than usual?",
        //                             "You did things that were unusual for you or that other people might have thought were excessive, foolish or risky?",
        //                             "You spent so much money that it got you or your family into trouble?",
        //                         ],
        //                     },
        //                 ],
        //             },
        //         ],
        //     },
        //     {
        //         name: "medications",
        //         title: "Medications",
        //         elements: [
        //             {
        //                 type: "panel",
        //                 name: "current_medications",
        //                 title: "Current Medications",
        //                 elements: [
        //                     {
        //                         type: "boolean",
        //                         name: "taking_medications",
        //                         title: "Are you currently taking any medications?",
        //                         width: "50%",
        //                     },
        //                     {
        //                         type: "text",
        //                         name: "primary_prescriber",
        //                         title: "Name of your primary prescriber (if applicable)",
        //                         visibleIf: "{taking_medications} = true",
        //                         width: "100%",
        //                     },
        //                     {
        //                         type: "matrixdynamic",
        //                         name: "medication_list",
        //                         title: "Current Medications",
        //                         visibleIf: "{taking_medications} = true",
        //                         columns: [
        //                             {
        //                                 name: "medication",
        //                                 title: "Medication",
        //                                 cellType: "dropdown",
        //                                 choicesOrder: "random",
        //                                 choices: [
        //                                     "Select medication...",
        //                                     "Prozac (Fluoxetine)",
        //                                     "Zoloft (Sertraline)",
        //                                     "Lexapro (Escitalopram)",
        //                                     "Paxil (Paroxetine)",
        //                                     "Celexa (Citalopram)",
        //                                     "Wellbutrin (Bupropion)",
        //                                     "Effexor (Venlafaxine)",
        //                                     "Cymbalta (Duloxetine)",
        //                                     "Pristiq (Desvenlafaxine)",
        //                                     "Remeron (Mirtazapine)",
        //                                     "Xanax (Alprazolam)",
        //                                     "Ativan (Lorazepam)",
        //                                     "Klonopin (Clonazepam)",
        //                                     "Valium (Diazepam)",
        //                                     "Buspar (Buspirone)",
        //                                     "Adderall (Amphetamine/Dextroamphetamine)",
        //                                     "Ritalin (Methylphenidate)",
        //                                     "Concerta (Methylphenidate ER)",
        //                                     "Vyvanse (Lisdexamfetamine)",
        //                                     "Strattera (Atomoxetine)",
        //                                     "Abilify (Aripiprazole)",
        //                                     "Seroquel (Quetiapine)",
        //                                     "Risperdal (Risperidone)",
        //                                     "Zyprexa (Olanzapine)",
        //                                     "Geodon (Ziprasidone)",
        //                                     "Lithium",
        //                                     "Depakote (Valproic Acid)",
        //                                     "Lamictal (Lamotrigine)",
        //                                     "Tegretol (Carbamazepine)",
        //                                     "Ambien (Zolpidem)",
        //                                     "Lunesta (Eszopiclone)",
        //                                     "Trazodone",
        //                                     "Other (please specify)",
        //                                 ],
        //                             },
        //                             {
        //                                 name: "other_medication",
        //                                 title: "If Other, please specify",
        //                                 cellType: "text",
        //                                 visibleIf:
        //                                     "{row.medication} == 'Other (please specify)'",
        //                             },
        //                             {
        //                                 name: "dosage",
        //                                 title: "Dosage",
        //                                 cellType: "text",
        //                             },
        //                             {
        //                                 name: "frequency",
        //                                 title: "Frequency",
        //                                 cellType: "dropdown",
        //                                 choices: [
        //                                     "Once daily",
        //                                     "Twice daily",
        //                                     "Three times daily",
        //                                     "Four times daily",
        //                                     "Every other day",
        //                                     "Weekly",
        //                                     "As needed",
        //                                     "Other (please specify)",
        //                                 ],
        //                             },
        //                             {
        //                                 name: "reason",
        //                                 title: "Reason",
        //                                 cellType: "dropdown",
        //                                 choicesOrder: "random",
        //                                 choices: [
        //                                     "Select reason...",
        //                                     "Depression",
        //                                     "Anxiety",
        //                                     "Bipolar Disorder",
        //                                     "Schizophrenia",
        //                                     "ADHD",
        //                                     "Insomnia",
        //                                     "OCD",
        //                                     "PTSD",
        //                                     "Panic Disorder",
        //                                     "Social Anxiety",
        //                                     "Generalized Anxiety Disorder",
        //                                     "Eating Disorder",
        //                                     "Substance Use Disorder",
        //                                     "Pain Management",
        //                                     "Other (please specify)",
        //                                 ],
        //                             },
        //                             {
        //                                 name: "other_reason",
        //                                 title: "If Other, please specify",
        //                                 cellType: "text",
        //                                 visibleIf:
        //                                     "{row.reason} == 'Other (please specify)'",
        //                             },
        //                             {
        //                                 name: "prescriber",
        //                                 title: "Prescriber",
        //                                 cellType: "dropdown",
        //                                 choices: [
        //                                     "Select prescriber...",
        //                                     "Primary Care Physician",
        //                                     "Psychiatrist",
        //                                     "Nurse Practitioner",
        //                                     "Same as primary prescriber listed above",
        //                                     "Other (please specify)",
        //                                 ],
        //                             },
        //                             {
        //                                 name: "other_prescriber",
        //                                 title: "If Other, please specify",
        //                                 cellType: "text",
        //                                 visibleIf:
        //                                     "{row.prescriber} == 'Other (please specify)'",
        //                             },
        //                         ],
        //                         addRowText: "Add Medication",
        //                         removeRowText: "Remove Medication",
        //                     },
        //                 ],
        //             },
        //             {
        //                 type: "panel",
        //                 name: "past_medications",
        //                 title: "Past Medications",
        //                 elements: [
        //                     {
        //                         type: "matrixdynamic",
        //                         name: "past_medication_list",
        //                         title: "Past Medications (if applicable)",
        //                         columns: [
        //                             {
        //                                 name: "medication",
        //                                 title: "Medication",
        //                                 cellType: "dropdown",
        //                                 choicesOrder: "random",
        //                                 choices: [
        //                                     "Select medication...",
        //                                     "Prozac (Fluoxetine)",
        //                                     "Zoloft (Sertraline)",
        //                                     "Lexapro (Escitalopram)",
        //                                     "Paxil (Paroxetine)",
        //                                     "Celexa (Citalopram)",
        //                                     "Wellbutrin (Bupropion)",
        //                                     "Effexor (Venlafaxine)",
        //                                     "Cymbalta (Duloxetine)",
        //                                     "Pristiq (Desvenlafaxine)",
        //                                     "Remeron (Mirtazapine)",
        //                                     "Xanax (Alprazolam)",
        //                                     "Ativan (Lorazepam)",
        //                                     "Klonopin (Clonazepam)",
        //                                     "Valium (Diazepam)",
        //                                     "Buspar (Buspirone)",
        //                                     "Adderall (Amphetamine/Dextroamphetamine)",
        //                                     "Ritalin (Methylphenidate)",
        //                                     "Concerta (Methylphenidate ER)",
        //                                     "Vyvanse (Lisdexamfetamine)",
        //                                     "Strattera (Atomoxetine)",
        //                                     "Abilify (Aripiprazole)",
        //                                     "Seroquel (Quetiapine)",
        //                                     "Risperdal (Risperidone)",
        //                                     "Zyprexa (Olanzapine)",
        //                                     "Geodon (Ziprasidone)",
        //                                     "Lithium",
        //                                     "Depakote (Valproic Acid)",
        //                                     "Lamictal (Lamotrigine)",
        //                                     "Tegretol (Carbamazepine)",
        //                                     "Ambien (Zolpidem)",
        //                                     "Lunesta (Eszopiclone)",
        //                                     "Trazodone",
        //                                     "Other (please specify)",
        //                                 ],
        //                             },
        //                             {
        //                                 name: "other_medication",
        //                                 title: "If Other, please specify",
        //                                 cellType: "text",
        //                                 visibleIf:
        //                                     "{row.medication} == 'Other (please specify)'",
        //                             },
        //                             {
        //                                 name: "reason",
        //                                 title: "Reason",
        //                                 cellType: "dropdown",
        //                                 choicesOrder: "random",
        //                                 choices: [
        //                                     "Select reason...",
        //                                     "Depression",
        //                                     "Anxiety",
        //                                     "Bipolar Disorder",
        //                                     "Schizophrenia",
        //                                     "ADHD",
        //                                     "Insomnia",
        //                                     "OCD",
        //                                     "PTSD",
        //                                     "Panic Disorder",
        //                                     "Social Anxiety",
        //                                     "Generalized Anxiety Disorder",
        //                                     "Eating Disorder",
        //                                     "Substance Use Disorder",
        //                                     "Pain Management",
        //                                     "Other (please specify)",
        //                                 ],
        //                             },
        //                             {
        //                                 name: "other_reason",
        //                                 title: "If Other, please specify",
        //                                 cellType: "text",
        //                                 visibleIf:
        //                                     "{row.reason} == 'Other (please specify)'",
        //                             },
        //                             {
        //                                 name: "reason_for_stopping",
        //                                 title: "Reason for Stopping",
        //                                 cellType: "dropdown",
        //                                 choices: [
        //                                     "Select reason...",
        //                                     "Ineffective",
        //                                     "Side effects",
        //                                     "No longer needed",
        //                                     "Cost",
        //                                     "Doctor's recommendation",
        //                                     "Other (please specify)",
        //                                 ],
        //                             },
        //                             {
        //                                 name: "other_reason_for_stopping",
        //                                 title: "If Other, please specify",
        //                                 cellType: "text",
        //                                 visibleIf:
        //                                     "{row.reason_for_stopping} == 'Other (please specify)'",
        //                             },
        //                         ],
        //                         addRowText: "Add Past Medication",
        //                         removeRowText: "Remove Medication",
        //                     },
        //                 ],
        //             },
        //         ],
        //     },
        //     {
        //         name: "consents_and_agreements",
        //         title: "Consents and Agreements",
        //         elements: [
        //             {
        //                 type: "panel",
        //                 name: "treatment_consent",
        //                 title: "Consent for Treatment",
        //                 elements: [
        //                     {
        //                         type: "html",
        //                         name: "treatment_consent_text",
        //                         html: "<strong>I authorize and request my practitioner to carry out psychological examinations, treatments, and/or diagnostic procedures which now or during the course of my treatment become advisable. I understand the purpose of these procedures will be explained to me upon my request and that they are subject to my agreement. I also understand that while the course of my treatment is designed to be helpful, my practitioner can make no guarantees about the outcome of my treatment.</strong>",
        //                     },
        //                     {
        //                         type: "boolean",
        //                         name: "treatment_consent_agreement",
        //                         title: "I have read and understand the above, and I agree to these terms",
        //                         //isRequired: true,
        //                     },
        //                     {
        //                         type: "signaturepad",
        //                         name: "treatment_consent_signature",
        //                         title: "Patient Signature",
        //                         width: "100%",
        //                         //isRequired: true,
        //                     },
        //                 ],
        //             },
        //             {
        //                 type: "panel",
        //                 name: "telehealth_consent",
        //                 title: "Informed Consent for Telehealth",
        //                 elements: [
        //                     {
        //                         type: "html",
        //                         name: "telehealth_consent_text",
        //                         html: "<strong>This Informed Consent for Telehealth contains important information focusing on doing psychotherapy using the phone or the Internet. Please read this carefully and let us know if you have any questions.</strong><strong><strong>Benefits and Risks of Telehealth:</strong> Telehealth provides increased access to mental health services and flexibility in scheduling. However, it may lack some visual or audio cues used in traditional in-person sessions and may not be suitable for all mental health conditions.</strong><strong><strong>Confidentiality:</strong> The laws that protect the confidentiality of your medical information also apply to telehealth. However, there are both mandatory and permissive exceptions to confidentiality, which are described in the general Consent Form.</strong><strong><strong>Emergencies and Technology:</strong> Assessing and evaluating threats and other emergencies can be more difficult when conducting telehealth compared to traditional in-person therapy. If an emergency situation arises, please call 911 or go to your nearest emergency room.</strong>",
        //                     },
        //                     {
        //                         type: "boolean",
        //                         name: "telehealth_consent_agreement",
        //                         title: "I have read and understand the above, and I agree to these terms for telehealth sessions",
        //                         //isRequired: true,
        //                     },
        //                     {
        //                         type: "signaturepad",
        //                         name: "telehealth_consent_signature",
        //                         title: "Patient Signature",
        //                         width: "100%",
        //                         //isRequired: true,
        //                     },
        //                 ],
        //             },
        //             {
        //                 type: "panel",
        //                 name: "privacy_notice",
        //                 title: "Acknowledgement of Notice of Privacy Practices",
        //                 elements: [
        //                     {
        //                         type: "html",
        //                         name: "privacy_notice_text",
        //                         html: "<strong>I acknowledge that I have received the Notice of Privacy Practices, which describes how health information about me may be used and disclosed by this practice.</strong>",
        //                     },
        //                     {
        //                         type: "boolean",
        //                         name: "privacy_notice_agreement",
        //                         title: "I acknowledge that I have received and reviewed the Notice of Privacy Practices",
        //                         //isRequired: true,
        //                     },
        //                     {
        //                         type: "signaturepad",
        //                         name: "privacy_notice_signature",
        //                         title: "Patient Signature",
        //                         width: "100%",
        //                         //isRequired: true,
        //                     },
        //                 ],
        //             },
        //             {
        //                 type: "panel",
        //                 name: "financial_agreement",
        //                 title: "Financial Agreement",
        //                 elements: [
        //                     {
        //                         type: "html",
        //                         name: "financial_agreement_text",
        //                         html: "<strong>I understand that I am responsible for all charges not covered by insurance, including deductibles, co-payments, and non-covered services. I agree to pay these charges at the time of service unless other arrangements have been made.</strong>",
        //                     },
        //                     {
        //                         type: "boolean",
        //                         name: "financial_agreement_acceptance",
        //                         title: "I have read and agree to the financial terms described above",
        //                         //isRequired: true,
        //                     },
        //                     {
        //                         type: "signaturepad",
        //                         name: "financial_agreement_signature",
        //                         title: "Patient Signature",
        //                         width: "100%",
        //                         //isRequired: true,
        //                     },
        //                 ],
        //             },
        //             {
        //                 type: "panel",
        //                 name: "medication_consent",
        //                 title: "Medication Consent",
        //                 elements: [
        //                     {
        //                         type: "html",
        //                         name: "medication_consent_text",
        //                         html: "<strong>I certify/consent that I am willing to be tapered off controlled substances. I understand that I will NOT receive a refill for my controlled substance and will work with my medical team to gradually taper off the controlled substance. In the event that I do not wish to be tapered off from my controlled substance, I understand I would be discharged from the practice and will need to find another provider in my network.</strong>",
        //                     },
        //                     {
        //                         type: "boolean",
        //                         name: "medication_consent_agreement",
        //                         title: "I have read and agree to the medication terms described above",
        //                         //isRequired: true,
        //                     },
        //                     {
        //                         type: "signaturepad",
        //                         name: "medication_consent_signature",
        //                         title: "Patient Signature",
        //                         width: "100%",
        //                         //isRequired: true,
        //                     },
        //                 ],
        //             },
        //             {
        //                 type: "panel",
        //                 name: "patient-rights-acknowledgement",
        //                 title: "FOUR SQUARE CLINICALS PATIENT RIGHTS ACKNOWLEDGEMENT",
        //                 elements: [
        //                     {
        //                         type: "html",
        //                         name: "acknowledgement-intro",
        //                         html: "<strong>By signing this form, I acknowledge understanding and receipt of the following information was given to me during the intake process:</strong>",
        //                     },
        //                     {
        //                         type: "checkbox",
        //                         name: "rights-acknowledgement",
        //                         title: "I acknowledge receipt and understanding of:",
        //                         isRequired: true,
        //                         choices: [
        //                             {
        //                                 value: "rights",
        //                                 text: "1. My rights and responsibilities",
        //                             },
        //                             {
        //                                 value: "opinion",
        //                                 text: "2. How to give my opinion about:",
        //                             },
        //                             { value: "goals", text: "a. Goals achieved" },
        //                             {
        //                                 value: "satisfaction",
        //                                 text: "b. Level of satisfaction",
        //                             },
        //                             {
        //                                 value: "expectations",
        //                                 text: "3. What is expected of me",
        //                             },
        //                             {
        //                                 value: "hours",
        //                                 text: "4. Hours the Behavioral Program is open for services",
        //                             },
        //                             {
        //                                 value: "after-hours",
        //                                 text: "5. How to receive assistance after hours, especially if it's an emergency",
        //                             },
        //                             {
        //                                 value: "code-of-conduct",
        //                                 text: "6. A summary of the Professional Code of Conduct of the Organization",
        //                             },
        //                             {
        //                                 value: "confidentiality",
        //                                 text: "7. Information of how my information is kept confidential",
        //                             },
        //                             {
        //                                 value: "confidentiality-limits",
        //                                 text: "8. Information about the limits of confidentiality and how to file grievance",
        //                             },
        //                             {
        //                                 value: "coordinator",
        //                                 text: "9. I have met the person that will be coordinating my services",
        //                             },
        //                             {
        //                                 value: "treatment-planning",
        //                                 text: "10. How I will participate in my treatment planning",
        //                             },
        //                         ],
        //                     },
        //                     {
        //                         type: "signaturepad",
        //                         name: "patient-signature",
        //                         title: "Patient Signature",
        //                         isRequired: true,
        //                     },
        //                     {
        //                         type: "text",
        //                         name: "patient-name",
        //                         title: "Patient Name (printed)",
        //                         isRequired: true,
        //                     },
        //                     {
        //                         type: "text",
        //                         name: "date",
        //                         title: "Date",
        //                         inputType: "date",
        //                         isRequired: true,
        //                     },
        //                 ],
        //                 width: "100%",
        //                 minWidth: "256px",
        //             },
        //         ],
        //     },
        //     {
        //         type: "panel",
        //         name: "crisis-hotlines",
        //         title: "Crisis Hotlines and Support Services",
        //         elements: [
        //             {
        //                 type: "html",
        //                 name: "local-24-hour",
        //                 html: "<h3>Local 24 Hour Access and Crisis Lines</h3>",
        //             },
        //             {
        //                 type: "html",
        //                 name: "national-suicide-prevention",
        //                 html: `<h3>National Suicide Prevention Life Line</h3>
        //                    <strong>Call 1-800-273-8255</strong>
        //                    <strong>The Lifeline provides 24/7, free and confidential support for people in distress, prevention and crisis resources for you or your loved ones, and best practices for professionals.</strong>`,
        //             },
        //             {
        //                 type: "html",
        //                 name: "spanish-lifeline",
        //                 html: `<h3>Ayuda En Español (Spanish National Suicide Prevention Lifeline)</h3>
        //                    <strong>Cuando usted llama al número 1-888-628-9454, su llamada se dirige al centro de ayuda de nuestra red disponible más cercano. Cuando el centro contesta su llamada, usted estará hablando con una persona que le escuchará, le hará preguntas y hará todo lo que esté a su alcance para ayudarle.</strong>`,
        //             },
        //             {
        //                 type: "html",
        //                 name: "crisis-text-line",
        //                 html: `<h3>Crisis Text Line</h3>
        //                    <strong>Crisis Text Line is free, 24/7 support for those in crisis. Text HOME to 741741 from anywhere in the US to text with a trained Crisis Counselor.</strong>`,
        //             },
        //             {
        //                 type: "html",
        //                 name: "crisis-support-nevada",
        //                 html: `<h3>Crisis Support Services of Nevada</h3>
        //                    <strong>775-784-8090</strong>
        //                    <strong>Crisis Support Services of Nevada is a 24/7 number where skilled counselors can assist you.</strong>`,
        //             },
        //             {
        //                 type: "html",
        //                 name: "mobile-outreach-safety",
        //                 html: `<h3>Mobile Outreach Safety Team (18 yrs and older)</h3>
        //                    <strong>Washoe County (775) 334-2677</strong>`,
        //             },
        //             {
        //                 type: "html",
        //                 name: "trevor-project",
        //                 html: `<h3>Trevor Project</h3>
        //                    <strong>Call 1-866-488-7386 or Text "Trevor" to 1-202-304-1200 M- F, 12 noon - 7 PM PST (Standard text messaging rates apply.)</strong>
        //                    <strong>The Trevor Project is the leading national organization providing crisis intervention and suicide prevention services to lesbian, gay, bisexual, transgender, queer & questioning (LGBTQ) young people under 25.</strong>`,
        //             },
        //             {
        //                 type: "html",
        //                 name: "childrens-mobile-crisis",
        //                 html: `<h3>Children's Mobile Crisis Response Team (18 years and younger)</h3>
        //                    <strong>Southern NV--702-486-7865; Monday - Sunday, 24 hours</strong>
        //                    <strong>Northern NV--775-688-4970; Monday - Friday, 8 AM to 8 PM; Saturday - Sunday, 8 AM - 6PM</strong>
        //                    <strong>Rural NV--702-486-7865; Monday - Sunday, 9 AM - 6 PM</strong>`,
        //             },
        //             {
        //                 type: "html",
        //                 name: "national-24-hour",
        //                 html: `<h3>National 24 Hours Access and Crisis Lines</h3>
        //                    <ul>
        //                      <li>Family Crisis: 866-233-4357</li>
        //                      <li>Suicide Crisis: 800-273-8255</li>
        //                      <li>Teen Crisis: 866-331-9474</li>
        //                      <li>Teen Crisis Hotline: 800-852-8336</li>
        //                      <li>Substance Abuse: 877-548-2072</li>
        //                    </ul>`,
        //             },
        //         ],
        //         width: "100%",
        //         minWidth: "256px",
        //     },
        // ],
        // calculatedValues: [
        //     {
        //         name: "gad7_score",
        //         expression:
        //             "{gad7_questions[0]} + {gad7_questions[1]} + {gad7_questions[2]} + {gad7_questions[3]} + {gad7_questions[4]} + {gad7_questions[5]} + {gad7_questions[6]}",
        //     },
        //     {
        //         name: "phq9_score",
        //         expression:
        //             "{phq9_questions[0]} + {phq9_questions[1]} + {phq9_questions[2]} + {phq9_questions[3]} + {phq9_questions[4]} + {phq9_questions[5]} + {phq9_questions[6]} + {phq9_questions[7]} + {phq9_questions[8]}",
        //     },
        //     {
        //         name: "ocd_duration_score",
        //         expression: "{ocd_duration[0]} + {ocd_duration[1]}",
        //     },
        //     {
        //         name: "ocd_interference_score",
        //         expression: "{ocd_interference[0]} + {ocd_interference[1]}",
        //     },
        {
            name: "patient_information",
            title: "Patient Information",
            elements: [
                {
                    type: "panel",
                    name: "basic_info",
                    title: "Basic Information",
                    elements: [
                        {
                            type: "text",
                            name: "last-name",
                            title: "Last Name",
                            //isRequired: true,
                            width: "50%",
                            minWidth: "256px",
                        },
                        {
                            type: "text",
                            name: "first-name",
                            title: "First Name",
                            //isRequired: true,
                            width: "50%",
                            minWidth: "256px",
                            startWithNewLine: false,
                        },
                        {
                            type: "text",
                            name: "middle_initial",
                            title: "MI",
                            width: "50%",
                            minWidth: "256px",
                        },
                        {
                            type: "dropdown",
                            name: "suffix",
                            title: "Suffix",
                            choices: ["", "Jr.", "Sr.", "III"],
                            width: "50%",
                            minWidth: "256px",
                            startWithNewLine: false,
                        },
                        {
                            type: "text",
                            name: "dob",
                            title: "Date of Birth",
                            inputType: "date",
                            //isRequired: true,
                            width: "50%",
                            minWidth: "256px",
                        },
                        {
                            type: "text",
                            name: "ssn",
                            title: "Social Security #",
                            //isRequired: true,
                            inputType: "number",
                            width: "50%",
                            minWidth: "256px",
                            startWithNewLine: false,
                        },
                        {
                            type: "dropdown",
                            name: "marital_status",
                            title: "Marital Status",
                            //isRequired: true,
                            choices: [
                                "Single",
                                "Married",
                                "Divorced",
                                "Widowed",
                                "Other",
                            ],
                            width: "50%",
                            minWidth: "256px",
                        },
                        {
                            type: "dropdown",
                            name: "gender",
                            title: "Gender",
                            //isRequired: true,
                            choices: ["Male", "Female", "Other"],
                            width: "50%",
                            minWidth: "256px",
                            startWithNewLine: false,
                        },
                        {
                            type: "text",
                            name: "address",
                            title: "Address",
                            //isRequired: true,
                            width: "100%",
                            minWidth: "256px",
                        },
                        {
                            type: "text",
                            name: "city",
                            title: "City",
                            //isRequired: true,
                            width: "33%",
                            minWidth: "128px",
                        },
                        {
                            type: "dropdown",
                            name: "state",
                            title: "State",
                            //isRequired: true,
                            choices: [
                                "Alabama",
                                "Alaska",
                                "Arizona",
                                "Arkansas",
                                "California",
                                "Colorado",
                                "Connecticut",
                                "Delaware",
                                "Florida",
                                "Georgia",
                                "Hawaii",
                                "Idaho",
                                "Illinois",
                                "Indiana",
                                "Iowa",
                                "Kansas",
                                "Kentucky",
                                "Louisiana",
                                "Maine",
                                "Maryland",
                                "Massachusetts",
                                "Michigan",
                                "Minnesota",
                                "Mississippi",
                                "Missouri",
                                "Montana",
                                "Nebraska",
                                "Nevada",
                                "New Hampshire",
                                "New Jersey",
                                "New Mexico",
                                "New York",
                                "North Carolina",
                                "North Dakota",
                                "Ohio",
                                "Oklahoma",
                                "Oregon",
                                "Pennsylvania",
                                "Rhode Island",
                                "South Carolina",
                                "South Dakota",
                                "Tennessee",
                                "Texas",
                                "Utah",
                                "Vermont",
                                "Virginia",
                                "Washington",
                                "West Virginia",
                                "Wisconsin",
                                "Wyoming",
                                "District of Columbia",
                            ],
                            width: "33%",
                            minWidth: "128px",
                            startWithNewLine: false,
                        },
                        {
                            type: "text",
                            name: "zip",
                            inputType: "number",
                            title: "Zip Code",
                            //isRequired: true,
                            width: "34%",
                            minWidth: "128px",
                            startWithNewLine: false,
                        },
                        {
                            type: "text",
                            name: "phone-home",
                            title: "Home Phone",
                            inputType: "tel",
                            width: "33%",
                            minWidth: "128px",
                        },
                        {
                            type: "text",
                            name: "phone-cell",
                            title: "Cell Phone",
                            inputType: "tel",
                            //isRequired: true,
                            width: "33%",
                            minWidth: "128px",
                            startWithNewLine: false,
                        },
                        {
                            type: "text",
                            name: "phone-work",
                            title: "Work Phone",
                            inputType: "tel",
                            width: "34%",
                            minWidth: "128px",
                            startWithNewLine: false,
                        },
                        {
                            type: "text",
                            name: "email",
                            title: "Email",
                            inputType: "email",
                            //isRequired: true,
                            width: "100%",
                            minWidth: "256px",
                        },
                        {
                            type: "comment",
                            name: "reason",
                            title: "Reason for Visit",
                            width: "100%",
                            minWidth: "256px",
                            isRequired: true,
                        },
                    ],
                },
                {
                    type: "panel",
                    name: "emergency_contact",
                    title: "Emergency Contact",
                    elements: [
                        {
                            type: "text",
                            name: "emergency_contact_name",
                            title: "Emergency Contact Name",
                            //isRequired: true,
                            width: "50%",
                            minWidth: "256px",
                        },
                        {
                            type: "dropdown",
                            name: "emergency_contact_relationship",
                            title: "Relationship",
                            //isRequired: true,
                            choices: [
                                "Spouse",
                                "Parent",
                                "Child",
                                "Sibling",
                                "Friend",
                                "Other",
                            ],
                            width: "50%",
                            minWidth: "256px",
                            startWithNewLine: false,
                        },
                        {
                            type: "text",
                            name: "emergency_contact_phone",
                            title: "Emergency Contact Phone",
                            inputType: "tel",
                            //isRequired: true,
                            width: "100%",
                            minWidth: "256px",
                        },
                    ],
                },
            ],
        },
        {
            name: "authorization_release",
            title: "Authorization for Use or Disclosure of Behavioral Health Record",
            elements: [
                {
                    type: "panel",
                    name: "release_information",
                    title: "Release Information",
                    elements: [
                        {
                            type: "text",
                            name: "release_from",
                            title: "Release From: Person/Entity",
                            //isRequired: true,
                            width: "50%",
                            minWidth: "256px",
                        },
                        {
                            type: "text",
                            name: "release_from_address",
                            title: "Address",
                            //isRequired: true,
                            width: "50%",
                            minWidth: "256px",
                            startWithNewLine: false,
                        },
                        {
                            type: "text",
                            name: "release_from_city",
                            title: "City/State/Zip",
                            //isRequired: true,
                            width: "50%",
                            minWidth: "256px",
                        },
                        {
                            type: "text",
                            name: "release_from_phone",
                            title: "Phone",
                            inputType: "tel",
                            //isRequired: true,
                            width: "50%",
                            minWidth: "256px",
                            startWithNewLine: false,
                        },
                        {
                            type: "text",
                            name: "release_from_fax",
                            title: "Fax",
                            inputType: "tel",
                            width: "50%",
                            minWidth: "256px",
                        },
                        {
                            type: "text",
                            name: "release_to",
                            title: "Release To: Person/Entity",
                            //isRequired: true,
                            width: "50%",
                            minWidth: "256px",
                        },
                        {
                            type: "text",
                            name: "release_to_address",
                            title: "Address",
                            //isRequired: true,
                            width: "50%",
                            minWidth: "256px",
                            startWithNewLine: false,
                        },
                        {
                            type: "text",
                            name: "release_to_city",
                            title: "City/State/Zip",
                            //isRequired: true,
                            width: "50%",
                            minWidth: "256px",
                        },
                        {
                            type: "text",
                            name: "release_to_phone",
                            title: "Phone",
                            inputType: "tel",
                            //isRequired: true,
                            width: "50%",
                            minWidth: "256px",
                            startWithNewLine: false,
                        },
                        {
                            type: "text",
                            name: "release_to_fax",
                            title: "Fax",
                            inputType: "tel",
                            width: "50%",
                            minWidth: "256px",
                        },
                        {
                            type: "checkbox",
                            name: "release_purpose",
                            title: "Purpose",
                            //isRequired: true,
                            choices: [
                                "Continuing Treatment",
                                "Legal",
                                "Insurance",
                                "Personal Use",
                                "Other",
                            ],
                            colCount: 1,
                        },
                    ],
                },
                {
                    type: "panel",
                    name: "information_to_release",
                    title: "Information to Release",
                    elements: [
                        {
                            type: "text",
                            name: "date_range_from",
                            title: "Date Range of Records Requested: From",
                            inputType: "date",
                            //isRequired: true,
                            width: "50%",
                            minWidth: "256px",
                        },
                        {
                            type: "text",
                            name: "date_range_to",
                            title: "To",
                            inputType: "date",
                            //isRequired: true,
                            width: "50%",
                            minWidth: "256px",
                            startWithNewLine: false,
                        },
                        {
                            type: "checkbox",
                            name: "information_requested",
                            title: "Please initial next to each type of information requested",
                            //isRequired: true,
                            choices: [
                                "Summary Letter",
                                "Attendance Record",
                                "Medications List",
                                "Contact Log",
                                "Initial Evaluation",
                                "Treatment Plan",
                                "Progress Notes",
                                "Psychotherapy Notes",
                                "Self-Care Management Plan",
                                "Results of Diagnostic Testing",
                                "All Records",
                                "Other",
                            ],
                            colCount: 1,
                        },
                        {
                            type: "radiogroup",
                            name: "family_counseling_release",
                            title: "Joint/Family Counseling: Information disclosed may include notes/records from joint/family counseling sessions, if any. Initial one of the following statements:",
                            //isRequired: true,
                            choices: [
                                "I do authorize release of information from joint/family counseling sessions",
                                "I do not authorize release of information from joint/family counseling sessions",
                            ],
                        },
                        {
                            type: "html",
                            name: "notice_of_sensitive_information",
                            html: "<h3>Sensitive Information: </h3><strong>I understand the information to be released or disclosed may include information that will reveal that Behavioral Health services have been/are being provided to me. This information may include but is not limited to specific details about discussions or conversations involving physical/sexual abuse, substance abuse, and/or mental illness.</strong>",
                            width: "100%",
                            minWidth: "256px",
                        },
                        {
                            type: "text",
                            name: "sensitive_information_acknowledgement",
                            title: "Sensitive Information: My initials demonstrate my acknowledgement and authorization to release or disclose this type of information:",
                            //isRequired: true,
                            width: "100%",
                            minWidth: "256px",
                        },
                        {
                            type: "radiogroup",
                            name: "delivery_instructions",
                            title: "Delivery Instructions",
                            //isRequired: true,
                            choices: [
                                "Mail",
                                "Fax records directly to person/entity specified above",
                                "Call patient when records are ready for pick up",
                                "Patient/Representative authorizes to pick up the copies",
                                "Other instructions",
                            ],
                        },
                        {
                            type: "text",
                            name: "expiration",
                            title: "Expiration: Without my written revocation, this authorization will automatically expire upon satisfaction of the need for disclosure, or one year from the date signed, unless otherwise specified:",
                            width: "100%",
                            minWidth: "256px",
                        },
                    ],
                },
                {
                    type: "html",
                    name: "notice_of_rights",
                    html: `<article style="font-family: Arial, sans-serif; color: #494949; line-height: 1.6; max-width: 800px; margin: 20px auto; background-color: #fff; border-radius: 10px; box-shadow: 0 0 20px rgba(12, 60, 96, 0.1); padding: 40px;">
    <h1 style="color: #0C3C60; text-align: center;">Notice of Rights</h1>
    
    <ul style="list-style-type: none; padding: 0;">
        <li style="background-color: #D1E0EB; border-radius: 5px; padding: 15px; margin-bottom: 10px; transition: all 0.3s ease;">
            If I refuse to sign this authorization, my refusal will not affect my ability to obtain treatment.
        </li>
        <li style="background-color: #D1E0EB; border-radius: 5px; padding: 15px; margin-bottom: 10px; transition: all 0.3s ease;">
            I may inspect or obtain a copy of the health information requested in this authorization.
        </li>
        <li style="background-color: #D1E0EB; border-radius: 5px; padding: 15px; margin-bottom: 10px; transition: all 0.3s ease;">
            I may revoke this authorization at any time in writing, signed by me or on my behalf, and delivered to Four Square Clinicals, Medical Records, 100 N Arlington Ave, Suite 340A, Reno, NV 89501.
        </li>
        <li style="background-color: #D1E0EB; border-radius: 5px; padding: 15px; margin-bottom: 10px; transition: all 0.3s ease;">
            If I revoke this authorization, the revocation will not have any effect on any actions taken prior to Four Square Clinicals' receipt of the revocation.
        </li>
        <li style="background-color: #D1E0EB; border-radius: 5px; padding: 15px; margin-bottom: 10px; transition: all 0.3s ease;">
            I have a right to receive a copy of this authorization.
        </li>
        <li style="background-color: #D1E0EB; border-radius: 5px; padding: 15px; margin-bottom: 10px; transition: all 0.3s ease;">
            Information disclosed pursuant to this authorization could be re-disclosed by the recipient and may no longer be protected by the federal privacy rule (HIPAA). However, Nevada law prohibits the person receiving my health information from making further disclosure of it unless another authorization for such disclosure is obtained from me or unless such disclosure is specifically required or permitted by law.
        </li>
    </ul>
</article>`,
                    width: "100%",
                    minWidth: "256px",
                },
                {
                    type: "signaturepad",
                    name: "patient_signature",
                    title: "Signature of Patient or Legal Representative",
                    //isRequired: true,
                    width: "50%",
                    minWidth: "256px",
                },
                {
                    type: "text",
                    name: "patient_signature_date",
                    title: "Date",
                    inputType: "date",
                    //isRequired: true,
                    width: "50%",
                    minWidth: "256px",
                    startWithNewLine: false,
                },
                {
                    type: "text",
                    name: "relationship",
                    title: "Relationship (if Legal Representative)",
                    width: "50%",
                    minWidth: "256px",
                },
                {
                    type: "signaturepad",
                    name: "provider_signature",
                    title: "Signature of Provider",
                    width: "50%",
                    minWidth: "256px",
                    startWithNewLine: false,
                },
                {
                    type: "text",
                    name: "provider_signature_date",
                    title: "Date",
                    inputType: "date",
                    width: "50%",
                    minWidth: "256px",
                },
            ],
        },
        {
            type: "html",
            name: "diagnostics_of_adhd_use_parent",
            html: "<h3>Directions: </h3><strong>Each rating should be considered in the context of what is appropriate for the age of your child. When completing this form, please think about your child’s behaviors in the past 6 months or if this is a follow-up think about their behavior since the last assessment scale was filled out.</strong>",
            width: "100%",
            minWidth: "256px",
        },
        {
            name: "nichq_vanderbilt_assessment_scale_parent",
            title: "NICHQ Vanderbilt Assessment Scale—PARENT Informant",
            elements: [
                {
                    type: "text",
                    name: "date",
                    title: "Today's Date",
                    inputType: "date",
                    //isRequired: true,
                    width: "50%",
                    minWidth: "256px",
                },
                {
                    type: "text",
                    name: "child_name",
                    title: "Child's Name",
                    //isRequired: true,
                    width: "50%",
                    minWidth: "256px",
                    startWithNewLine: false,
                },
                {
                    type: "text",
                    name: "child_dob",
                    title: "Date of Birth",
                    inputType: "date",
                    //isRequired: true,
                    width: "50%",
                    minWidth: "256px",
                },
                {
                    type: "text",
                    name: "parent_name",
                    title: "Parent's Name",
                    //isRequired: true,
                    width: "50%",
                    minWidth: "256px",
                    startWithNewLine: false,
                },
                {
                    type: "text",
                    name: "parent_phone",
                    title: "Parent's Phone Number",
                    inputType: "tel",
                    //isRequired: true,
                    width: "50%",
                    minWidth: "256px",
                },
                {
                    type: "radiogroup",
                    name: "evaluation_basis",
                    title: "Is this evaluation based on a time when the child",
                    //isRequired: true,
                    choices: [
                        "Was on medication",
                        "Was not on medication",
                        "Not sure",
                    ],
                    width: "50%",
                    minWidth: "256px",
                    startWithNewLine: false,
                },
                {
                    type: "matrix",
                    name: "symptoms",
                    title: "Symptoms",
                    //isRequired: true,
                    columns: [
                        { value: 0, text: "Never" },
                        { value: 1, text: "Occasionally" },
                        { value: 2, text: "Often" },
                        { value: 3, text: "Very Often" },
                    ],
                    rows: [
                        "Does not pay attention to details or makes careless mistakes with, for example, homework",
                        "Has difficulty keeping attention to what needs to be done",
                        "Does not seem to listen when spoken to directly",
                        "Does not follow through when given directions and fails to finish activities (not due to refusal or failure to understand)",
                        "Has difficulty organizing tasks and activities",
                        "Avoids, dislikes, or does not want to start tasks that require ongoing mental effort",
                        "Loses things necessary for tasks or activities (toys, assignments, pencils, or books)",
                        "Is easily distracted by noises or other stimuli",
                        "Is forgetful in daily activities",
                        "Fidgets with hands or feet or squirms in seat",
                        "Leaves seat when remaining seated is expected",
                        "Runs about or climbs too much when remaining seated is expected",
                        "Has difficulty playing or beginning quiet play activities",
                        "Is 'on the go' or often acts as if 'driven by a motor'",
                        "Talks too much",
                        "Blurts out answers before questions have been completed",
                        "Has difficulty waiting his or her turn",
                        "Interrupts or intrudes in on others' conversations and/or activities",
                        "Argues with adults",
                        "Loses temper",
                        "Actively defies or refuses to go along with adults' requests or rules",
                        "Deliberately annoys people",
                        "Blames others for his or her mistakes or misbehaviors",
                        "Is touchy or easily annoyed by others",
                        "Is angry or resentful",
                        "Is spiteful and wants to get even",
                        "Bullies, threatens, or intimidates others",
                        "Starts physical fights",
                        "Lies to get out of trouble or to avoid obligations (ie, 'cons' others)",
                        "Is truant from school (skips school) without permission",
                        "Is physically cruel to people",
                        "Has stolen things that have value",
                        "Deliberately destroys others' property",
                        "Has used a weapon that can cause serious harm (bat, knife, brick, gun)",
                        "Is physically cruel to animals",
                        "Has deliberately set fires to cause damage",
                        "Has broken into someone else's home, business, or car",
                        "Has stayed out at night without permission",
                        "Has run away from home overnight",
                        "Has forced someone into sexual activity",
                        "Is fearful, anxious, or worried",
                        "Is afraid to try new things for fear of making mistakes",
                        "Feels worthless or inferior",
                        "Blames self for problems, feels guilty",
                        "Feels lonely, unwanted, or unloved; complains that 'no one loves him or her'",
                        "Is sad, unhappy, or depressed",
                        "Is self-conscious or easily embarrassed",
                    ],
                },
                {
                    type: "matrix",
                    name: "performance",
                    title: "Performance",
                    //isRequired: true,
                    columns: [
                        { value: 1, text: "Excellent" },
                        { value: 2, text: "Above Average" },
                        { value: 3, text: "Average" },
                        { value: 4, text: "Somewhat of a Problem" },
                        { value: 5, text: "Problematic" },
                    ],
                    rows: [
                        "Overall school performance",
                        "Reading",
                        "Writing",
                        "Mathematics",
                        "Relationship with parents",
                        "Relationship with siblings",
                        "Relationship with peers",
                        "Participation in organized activities (eg, teams)",
                    ],
                },
                {
                    type: "comment",
                    name: "parent_comments",
                    title: "Comments",
                    width: "100%",
                    minWidth: "256px",
                },
            ],
        },
        {
            type: "html",
            name: "diagnostics_of_adhd_use_teacher",
            html: "<h3>Directions: </h3><strong>Each rating should be considered in the context of what is appropriate for the age of the child you are rating and should reflect that child’s behavior since the beginning of the school year or if this is a follow-up, think about their behavior since the last assessment scale was filled out.</strong>",
            width: "100%",
            minWidth: "256px",
        },
        {
            name: "nichq_vanderbilt_assessment_scale_teacher",
            title: "NICHQ Vanderbilt Assessment Scale—TEACHER Informant",
            elements: [
                {
                    type: "text",
                    name: "teacher_name",
                    title: "Teacher's Name",
                    //isRequired: true,
                    width: "50%",
                    minWidth: "256px",
                },
                {
                    type: "text",
                    name: "class_time",
                    title: "Class Time",
                    //isRequired: true,
                    width: "50%",
                    minWidth: "256px",
                    startWithNewLine: false,
                },
                {
                    type: "text",
                    name: "class_name_period",
                    title: "Class Name/Period",
                    //isRequired: true,
                    width: "50%",
                    minWidth: "256px",
                },
                {
                    type: "text",
                    name: "date",
                    title: "Today's Date",
                    inputType: "date",
                    //isRequired: true,
                    width: "50%",
                    minWidth: "256px",
                    startWithNewLine: false,
                },
                {
                    type: "text",
                    name: "child_name",
                    title: "Child's Name",
                    //isRequired: true,
                    width: "50%",
                    minWidth: "256px",
                },
                {
                    type: "text",
                    name: "grade_level",
                    title: "Grade Level",
                    //isRequired: true,
                    width: "50%",
                    minWidth: "256px",
                    startWithNewLine: false,
                },
                {
                    type: "text",
                    name: "evaluation_period",
                    title: "Please indicate the number of weeks or months you have been able to evaluate the behaviors",
                    //isRequired: true,
                    width: "50%",
                    minWidth: "256px",
                },
                {
                    type: "radiogroup",
                    name: "evaluation_basis",
                    title: "Is this evaluation based on a time when the child",
                    //isRequired: true,
                    choices: [
                        "Was on medication",
                        "Was not on medication",
                        "Not sure",
                    ],
                    width: "50%",
                    minWidth: "256px",
                    startWithNewLine: false,
                },
                {
                    type: "matrix",
                    name: "symptoms",
                    title: "Symptoms",
                    //isRequired: true,
                    columns: [
                        { value: 0, text: "Never" },
                        { value: 1, text: "Occasionally" },
                        { value: 2, text: "Often" },
                        { value: 3, text: "Very Often" },
                    ],
                    rows: [
                        "Fails to give attention to details or makes careless mistakes in schoolwork",
                        "Has difficulty sustaining attention to tasks or activities",
                        "Does not seem to listen when spoken to directly",
                        "Does not follow through on instructions and fails to finish schoolwork (not due to oppositional behavior or failure to understand)",
                        "Has difficulty organizing tasks and activities",
                        "Avoids, dislikes, or is reluctant to engage in tasks that require sustained mental effort",
                        "Loses things necessary for tasks or activities (school assignments, pencils, or books)",
                        "Is easily distracted by extraneous stimuli",
                        "Is forgetful in daily activities",
                        "Fidgets with hands or feet or squirms in seat",
                        "Leaves seat in classroom or in other situations in which remaining seated is expected",
                        "Runs about or climbs excessively in situations in which remaining seated is expected",
                        "Has difficulty playing or engaging in leisure activities quietly",
                        "Is 'on the go' or often acts as if 'driven by a motor'",
                        "Talks excessively",
                        "Blurts out answers before questions have been completed",
                        "Has difficulty waiting in line",
                        "Interrupts or intrudes on others (eg, butts into conversations/games)",
                        "Loses temper",
                        "Actively defies or refuses to comply with adult's requests or rules",
                        "Is angry or resentful",
                        "Is spiteful and vindictive",
                        "Bullies, threatens, or intimidates others",
                        "Initiates physical fights",
                        "Lies to obtain goods for favors or to avoid obligations (eg, 'cons' others)",
                        "Is physically cruel to people",
                        "Has stolen items of nontrivial value",
                        "Deliberately destroys others' property",
                        "Is fearful, anxious, or worried",
                        "Is self-conscious or easily embarrassed",
                        "Is afraid to try new things for fear of making mistakes",
                        "Feels worthless or inferior",
                        "Blames self for problems; feels guilty",
                        "Feels lonely, unwanted, or unloved; complains that 'no one loves him or her'",
                        "Is sad, unhappy, or depressed",
                    ],
                },
                {
                    type: "matrix",
                    name: "performance",
                    title: "Performance",
                    //isRequired: true,
                    columns: [
                        { value: 1, text: "Excellent" },
                        { value: 2, text: "Above Average" },
                        { value: 3, text: "Average" },
                        { value: 4, text: "Somewhat of a Problem" },
                        { value: 5, text: "Problematic" },
                    ],
                    rows: [
                        "Reading",
                        "Mathematics",
                        "Written expression",
                        "Relationship with peers",
                        "Following directions",
                        "Disrupting class",
                        "Assignment completion",
                        "Organizational skills",
                    ],
                },
                {
                    type: "comment",
                    name: "teacher_comments",
                    title: "Comments",
                    width: "100%",
                    minWidth: "256px",
                },
            ],
        },
        {
            name: "scoring_instructions",
            title: "Scoring Instructions for the NICHQ Vanderbilt Assessment Scales",
            elements: [
                {
                    type: "panel",
                    name: "scoring_instructions_panel",
                    title: "Scoring Instructions",
                    state: "collapsed",
                    elements: [
                        {
                            type: "html",
                            name: "general_instructions",
                            html: `<article style="font-family: Arial, sans-serif; color: #494949; line-height: 1.6; max-width: 800px; margin: 20px auto; background-color: #fff; border-radius: 10px; box-shadow: 0 0 20px rgba(12, 60, 96, 0.1); padding: 40px;">
    <h1 style="color: #0C3C60; text-align: center;">Scoring Instructions for ADHD Assessment Scales</h1><div id="scoringInstructions" style="background-color: #D1E0EB; border-radius: 5px; padding: 20px; margin-bottom: 20px;">
        <div id="mainContent" style="display: block;">
            <p>These scales should NOT be used alone to make any diagnosis. You must take into consideration information from multiple sources. Scores of 2 or 3 on a single Symptom question reflect often-occurring behaviors. Scores of 4 or 5 on Performance questions reflect problems in performance.</p>
            <p>The initial assessment scales, parent and teacher, have 2 components: symptom assessment and impairment in performance. On both the parent and teacher initial scales, the symptom assessment screens for symptoms that meet criteria for both inattentive (items 1–9) and hyperactive ADHD (items 10–18).</p>
            <p>To meet DSM-IV criteria for the diagnosis, one must have at least 6 positive responses to either the inattentive 9 or hyperactive 9 core symptoms, or both. A positive response is a 2 or 3 (often, very often) (you could draw a line straight down the page and count the positive answers in each subsegment).</p>
            <p>There is a place to record the number of positives in each subsegment, and a place for total score for the first 18 symptoms (just add them up).</p>
            <p>The initial scales also have symptom screens for 3 other comorbidities—oppositional-defiant, conduct, and anxiety/depression. These are screened by the number of positive responses in each of the segments separated by the "squares." The specific item sets and numbers of positives required for each co-morbid symptom screen set are detailed below.</p>
            <p>The second section of the scale has a set of performance measures, scored 1 to 5, with 4 and 5 being somewhat of a problem/problematic. To meet criteria for ADHD there must be at least one item of the Performance set in which the child scores a 4 or 5; ie, there must be impairment, not just symptoms to meet diagnostic criteria. The sheet has a place to record the number of positives (4s, 5s) and an Average Performance Score—add them up and divide by number of Performance criteria answered.</p>
        </div>
    </div>

    <section style="background-color: #D1E0EB; border-radius: 5px; padding: 20px; margin-bottom: 20px;">
        <h2 style="color: #0C3C60;">Parent Assessment Scale</h2>
        <h3>Predominantly Inattentive subtype</h3>
        <ul>
            <li>Must score a 2 or 3 on 6 out of 9 items on questions 1–9 AND</li>
            <li>Score a 4 or 5 on any of the Performance questions 48–55</li>
        </ul>
        <h3>Predominantly Hyperactive/Impulsive subtype</h3>
        <ul>
            <li>Must score a 2 or 3 on 6 out of 9 items on questions 10–18 AND</li>
            <li>Score a 4 or 5 on any of the Performance questions 48–55</li>
        </ul>
        <h3>ADHD Combined Inattention/Hyperactivity</h3>
        <ul>
            <li>Requires the above criteria on both inattention and hyperactivity/impulsivity</li>
        </ul>
        <h3>Oppositional-Defiant Disorder Screen</h3>
        <ul>
            <li>Must score a 2 or 3 on 4 out of 8 behaviors on questions 19–26 AND</li>
            <li>Score a 4 or 5 on any of the Performance questions 48–55</li>
        </ul>
        <h3>Conduct Disorder Screen</h3>
        <ul>
            <li>Must score a 2 or 3 on 3 out of 14 behaviors on questions 27–40 AND</li>
            <li>Score a 4 or 5 on any of the Performance questions 48–55</li>
        </ul>
        <h3>Anxiety/Depression Screen</h3>
        <ul>
            <li>Must score a 2 or 3 on 3 out of 7 behaviors on questions 41–47 AND</li>
            <li>Score a 4 or 5 on any of the Performance questions 48–55</li>
        </ul>
    </section>

    <section style="background-color: #D1E0EB; border-radius: 5px; padding: 20px; margin-bottom: 20px;">
        <h2 style="color: #0C3C60;">Teacher Assessment Scale</h2>
        <h3>Predominantly Inattentive subtype</h3>
        <ul>
            <li>Must score a 2 or 3 on 6 out of 9 items on questions 1–9 AND</li>
            <li>Score a 4 or 5 on any of the Performance questions 36–43</li>
        </ul>
        <h3>Predominantly Hyperactive/Impulsive subtype</h3>
        <ul>
            <li>Must score a 2 or 3 on 6 out of 9 items on questions 10–18 AND</li>
            <li>Score a 4 or 5 on any of the Performance questions 36–43</li>
        </ul>
        <h3>ADHD Combined Inattention/Hyperactivity</h3>
        <ul>
            <li>Requires the above criteria on both inattention and hyperactivity/impulsivity</li>
        </ul>
        <h3>Oppositional-Defiant/Conduct Disorder Screen</h3>
        <ul>
            <li>Must score a 2 or 3 on 3 out of 10 items on questions 19–28 AND</li>
            <li>Score a 4 or 5 on any of the Performance questions 36–43</li>
        </ul>
        <h3>Anxiety/Depression Screen</h3>
        <ul>
            <li>Must score a 2 or 3 on 3 out of 7 items on questions 29–35 AND</li>
            <li>Score a 4 or 5 on any of the Performance questions 36–43</li>
        </ul>
    </section>

    <section style="background-color: #D1E0EB; border-radius: 5px; padding: 20px; margin-bottom: 20px;">
        <h2 style="color: #0C3C60;">Follow-up Scales</h2>
        <p>The parent and teacher follow-up scales have the first 18 core ADHD symptoms, not the co-morbid symptoms. The section segment has the same Performance items and impairment assessment as the initial scales, and then has a side-effect reporting scale that can be used to both assess and monitor the presence of adverse reactions to medications prescribed, if any.</p>
        <p>Scoring the follow-up scales involves only calculating a total symptom score for items 1–18 that can be tracked over time, and the average of the Performance items answered as measures of improvement over time with treatment.</p>
        <h3>Parent Assessment Follow-up</h3>
        <ul>
            <li>Calculate Total Symptom Score for questions 1–18.</li>
            <li>Calculate Average Performance Score for questions 19–26.</li>
        </ul>
        <h3>Teacher Assessment Follow-up</h3>
        <ul>
            <li>Calculate Total Symptom Score for questions 1–18.</li>
            <li>Calculate Average Performance Score for questions 19–26.</li>
        </ul>
    </section>

    <p style="font-style: italic; text-align: center; margin-top: 20px; font-size: 0.9em;">The recommendations in this publication do not indicate an exclusive course of treatment or serve as a standard of medical care. Variations, taking into account individual circumstances, may be appropriate.</p>
    <p style="font-style: italic; text-align: center; margin-top: 10px; font-size: 0.9em;">Copyright ©2002 American Academy of Pediatrics and National Initiative for Children's Healthcare Quality</p>

    <script>
        function toggleContent(id) {
            var content = document.getElementById(id);
            content.style.display = content.style.display === "none" ? "block" : "none";
        }
    </script>
</article>`,
                        },
                    ],
                },
            ],
        },
        {
            name: "adult_adhd_checklist",
            title: "Adult ADHD Self-Report Scale (ASRS-v1.1) Symptom Checklist",
            elements: [
                {
                    type: "text",
                    name: "patient_name",
                    title: "Patient Name",
                    //isRequired: true,
                },
                {
                    type: "text",
                    name: "date",
                    title: "Today’s Date",
                    inputType: "date",
                    //isRequired: true,
                },
                {
                    type: "html",
                    name: "asrs_instructions",
                    html: "<strong>Please answer the questions below, rating yourself on each of the criteria shown using the scale on the right side of the page. As you answer each question, place an X in the box that best describes how you have felt and conducted yourself over the past 6 months. Please give this completed checklist to your healthcare professional to discuss during today’s appointment.</strong>",
                },
                {
                    type: "panel",
                    name: "part_a",
                    title: "Part A",
                    elements: [
                        {
                            type: "radiogroup",
                            name: "question_1",
                            title: "1. How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?",
                            choices: [
                                "Never",
                                "Rarely",
                                "Sometimes",
                                "Often",
                                "Very Often",
                            ],
                            //isRequired: true,
                        },
                        {
                            type: "radiogroup",
                            name: "question_2",
                            title: "2. How often do you have difficulty getting things in order when you have to do a task that requires organization?",
                            choices: [
                                "Never",
                                "Rarely",
                                "Sometimes",
                                "Often",
                                "Very Often",
                            ],
                            //isRequired: true,
                        },
                        {
                            type: "radiogroup",
                            name: "question_3",
                            title: "3. How often do you have problems remembering appointments or obligations?",
                            choices: [
                                "Never",
                                "Rarely",
                                "Sometimes",
                                "Often",
                                "Very Often",
                            ],
                            //isRequired: true,
                        },
                        {
                            type: "radiogroup",
                            name: "question_4",
                            title: "4. When you have a task that requires a lot of thought, how often do you avoid or delay getting started?",
                            choices: [
                                "Never",
                                "Rarely",
                                "Sometimes",
                                "Often",
                                "Very Often",
                            ],
                            //isRequired: true,
                        },
                        {
                            type: "radiogroup",
                            name: "question_5",
                            title: "5. How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?",
                            choices: [
                                "Never",
                                "Rarely",
                                "Sometimes",
                                "Often",
                                "Very Often",
                            ],
                            //isRequired: true,
                        },
                        {
                            type: "radiogroup",
                            name: "question_6",
                            title: "6. How often do you feel overly active and compelled to do things, like you were driven by a motor?",
                            choices: [
                                "Never",
                                "Rarely",
                                "Sometimes",
                                "Often",
                                "Very Often",
                            ],
                            //isRequired: true,
                        },
                    ],
                },
                {
                    type: "panel",
                    name: "part_b",
                    title: "Part B",
                    elements: [
                        {
                            type: "radiogroup",
                            name: "question_7",
                            title: "7. How often do you make careless mistakes when you have to work on a boring or difficult project?",
                            choices: [
                                "Never",
                                "Rarely",
                                "Sometimes",
                                "Often",
                                "Very Often",
                            ],
                            //isRequired: true,
                        },
                        {
                            type: "radiogroup",
                            name: "question_8",
                            title: "8. How often do you have difficulty keeping your attention when you are doing boring or repetitive work?",
                            choices: [
                                "Never",
                                "Rarely",
                                "Sometimes",
                                "Often",
                                "Very Often",
                            ],
                            //isRequired: true,
                        },
                        {
                            type: "radiogroup",
                            name: "question_9",
                            title: "9. How often do you have difficulty concentrating on what people say to you, even when they are speaking to you directly?",
                            choices: [
                                "Never",
                                "Rarely",
                                "Sometimes",
                                "Often",
                                "Very Often",
                            ],
                            //isRequired: true,
                        },
                        {
                            type: "radiogroup",
                            name: "question_10",
                            title: "10. How often do you misplace or have difficulty finding things at home or at work?",
                            choices: [
                                "Never",
                                "Rarely",
                                "Sometimes",
                                "Often",
                                "Very Often",
                            ],
                            //isRequired: true,
                        },
                        {
                            type: "radiogroup",
                            name: "question_11",
                            title: "11. How often are you distracted by activity or noise around you?",
                            choices: [
                                "Never",
                                "Rarely",
                                "Sometimes",
                                "Often",
                                "Very Often",
                            ],
                            //isRequired: true,
                        },
                        {
                            type: "radiogroup",
                            name: "question_12",
                            title: "12. How often do you leave your seat in meetings or other situations in which you are expected to remain seated?",
                            choices: [
                                "Never",
                                "Rarely",
                                "Sometimes",
                                "Often",
                                "Very Often",
                            ],
                            //isRequired: true,
                        },
                        {
                            type: "radiogroup",
                            name: "question_13",
                            title: "13. How often do you feel restless or fidgety?",
                            choices: [
                                "Never",
                                "Rarely",
                                "Sometimes",
                                "Often",
                                "Very Often",
                            ],
                            //isRequired: true,
                        },
                        {
                            type: "radiogroup",
                            name: "question_14",
                            title: "14. How often do you have difficulty unwinding and relaxing when you have time to yourself?",
                            choices: [
                                "Never",
                                "Rarely",
                                "Sometimes",
                                "Often",
                                "Very Often",
                            ],
                            //isRequired: true,
                        },
                        {
                            type: "radiogroup",
                            name: "question_15",
                            title: "15. How often do you find yourself talking too much when you are in social situations?",
                            choices: [
                                "Never",
                                "Rarely",
                                "Sometimes",
                                "Often",
                                "Very Often",
                            ],
                            //isRequired: true,
                        },
                        {
                            type: "radiogroup",
                            name: "question_16",
                            title: "16. When you’re in a conversation, how often do you find yourself finishing the sentences of the people you are talking to, before they can finish them themselves?",
                            choices: [
                                "Never",
                                "Rarely",
                                "Sometimes",
                                "Often",
                                "Very Often",
                            ],
                            //isRequired: true,
                        },
                        {
                            type: "radiogroup",
                            name: "question_17",
                            title: "17. How often do you have difficulty waiting your turn in situations when turn taking is required?",
                            choices: [
                                "Never",
                                "Rarely",
                                "Sometimes",
                                "Often",
                                "Very Often",
                            ],
                            //isRequired: true,
                        },
                        {
                            type: "radiogroup",
                            name: "question_18",
                            title: "18. How often do you interrupt others when they are busy?",
                            choices: [
                                "Never",
                                "Rarely",
                                "Sometimes",
                                "Often",
                                "Very Often",
                            ],
                            //isRequired: true,
                        },
                    ],
                },
            ],
        },
        {
            name: "anxiety_assessment",
            title: "Generalized Anxiety Disorder (GAD-7) Assessment",
            elements: [
                {
                    type: "matrix",
                    name: "gad7_questions",
                    title: "Over the last 2 weeks, how often have you been bothered by any of the following problems?",
                    //isRequired: true,
                    columns: [
                        { value: 0, text: "Not at all" },
                        { value: 1, text: "Several days" },
                        { value: 2, text: "More than half the days" },
                        { value: 3, text: "Nearly every day" },
                    ],
                    rows: [
                        "Feeling nervous, anxious, or on edge",
                        "Not being able to stop or control worrying",
                        "Worrying too much about different things",
                        "Trouble relaxing",
                        "Being so restless that it's hard to sit still",
                        "Becoming easily annoyed or irritable",
                        "Feeling afraid as if something awful might happen",
                    ],
                },
                {
                    type: "radiogroup",
                    name: "gad7_difficulty",
                    title: "If you checked off any problems, how difficult have these made it for you to do your work, take care of things at home, or get along with other people?",
                    choices: [
                        "Not difficult at all",
                        "Somewhat difficult",
                        "Very difficult",
                        "Extremely difficult",
                    ],
                },
            ],
        },
        {
            name: "phq9_assessment",
            title: "Patient Health Questionnaire (PHQ-9)",
            elements: [
                {
                    type: "matrix",
                    name: "phq9_questions",
                    title: "Over the last 2 weeks, how often have you been bothered by any of the following problems?",
                    //isRequired: true,
                    columns: [
                        { value: 0, text: "Not at all" },
                        { value: 1, text: "Several days" },
                        { value: 2, text: "More than half the days" },
                        { value: 3, text: "Nearly every day" },
                    ],
                    rows: [
                        "Little interest or pleasure in doing things",
                        "Feeling down, depressed, or hopeless",
                        "Trouble falling or staying asleep, or sleeping too much",
                        "Feeling tired or having little energy",
                        "Poor appetite or overeating",
                        "Feeling bad about yourself – or that you are a failure or have let yourself or your family down",
                        "Trouble concentrating on things, such as reading the newspaper or watching television",
                        "Moving or speaking so slowly that other people could have noticed? Or the opposite – being so fidgety or restless that you have been moving around a lot more than usual",
                        "Thoughts that you would be better off dead or of hurting yourself in some way",
                    ],
                },
                {
                    type: "radiogroup",
                    name: "phq9_difficulty",
                    title: "If you checked off any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?",
                    choices: [
                        "Not difficult at all",
                        "Somewhat difficult",
                        "Very difficult",
                        "Extremely difficult",
                    ],
                },
                {
                    type: "html",
                    name: "phq_9_source",
                    html: "<strong>Developed by Drs. Robert L. Spitzer, Janet B.W. Williams, Kurt Kroenke and colleagues, with an educational grant from Pfizer Inc. No permission required to reproduce, translate, display or distribute.</strong>",
                },
            ],
        },
        {
            name: "drug_screening_questionnaire",
            title: "Drug Screening Questionnaire (DAST)",
            elements: [
                {
                    type: "checkbox",
                    name: "drugs_used",
                    title: "Which recreational drugs have you used in the past year? (Check all that apply)",
                    choices: [
                        "methamphetamines (speed, crystal)",
                        "cocaine",
                        "cannabis (marijuana, pot)",
                        "narcotics (heroin, oxycodone, methadone, etc.)",
                        "inhalants (paint thinner, aerosol, glue)",
                        "hallucinogens (LSD, mushrooms)",
                        "tranquilizers (valium)",
                        "other",
                    ],
                },
                {
                    type: "radiogroup",
                    name: "drug_use_frequency",
                    title: "How often have you used these drugs?",
                    choices: [
                        "Monthly or less",
                        "Weekly",
                        "Daily or almost daily",
                    ],
                },
                {
                    type: "matrix",
                    name: "dast_questions",
                    title: "Please answer the following questions:",
                    //isRequired: true,
                    columns: ["No", "Yes"],
                    rows: [
                        "Have you used drugs other than those required for medical reasons?",
                        "Do you abuse (use) more than one drug at a time?",
                        "Are you unable to stop using drugs when you want to?",
                        "Have you ever had blackouts or flashbacks as a result of drug use?",
                        "Do you ever feel bad or guilty about your drug use?",
                        "Does your spouse (or parents) ever complain about your involvement with drugs?",
                        "Have you neglected your family because of your use of drugs?",
                        "Have you engaged in illegal activities in order to obtain drugs?",
                        "Have you ever experienced withdrawal symptoms (felt sick) when you stopped taking drugs?",
                        "Have you had medical problems as a result of your drug use (e.g. memory loss, hepatitis, convulsions, bleeding)?",
                    ],
                },
                {
                    type: "radiogroup",
                    name: "inject_drugs",
                    title: "Do you inject drugs?",
                    //isRequired: true,
                    choices: ["No", "Yes"],
                },
                {
                    type: "radiogroup",
                    name: "treatment_history",
                    title: "Have you ever been in treatment for a drug problem?",
                    //isRequired: true,
                    choices: ["No", "Yes"],
                },
                {
                    type: "html",
                    name: "dast_scoring",
                    html: `<article style="font-family: Arial, sans-serif; color: #494949; line-height: 1.6; max-width: 800px; margin: 20px auto; background-color: #fff; border-radius: 10px; box-shadow: 0 0 20px rgba(12, 60, 96, 0.1); padding: 40px;">
    <h1 style="color: #0C3C60; text-align: center;">Scoring and Interpreting the DAST</h1>
    
    <details style="margin-bottom: 20px; background-color: #D1E0EB; border-radius: 5px; padding: 15px;">
        <summary style="cursor: pointer; font-weight: bold; color: #0C3C60;">Scoring Instructions</summary>
        <ol style="margin-top: 10px;">
            <li>"Yes" responses are one point, "No" responses are zero points. All response scores are added for a total score.</li>
            <li>The total score correlates with a zone of use, which can be circled on the bottom right corner.</li>
        </ol>
    </details>

    <div style="background-color: #D1E0EB; border-radius: 5px; padding: 15px; margin-bottom: 20px;">
        <h2 style="color: #0C3C60;">Interpretation Guide</h2>
        <ul style="list-style-type: none; padding: 0;">
            <li style="margin-bottom: 15px;"><strong>0 I – Low Risk:</strong> "Someone at this level is not currently using drugs and is at low risk for health or social complications." <br><em>Action:</em> Reinforce positive choices and educate about risks of drug use</li>
            <li style="margin-bottom: 15px;"><strong>1-2 II – Risky:</strong> "Someone using drugs at this level may develop health problems or existing problems may worsen." <br><em>Action:</em> Brief Intervention to reduce or abstain from use</li>
            <li style="margin-bottom: 15px;"><strong>3-5 III – Harmful:</strong> "Someone using drugs at this level has experienced negative effects from drug use." <br><em>Action:</em> Brief Intervention to reduce use and specific follow-up appointment (Brief Treatment if available)</li>
            <li style="margin-bottom: 15px;"><strong>6-10 IV – Severe:</strong> "Someone using drugs at this level could benefit from more assessment and assistance." <br><em>Action:</em> Brief Intervention to accept referral to specialty treatment for a full assessment</li>
        </ul>
    </div>

    <div style="background-color: #D1E0EB; border-radius: 5px; padding: 15px; margin-bottom: 20px;">
        <h2 style="color: #0C3C60;">Intervention Descriptions</h2>
        <p><strong>Positive Health Message:</strong> Reinforce positive choices and educate about risks of drug use</p>
        <p><strong>Brief Intervention to Reduce Use or Abstain from Using:</strong> Patient-centered discussion that employs Motivational Interviewing concepts to raise an individual's awareness of his/her drug use and enhance his/her motivation towards behavioral change. Brief interventions are 5-15 minutes, and should occur in the same session as the initial screening. The recommended behavior change is to decrease or abstain from use.</p>
        <p><strong>Brief intervention to Reduce or Abstain (Brief Treatment if available) & Follow-up:</strong> Patients with numerous or serious negative consequences from their drug use, or patients who likely have a substance use disorder who cannot or are not willing to obtain specialized treatment, should receive more numerous and intensive interventions with follow up. The recommended behavior change is to abstain from use. Brief treatment is 1 to 5 sessions, each 15-60 minutes. Refer for brief treatment if available. If brief treatment is not available, secure follow-up in 2-4 weeks.</p>
        <p><strong>Brief Intervention to Accept Referral:</strong> The focus of the brief intervention is to enhance motivation for the patient to accept a referral to specialty treatment. If accepted, the provider should use a proactive process to facilitate access to specialty substance use disorder treatment for diagnostic assessment and, if warranted, treatment. The recommended behavior change is to abstain from use and accept the referral.</p>
    </div>

    <p style="font-style: italic; text-align: center;"><strong>More resources: <a href="http://www.sbirtoregon.org" style="color: #1FABC7; text-decoration: none;">www.sbirtoregon.org</a></strong></p>
    
    <p style="font-size: 0.9em; text-align: center;"><strong>Source:</strong> Gavin, D. R., Ross, H. E., and Skinner, H. A. Diagnostic validity of the DAST in the assessment of DSM-III drug disorders. British Journal of Addiction, 84, 301-307. 1989.</p>
</article>`,
                },
            ],
        },
        {
            name: "consent_release_information_42CFR",
            title: "Consent for the Release of Information under 42 C.F.R. PART 2",
            elements: [
                {
                    type: "text",
                    name: "patient_name_42CFR",
                    title: "I, (Name of patient)",
                    //isRequired: true,
                },
                {
                    type: "text",
                    name: "provider_name_42CFR",
                    title: "authorize (Name of provider)",
                    //isRequired: true,
                },
                {
                    type: "checkbox",
                    name: "information_to_disclose",
                    title: "Information to be disclosed (check all that apply):",
                    //isRequired: true,
                    choices: [
                        "All my substance use disorder records",
                        "Attendance",
                        "Toxicology Results",
                        "Medication(s)/dosing",
                        "Assessments",
                        "Progress in Treatment",
                        "Treatment plan",
                        "Lab results",
                        "Appointments",
                        "Diagnostic information",
                        "Insurance info/demographics",
                        "Discharge Summary",
                        "Substance Use History",
                        "Trauma History Summary",
                    ],
                    hasOther: true,
                    otherText: "Other (please specify)",
                },
                {
                    type: "text",
                    name: "disclose_to",
                    title: "To: (Name of person or organization to which disclosure is to be made)",
                    //isRequired: true,
                },
                {
                    type: "text",
                    name: "disclose_to_phone",
                    title: "Phone:",
                    inputType: "tel",
                },
                {
                    type: "text",
                    name: "disclose_to_fax",
                    title: "Fax:",
                    inputType: "tel",
                },
                {
                    type: "checkbox",
                    name: "purpose_of_disclosure",
                    title: "Purpose of disclosure:",
                    //isRequired: true,
                    choices: [
                        "Continuity of Care",
                        "Coordinating Treatment",
                        "Payment/benefits administration",
                    ],
                    hasOther: true,
                    otherText: "Other (please specify)",
                },
                {
                    type: "radiogroup",
                    name: "expiration",
                    title: "This consent will terminate:",
                    //isRequired: true,
                    choices: [
                        "In one year from the date of signature OR 90 days after discharge (whichever comes first)",
                        "Upon a specific date, event, or condition as listed here:",
                    ],
                },
                {
                    type: "text",
                    name: "specific_expiration",
                    title: "Specific date, event, or condition:",
                    visibleIf:
                        "{expiration} = 'Upon a specific date, event, or condition as listed here:'",
                },
                {
                    type: "signaturepad",
                    name: "patient_signature_42CFR",
                    title: "Patient's Signature:",
                    //isRequired: true,
                },
                {
                    type: "text",
                    name: "signature_date_42CFR",
                    title: "Date:",
                    inputType: "date",
                    //isRequired: true,
                },
                {
                    type: "text",
                    name: "patient_name_printed_42CFR",
                    title: "Print Name:",
                    //isRequired: true,
                },
                {
                    type: "text",
                    name: "patient_dob_42CFR",
                    title: "Date of Birth (MM/DD/YY):",
                    inputType: "date",
                    //isRequired: true,
                },
                {
                    type: "html",
                    name: "notice_of_federal_requirements",
                    html: `<article style="font-family: Arial, sans-serif; color: #494949; line-height: 1.6; max-width: 800px; margin: 20px auto; background-color: #fff; border-radius: 10px; box-shadow: 0 0 20px rgba(12, 60, 96, 0.1); padding: 40px;">
    <h1 style="color: #0C3C60; text-align: center;">Notice of Federal Requirements Regarding the Confidentiality of Substance Use Disorder Patient Information</h1>
    
    <p style="background-color: #D1E0EB; border-radius: 5px; padding: 15px; margin-bottom: 20px;"><strong>The confidentiality of substance use disorder patient records maintained by this program is protected by federal law and regulations. Generally, the program may not say to a person outside the program that a patient attends the program, or disclose any information identifying a patient as an alcohol or drug abuser unless:</strong></p>
    
    <ul style="list-style-type: none; padding: 0;">
        <li style="background-color: #D1E0EB; border-radius: 5px; padding: 15px; margin-bottom: 10px;">The patient consents in writing; or</li>
        <li style="background-color: #D1E0EB; border-radius: 5px; padding: 15px; margin-bottom: 10px;">The disclosure is allowed by a court order accompanied by a subpoena; or</li>
        <li style="background-color: #D1E0EB; border-radius: 5px; padding: 15px; margin-bottom: 10px;">The disclosure is made to medical personnel in a medical emergency or to qualified personnel for research, audit, or program evaluation; or</li>
        <li style="background-color: #D1E0EB; border-radius: 5px; padding: 15px; margin-bottom: 10px;">The patient commits or threatens to commit a crime either at the program or against any person who works for the program.</li>
    </ul>
    
    <p style="background-color: #D1E0EB; border-radius: 5px; padding: 15px; margin-bottom: 20px;"><strong>Violation of federal law and regulations by a program is a crime. Suspected violations may be reported to the United States Attorney in the district where the violation occurs.</strong></p>
    
    <p style="background-color: #D1E0EB; border-radius: 5px; padding: 15px; margin-bottom: 20px;"><strong>Federal law and regulations do not protect any information about suspected child abuse or neglect from being reported under state law to appropriate state or local authorities.</strong></p>
    
    <p style="background-color: #D1E0EB; border-radius: 5px; padding: 15px; margin-bottom: 20px;"><strong>The releases of information will remain active and valid for one year from the date of signature OR until 90 days after discharge (whichever comes first) OR until a specific date, event, or condition as listed on the form.</strong></p>
    
    <p style="background-color: #D1E0EB; border-radius: 5px; padding: 15px; margin-bottom: 20px;"><strong>There are two ways to revoke a release of information:</strong></p>
    <ol style="background-color: #D1E0EB; border-radius: 5px; padding: 15px 15px 15px 35px; margin-bottom: 20px;">
        <li>Come in to the Four Square Clinicals facility where you were scheduled to receive treatment and sign the revocation, or</li>
        <li>Fax in a written statement with your name, signature, date and release(s) you would like to be revoked.</li>
    </ol>
    
    <p style="font-size: 0.9em; font-style: italic; text-align: center;">(See 42 U.S.C. §290dd-2 for federal law and 42 C.F.R. Part 2 for federal regulations governing Confidentiality of Substance Use Disorder Patient Records.)</p>
</article>`,
                },
            ],
        },
        {
            name: "pcl_m_info",
            title: "PCL-M Information",
            elements: [
                {
                    type: "html",
                    name: "ptsd_scoring",
                    html: `<article style="font-family: Arial, sans-serif; color: #494949; line-height: 1.6; max-width: 800px; margin: 20px auto; background-color: #fff; border-radius: 10px; box-shadow: 0 0 20px rgba(12, 60, 96, 0.1); padding: 40px;">
    <h1 style="color: #0C3C60;">PCL (PTSD Checklist) Scoring Instructions</h1>
    
    <section style="background-color: #D1E0EB; border-radius: 5px; padding: 20px; margin-bottom: 20px; transition: all 0.3s ease;">
        <h2 style="color: #0C3C60;">Overview</h2>
        <p><strong>The PCL is a standardized self-report rating scale for PTSD comprising 17 items that correspond to the key symptoms of PTSD. Two versions of the PCL exist:</strong></p>
        <ol>
            <li>PCL-M is specific to PTSD caused by military experiences</li>
            <li>PCL-C is applied generally to any traumatic event</li>
        </ol>
        <p><strong>The PCL can be easily modified to fit specific time frames or events. For example, instead of asking about "the past month," questions may ask about "the past week" or be modified to focus on events specific to a deployment.</strong></p>
    </section>

    <section style="background-color: #D1E0EB; border-radius: 5px; padding: 20px; margin-bottom: 20px; transition: all 0.3s ease;">
        <h2 style="color: #0C3C60;">How is the PCL completed?</h2>
        <ul>
            <li>The PCL is self-administered</li>
            <li>Respondents indicate how much they have been bothered by a symptom over the past month using a 5-point (1–5) scale, circling their responses. Responses range from 1 Not at All – 5 Extremely</li>
        </ul>
    </section>

    <section style="background-color: #D1E0EB; border-radius: 5px; padding: 20px; margin-bottom: 20px; transition: all 0.3s ease;">
        <h2 style="color: #0C3C60;">How is the PCL Scored?</h2>
        <ol>
            <li>Add up all items for a total severity score</li>
            <li>Treat response categories 3–5 (Moderately or above) as symptomatic and responses 1–2 (below Moderately) as non-symptomatic, then use the following DSM criteria for a diagnosis:</li>
        </ol>
        <ul>
            <li>Symptomatic response to at least 1 "B" item (Questions 1–5),</li>
            <li>Symptomatic response to at least 3 "C" items (Questions 6–12), and</li>
            <li>Symptomatic response to at least 2 "D" items (Questions 13–17)</li>
        </ul>
    </section>

    <section style="background-color: #D1E0EB; border-radius: 5px; padding: 20px; margin-bottom: 20px; transition: all 0.3s ease;">
        <h2 style="color: #0C3C60;">Validity and Reliability</h2>
        <p><strong>Two studies of both Vietnam and Persian Gulf theater veterans show that the PCL is both valid and reliable (Additional references are available from the DHCC)</strong></p>
    </section>

    <section style="background-color: #D1E0EB; border-radius: 5px; padding: 20px; margin-bottom: 20px; transition: all 0.3s ease;">
        <h2 style="color: #0C3C60;">Follow-up</h2>
        <ul>
            <li>All military health system beneficiaries with health concerns they believe are deployment-related are encouraged to seek medical care</li>
            <li>Patients should be asked, "Is your health concern today related to a deployment?" during all primary care visits.</li>
            <li>If the patient replies "yes," the provider should follow the Post-Deployment Health Clinical Practice Guideline (PDH-CPG) and supporting guidelines available through the DHCC and www.PDHealth.mil</li>
        </ul>
    </section>

    <p style="font-style: italic; text-align: center; margin-top: 20px; font-size: 0.9em; color: #1FABC7;"><strong>Source:</strong> PCL-M for DSM-IV (11/1/94) Weathers, Litz, Huska, & Keane National Center for PTSD - Behavioral Science Division</p>
    <p style="font-style: italic; text-align: center; margin-top: 10px; font-size: 0.9em; color: #1FABC7;"><strong>This is a Government document in the public domain.</strong></p>
</article>`,
                },
            ],
        },
        {
            name: "ptsd_checklist_civilian",
            title: "PTSD CheckList – Civilian Version (PCL-C)",
            elements: [
                {
                    type: "matrix",
                    name: "pcl_c_questions",
                    title: "Below is a list of problems and complaints that people sometimes have in response to stressful life experiences. Please read each one carefully, then select one of the answers to indicate how much you have been bothered by that problem in the last month.",
                    //isRequired: true,
                    columns: [
                        { value: 1, text: "Not at all" },
                        { value: 2, text: "A little bit" },
                        { value: 3, text: "Moderately" },
                        { value: 4, text: "Quite a bit" },
                        { value: 5, text: "Extremely" },
                    ],
                    rows: [
                        "Repeated, disturbing memories, thoughts, or images of a stressful experience from the past?",
                        "Repeated, disturbing dreams of a stressful experience from the past?",
                        "Suddenly acting or feeling as if a stressful experience were happening again (as if you were reliving it)?",
                        "Feeling very upset when something reminded you of a stressful experience from the past?",
                        "Having physical reactions (e.g., heart pounding, trouble breathing, or sweating) when something reminded you of a stressful experience from the past?",
                        "Avoid thinking about or talking about a stressful experience from the past or avoid having feelings related to it?",
                        "Avoid activities or situations because they remind you of a stressful experience from the past?",
                        "Trouble remembering important parts of a stressful experience from the past?",
                        "Loss of interest in things that you used to enjoy?",
                        "Feeling distant or cut off from other people?",
                        "Feeling emotionally numb or being unable to have loving feelings for those close to you?",
                        "Feeling as if your future will somehow be cut short?",
                        "Trouble falling or staying asleep?",
                        "Feeling irritable or having angry outbursts?",
                        "Having difficulty concentrating?",
                        "Being 'super alert' or watchful on guard?",
                        "Feeling jumpy or easily startled?",
                    ],
                },
            ],
        },
        {
            name: "ptsd_checklist_military",
            title: "PTSD CheckList – Military Version (PCL-M)",
            elements: [
                {
                    type: "matrix",
                    name: "pcl_m_questions",
                    title: "Below is a list of problems and complaints that veterans sometimes have in response to stressful military experiences. Please read each one carefully, then select one of the answers to indicate how much you have been bothered by that problem in the last month.",
                    //isRequired: true,
                    columns: [
                        { value: 1, text: "Not at all" },
                        { value: 2, text: "A little bit" },
                        { value: 3, text: "Moderately" },
                        { value: 4, text: "Quite a bit" },
                        { value: 5, text: "Extremely" },
                    ],
                    rows: [
                        "Repeated, disturbing memories, thoughts, or images of a stressful military experience from the past?",
                        "Repeated, disturbing dreams of a stressful military experience from the past?",
                        "Suddenly acting or feeling as if a stressful military experience were happening again (as if you were reliving it)?",
                        "Feeling very upset when something reminded you of a stressful military experience from the past?",
                        "Having physical reactions (e.g., heart pounding, trouble breathing, or sweating) when something reminded you of a stressful military experience from the past?",
                        "Avoid thinking about or talking about a stressful military experience from the past or avoid having feelings related to it?",
                        "Avoid activities or situations because they remind you of a stressful military experience from the past?",
                        "Trouble remembering important parts of a stressful military experience from the past?",
                        "Loss of interest in things that you used to enjoy?",
                        "Feeling distant or cut off from other people?",
                        "Feeling emotionally numb or being unable to have loving feelings for those close to you?",
                        "Feeling as if your future will somehow be cut short?",
                        "Trouble falling or staying asleep?",
                        "Feeling irritable or having angry outbursts?",
                        "Having difficulty concentrating?",
                        "Being 'super alert' or watchful on guard?",
                        "Feeling jumpy or easily startled?",
                    ],
                },
            ],
        },
        {
            name: "cage_info",
            title: "CAGE Questionnaire Information",
            elements: [
                {
                    type: "html",
                    name: "cage_scoring",
                    html: `<article style="font-family: Arial, sans-serif; color: #494949; line-height: 1.6; max-width: 800px; margin: 20px auto; background-color: #fff; border-radius: 10px; box-shadow: 0 0 20px rgba(12, 60, 96, 0.1); padding: 40px;">
    <h1 style="color: #0C3C60;">CAGE Questionnaire Scoring Information</h1>
    
    <section style="background-color: #D1E0EB; border-radius: 5px; padding: 20px; margin-bottom: 20px; transition: all 0.3s ease;">
        <h2 style="color: #0C3C60;">Scoring</h2>
        <p><strong>Item responses on the CAGE are scored 0 or 1, with a higher score an indication of alcohol problems. A total score of 2 or greater is considered clinically significant.</strong></p>
    </section>

    <section style="background-color: #D1E0EB; border-radius: 5px; padding: 20px; margin-bottom: 20px; transition: all 0.3s ease;">
        <h2 style="color: #0C3C60;">About CAGE</h2>
        <p><strong>Developed by Dr. John Ewing, founding Director of the Bowles Center for Alcohol Studies, University of North Carolina at Chapel Hill, CAGE is an internationally used assessment instrument for identifying alcoholics. It is particularly popular with primary care givers. CAGE has been translated into several languages.</strong></p>
    </section>

    <section style="background-color: #D1E0EB; border-radius: 5px; padding: 20px; margin-bottom: 20px; transition: all 0.3s ease;">
        <h2 style="color: #0C3C60;">Clinical Use</h2>
        <p><strong>The CAGE questions can be used in the clinical setting using informal phrasing. It has been demonstrated that they are most effective when used as part of a general health history and should NOT be preceded by questions about how much or how frequently the patient drinks (see "Alcoholism: The Keys to the CAGE" by DL Steinweg and H Worth; American Journal of Medicine 94: 520-523, May 1993.</strong></p>
    </section>

    <section style="background-color: #D1E0EB; border-radius: 5px; padding: 20px; margin-bottom: 20px; transition: all 0.3s ease;">
        <h2 style="color: #0C3C60;">Research Use</h2>
        <p><strong>The exact wording that can be used in research studies can be found in: JA Ewing "Detecting Alcoholism: The CAGE Questionnaire" JAMA 252: 1905-1907, 1984. Researchers and clinicians who are publishing studies using the CAGE Questionnaire should cite the above reference. No other permission is necessary unless it is used in any profit-making endeavor in which case this Center would require to negotiate a payment.</strong></p>
    </section>

    <div style="font-style: italic; text-align: center; margin-top: 20px; font-size: 0.9em; color: #1FABC7;">
        <p><strong>Source:</strong> Dr. John Ewing, founding Director of the Bowles Center for Alcohol Studies, University of North Carolina at Chapel Hill</p>
        <p><strong>012695 (02-2004)</strong></p>
        <p><strong>To reorder, call 1-877-638-7827</strong></p>
    </div>
</article>`,
                },
            ],
        },
        {
            name: "cage_questionnaire",
            title: "CAGE Questionnaire",
            elements: [
                {
                    type: "radiogroup",
                    name: "cage_cut_down",
                    title: "Have you ever felt you should Cut down on your drinking?",
                    //isRequired: true,
                    choices: ["Yes", "No"],
                },
                {
                    type: "radiogroup",
                    name: "cage_annoyed",
                    title: "Have people Annoyed you by criticizing your drinking?",
                    //isRequired: true,
                    choices: ["Yes", "No"],
                },
                {
                    type: "radiogroup",
                    name: "cage_guilty",
                    title: "Have you ever felt bad or Guilty about your drinking?",
                    //isRequired: true,
                    choices: ["Yes", "No"],
                },
                {
                    type: "radiogroup",
                    name: "cage_eye_opener",
                    title: "Have you ever had a drink first thing in the morning to steady your nerves or to get rid of a hangover (Eye opener)?",
                    //isRequired: true,
                    choices: ["Yes", "No"],
                },
            ],
        },
        {
            name: "medical_history",
            title: "Past Medical History",
            elements: [
                {
                    type: "checkbox",
                    name: "medical_conditions",
                    title: "Medical Conditions",
                    choices: [
                        "Circulation Problem",
                        "Diabetes",
                        "Heart Disease",
                        "High Blood Pressure",
                        "Palpitations",
                        "Stroke",
                        "Fibromyalgia",
                        "Cancer",
                    ],
                    hasOther: true,
                    otherText: "Other medical conditions or concerns",
                },
                {
                    type: "checkbox",
                    name: "neurovascular",
                    title: "Neurovascular",
                    choices: ["Aneurysm with clipping", "Shunts/Implants"],
                },
                {
                    type: "checkbox",
                    name: "neurological_psychological",
                    title: "Neurological/Psychological",
                    choices: [
                        "Addiction",
                        "Anxiety",
                        "Brain Fog",
                        "Depression",
                        "Dizziness",
                        "Fainting",
                        "Headaches",
                        "Memory Problems",
                        "Vertigo",
                    ],
                },
                {
                    type: "checkbox",
                    name: "pain",
                    title: "Pain",
                    choices: [
                        "Arthritis",
                        "Ankle",
                        "Chest",
                        "Hip",
                        "Knee",
                        "Leg",
                        "Lower Back",
                        "Mid Back",
                        "Neck",
                        "Wrist/Hand",
                    ],
                },
                {
                    type: "checkbox",
                    name: "hearing",
                    title: "Hearing",
                    choices: ["Hearing Loss", "Tinnitus (Ringing in the ears)"],
                },
                {
                    type: "checkbox",
                    name: "sleep",
                    title: "Sleep",
                    choices: ["Insomnia", "Sleep Apnea"],
                },
                {
                    type: "text",
                    name: "cancer_type",
                    title: "If you selected Cancer, please specify the type:",
                    visibleIf: "{medical_conditions} contains 'Cancer'",
                },
                {
                    type: "text",
                    name: "cancer_status",
                    title: "Cancer Status:",
                    visibleIf: "{medical_conditions} contains 'Cancer'",
                },
            ],
        },
        {
            name: "current_medications",
            title: "Current Medications",
            elements: [
                {
                    type: "checkbox",
                    name: "no_current_medications",
                    title: "No current medications",
                    choices: ["I am not currently taking any medications"],
                },
                {
                    type: "paneldynamic",
                    name: "medications",
                    title: "Medications",
                    templateElements: [
                        {
                            type: "text",
                            name: "medication_name",
                            title: "Medication Name",
                            //isRequired: true,
                        },
                        {
                            type: "text",
                            name: "dose",
                            title: "Dose",
                            //isRequired: true,
                        },
                        {
                            type: "text",
                            name: "frequency",
                            title: "Frequency",
                            //isRequired: true,
                        },
                    ],
                    panelCount: 1,
                    panelAddText: "Add medication",
                    panelRemoveText: "Remove medication",
                    visibleIf: "{no_current_medications} empty",
                },
            ],
        },
        {
            name: "current_allergies",
            title: "Current Allergies",
            elements: [
                {
                    type: "checkbox",
                    name: "no_known_drug_allergies",
                    title: "No Known Drug Allergies",
                    choices: ["I have no known drug allergies"],
                },
                {
                    type: "paneldynamic",
                    name: "allergies",
                    title: "Allergies",
                    templateElements: [
                        {
                            type: "text",
                            name: "allergy_name",
                            title: "Allergy Name",
                            //isRequired: true,
                        },
                        {
                            type: "text",
                            name: "reaction",
                            title: "Reaction",
                            //isRequired: true,
                        },
                    ],
                    panelCount: 1,
                    panelAddText: "Add allergy",
                    panelRemoveText: "Remove allergy",
                    visibleIf: "{no_known_drug_allergies} empty",
                },
            ],
        },
        {
            name: "past_surgical_history",
            title: "Past Surgical History",
            elements: [
                {
                    type: "checkbox",
                    name: "no_surgeries",
                    title: "Check if you have NEVER had any surgical procedures performed",
                    choices: [
                        "I have NEVER had any surgical procedures performed",
                    ],
                },
                {
                    type: "paneldynamic",
                    name: "surgeries",
                    title: "Surgical Procedures",
                    templateElements: [
                        {
                            type: "text",
                            name: "surgery_name",
                            title: "Surgical Procedure",
                            //isRequired: true,
                        },
                        {
                            type: "text",
                            name: "surgery_date",
                            title: "Date",
                            inputType: "date",
                            //isRequired: true,
                        },
                    ],
                    panelCount: 1,
                    panelAddText: "Add surgical procedure",
                    panelRemoveText: "Remove surgical procedure",
                    visibleIf: "{no_surgeries} empty",
                },
            ],
        },
        {
            name: "family_history",
            title: "Family History",
            elements: [
                {
                    type: "checkbox",
                    name: "family_conditions",
                    title: "Medical Conditions in Family",
                    choices: [
                        "No Family History",
                        "Arthritis",
                        "Osteoporosis",
                        "Headaches/migraines",
                        "Dementia",
                        "Liver problems",
                        "Diabetes",
                        "Seizures",
                        "Kidney Problems",
                        "Cancer",
                        "Mental Health Condition(s)",
                        "Substance Use",
                        "Fibromyalgia",
                        "Headaches",
                    ],
                    hasOther: true,
                    otherText: "Other family medical conditions or concerns",
                },
                {
                    type: "text",
                    name: "cancer_type_family",
                    title: "If Cancer was selected, please specify the type:",
                    visibleIf: "{family_conditions} contains 'Cancer'",
                },
                {
                    type: "text",
                    name: "cancer_status_family",
                    title: "Cancer Status in Family:",
                    visibleIf: "{family_conditions} contains 'Cancer'",
                },
                {
                    type: "text",
                    name: "mental_health_type_family",
                    title: "If Mental Health Condition(s) was selected, please specify the type:",
                    visibleIf:
                        "{family_conditions} contains 'Mental Health Condition(s)'",
                },
                {
                    type: "text",
                    name: "mental_health_status_family",
                    title: "Mental Health Condition(s) Status in Family:",
                    visibleIf:
                        "{family_conditions} contains 'Mental Health Condition(s)'",
                },
                {
                    type: "text",
                    name: "substance_use_type_family",
                    title: "If Substance Use was selected, please specify the type:",
                    visibleIf: "{family_conditions} contains 'Substance Use'",
                },
                {
                    type: "text",
                    name: "substance_use_status_family",
                    title: "Substance Use Status in Family:",
                    visibleIf: "{family_conditions} contains 'Substance Use'",
                },
            ],
        },
        {
            name: "authorization_and_consent",
            title: "Authorization and Consent Forms",
            elements: [
                {
                    type: "html",
                    name: "authorization_to_bill_insurance",
                    html: `
        <h3>AUTHORIZATION TO BILL INSURANCE</h3>
        <strong>I, <input type="text" id="patient_name" name="patient_name" required>, hereby authorize insurance payment directly to Four Square Clinicals
        and the provider responsible for my care. I understand that I am financially responsible to my healthcare
        provider for all fees incurred and for fees not covered by my insurance plan. I authorize the release of my
        medical information to my third-party payor in order to obtain payment for services provided. I further
        authorize the healthcare provider to release any medical information required for my examination or
        treatment. I understand that payment in full is expected at the time services are rendered unless other
        arrangements have been made in the form of payment plan or financial assistance.</strong>
      `,
                },
                {
                    type: "html",
                    name: "patient_financial_agreement",
                    html: `
        <h3>PATIENT FINANCIAL AGREEMENT</h3>
        <strong>Patients, or Responsible Party, are required to pay their co-pay and deductible at time of service.</strong>
        <strong>I understand that services rendered by Four Square Clinicals, and Four Square Clinicals Providers are the
        patient/responsible parties' responsibility, and that the Provider will bill the patient's insurance company,
        as a courtesy, and that it is the responsibility of the patient/responsible party to know coverage and
        eligibility benefits and to verify the in or out of network status.</strong>
        <strong>I understand that I am, or my responsible party, is responsible for payment of my bill and there may be
        charges which my insurance may not cover, and which I, or my responsible party, will have to pay. I
        authorize payment of medical benefits directly to Four Square Clinicals.</strong>
        <strong>I understand that there will be a $50 charge for any checks returned for insufficient funds.</strong>
        <strong>I understand in fairness to the other patients that a 24-hour notice is required for cancelling appointments,
        and I may be charged a fee of $25 if not cancelled 24-hours in advance. I also understand that if I do not
        show for my appointments three times that I may be dismissed from the practice.</strong>
        <strong>I understand that should my insurance company send payment to me; I will forward the payment to Four
        Square Clinicals within two business days. I agree that if I fail to send the payment in a timely way and
        the Provider is forced to proceed with the collections process; I, or responsible party, will be responsible
        for any cost and attorney fees incurred by Four Square Clinicals to retrieve their monies.</strong>
        <strong>I understand it is my responsibility to provide accurate insurance information and to immediately report
        any changes in my insurance coverage and/or demographic information.</strong>
        <strong>I understand that it is my responsibility to contact my provider regarding any and all results after any
        testing is performed. I understand and acknowledge that I should request any prescription refills at the
        time of the office visit.</strong>
        <strong>I understand it may take 24-48 hours to refill prescriptions and up to 72 hours for medical records to be
        completed.</strong>
      `,
                },
                {
                    type: "signaturepad",
                    name: "patient_signature",
                    title: "Patient Signature",
                    //isRequired: true,
                },
                {
                    type: "text",
                    name: "signature_date",
                    title: "Date",
                    inputType: "date",
                    //isRequired: true,
                },
                {
                    type: "text",
                    name: "patient_printed_name",
                    title: "Printed Full Name of Patient",
                    //isRequired: true,
                },
                {
                    type: "text",
                    name: "relation_to_patient",
                    title: "Relation to Patient (if not self)",
                },
                {
                    type: "html",
                    name: "benefits_and_risks_of_therapy",
                    html: `
        <h3>BENEFITS AND RISKS OF THERAPY</h3>
        <h3>CONSENT FOR TREATMENT</h3>
        <strong>The majority of individuals who obtain therapy benefit from the process. Success may vary depending on
        the particular problem being addressed. Therapy requires a very active effort on your part. Self-
        exploration, gaining understanding, finding ways for dealing with problems and learning new skills are
        generally quite useful. Some risks do exist, however.</strong>
        <strong>While the benefits of therapy are well known, you may experience unwanted feeling such as unhappiness,
        anger, guilt, or frustration. These are a natural part of the therapy process and often provide the basis for
        change. Important personal decisions are often a result of therapy. These decisions are likely to produce
        new opportunities as well as unique challenges. Sometimes a decision that is positive for one family
        member will be viewed quite negatively by another family member. There are no guarantees: however,
        commitment to the process should assist in a helpful outcome.</strong>
        <strong>Testing/evaluation help us to understand why behavior occurs and may be recommended in your case.
        Initial impressions about treatment plans, suggested procedures and goals should be discussed. Your own
        feelings about whether you are comfortable with the therapist are an important part of the process. You
        should discuss all these issues with your therapist. If you have questions about the services being
        provided at any time during treatment, you should ask for clarification. Your therapist will help you
        secure an appropriate consultation with another mental health professional whenever it is requested.</strong>
        <strong>If a third party such as an insurance company is paying for part of your bill, I am normally required to
        give a diagnosis. I will reveal only the minimal information that is necessary for the purpose of payment
        and will gladly discuss it with you.</strong>
        <strong>I have read and understand about the benefits and risks of therapy, and I hereby give my consent to this
        psychological treatment.</strong>
      `,
                },
                {
                    type: "signaturepad",
                    name: "therapy_consent_signature",
                    title: "Patient Signature (parent if patient is minor)",
                    //isRequired: true,
                },
                {
                    type: "text",
                    name: "therapy_consent_date",
                    title: "Date",
                    inputType: "date",
                    //isRequired: true,
                },
                {
                    type: "text",
                    name: "therapy_consent_printed_name",
                    title: "Patient's Printed Name",
                    //isRequired: true,
                },
                {
                    type: "html",
                    name: "patient_consent_for_treatment",
                    html: `
        <h3>PATIENT CONSENT FOR TREATMENT</h3>
        <strong>I, <input type="text" id="patient_name_treatment" name="patient_name_treatment" required>, voluntarily agree to receive evaluation/mental health treatment,
        evaluation/chemical dependency treatment, and/or evaluation/training-coaching-education services for
        developmental disorders by the staff of FOUR SQUARE CLINICALS. I understand and agree that I will
        participate in my treatment plan, and that I may discontinue treatment and/or withdraw my consent for
        treatment at any time.</strong>
        <strong>I, <input type="text" id="patient_name_treatment2" name="patient_name_treatment2" required>, hereby consent to medical treatment for my present condition or injury as
        documented in my New Patient screening, and any illness or injury that I may incur at any time after the
        date noted below. I have completed this form fully and completely and certify that I am the patient or duly
        authorized general agent of the patient, authorized to furnish the information requested.</strong>
      `,
                },
                {
                    type: "signaturepad",
                    name: "treatment_consent_signature",
                    title: "Signature of Responsible Party",
                    //isRequired: true,
                },
                {
                    type: "text",
                    name: "treatment_consent_date",
                    title: "Date",
                    inputType: "date",
                    //isRequired: true,
                },
                {
                    type: "text",
                    name: "treatment_consent_printed_name",
                    title: "Printed Full Name of Patient",
                    //isRequired: true,
                },
                {
                    type: "text",
                    name: "treatment_consent_relation",
                    title: "Relation to Patient",
                },
            ],
        },
        {
            name: "telehealth_consent",
            title: "Telehealth Consent Form",
            elements: [
                {
                    type: "html",
                    name: "telehealth_consent_info",
                    html: `<article style="font-family: Arial, sans-serif; color: #494949; line-height: 1.6; max-width: 800px; margin: 20px auto; background-color: #fff; border-radius: 10px; box-shadow: 0 0 20px rgba(12, 60, 96, 0.1); padding: 40px;">
    <h1 style="color: #0C3C60; text-align: center;">TELEHEALTH CONSENT FORM</h1>
    
    <p style="font-weight: bold;">By signing this form, I understand and agree to the following:</p>
    
    <section style="background-color: #D1E0EB; border-radius: 5px; padding: 20px; margin-bottom: 20px;">
        <h2 style="color: #0C3C60;">Definition and Purpose</h2>
        <p>Telehealth/Telemedicine involves the use of electronic communications to enable health care providers at different locations to share individual patient medical information for the purpose of improving patient care. Providers may include primary care practitioners, specialists and/or subspecialists, nurse practitioners, registered nurses, medical assistants, and other healthcare providers who are part of FOUR SQUARE CLINICALS clinical care team.</p>
    </section>

    <section style="background-color: #D1E0EB; border-radius: 5px; padding: 20px; margin-bottom: 20px;">
        <h2 style="color: #0C3C60;">Participation and Information Sharing</h2>
        <p>In addition to the members of FOUR SQUARE CLINICALS care team, my family members, caregivers, or other legal representatives or guardians may join and participate on the telehealth/telemedicine service, and I agree to share my personal information with such family members, caregivers, legal representatives, or guardians. The information may be used for diagnosis, therapy, follow-up and/or education.</p>
    </section>

    <section style="background-color: #D1E0EB; border-radius: 5px; padding: 20px; margin-bottom: 20px;">
        <h2 style="color: #0C3C60;">Types of Information Transmitted</h2>
        <p>Telehealth/Telemedicine requires transmission, via Internet or tele-communication device, of health information, which may include:</p>
        <ul>
            <li>Progress reports, assessments, or other intervention-related documents</li>
            <li>Bio-physiological data transmitted electronically</li>
            <li>Videos, pictures, text messages, audio, and any digital form of data</li>
        </ul>
    </section>

    <section style="background-color: #D1E0EB; border-radius: 5px; padding: 20px; margin-bottom: 20px;">
        <h2 style="color: #0C3C60;">Privacy and Confidentiality</h2>
        <p>The laws that protect the privacy and confidentiality of health and care information also apply to telehealth/telemedicine. Information obtained during telehealth/telemedicine that identifies me will not be given to anyone without my consent except for the purposes of treatment, education, billing, and healthcare operations.</p>
    </section>

    <section style="background-color: #D1E0EB; border-radius: 5px; padding: 20px; margin-bottom: 20px;">
        <h2 style="color: #0C3C60;">Consent to Information Sharing</h2>
        <p>By agreeing to use the telehealth/telemedicine services, I am consenting to FOUR SQUARE CLINICALS sharing of my protected health information with certain third parties as more fully described in the FOUR SQUARE CLINICALS Privacy Policy with a few limited exceptions per 42 CFR Part 2:</p>
        <ul>
            <li>Internal communications</li>
            <li>Medical emergencies</li>
            <li>Reports of alleged child abuse or neglect</li>
            <li>Reports of a crime on program premises or against program personnel</li>
            <li>Qualified audits or evaluations of the program</li>
            <li>Research</li>
            <li>Qualified service organization agreement</li>
            <li>Pursuant to a Part 2 – specific court order</li>
        </ul>
    </section>

    <section style="background-color: #D1E0EB; border-radius: 5px; padding: 20px; margin-bottom: 20px;">
        <h2 style="color: #0C3C60;">Security and Risks</h2>
        <p>As with any Internet-based communication, I understand that there is a risk of security breach. Electronic systems used will incorporate network and software security protocols to protect the confidentiality of patient identification and imagining data and will include measures to safeguard the data and to ensure its integrity against intentional or unintentional corruption.</p>
    </section>

    <section style="background-color: #D1E0EB; border-radius: 5px; padding: 20px; margin-bottom: 20px;">
        <h2 style="color: #0C3C60;">Technical Issues</h2>
        <p>Telehealth/telemedicine sessions may not always be possible. Disruptions of signals or problems with the Internet's infrastructure may cause broadcast and reception problems (e.g., poor picture or sound quality, dropped connections, audio interference) that prevent effective interaction between consulting clinician(s), participant, patient, or care team.</p>
    </section>

    <section style="background-color: #D1E0EB; border-radius: 5px; padding: 20px; margin-bottom: 20px;">
        <h2 style="color: #0C3C60;">Limitations and Rights</h2>
        <p>I understand and agree that the health information I provide at the time of my telehealth/telemedicine service may be the only source of health information used by the medical professionals during the course of my evaluation and treatment at the time of my telehealth/telemedicine visit, and that such professionals may not have access to my full medical record or information held at FOUR SQUARE CLINICALS.</p>
        <p>I understand that I will be given information about test(s), treatment(s), and procedure(s), as applicable, including the benefits, risks, possible problems or complications, and alternate choices for my medical care through the telehealth/telemedicine visit.</p>
        <p>I have the right to withhold or withdraw consent to the use of telehealth/telemedicine services at any time and revert back to traditional in-person clinic services. I understand that if I withdraw my consent for telehealth/telemedicine, it will not affect any future services or care benefits to which I am entitled.</p>
    </section>

    <p style="font-style: italic; text-align: center; margin-top: 20px;">All my questions have been answered to my satisfaction.</p>
</article>`,
                },
                {
                    type: "checkbox",
                    name: "telehealth_consent_agreement",
                    title: "I hereby consent to the use of telehealth/telemedicine in the provision of care and the above terms and conditions.",
                    //isRequired: true,
                    choices: ["I agree"],
                },
                {
                    type: "text",
                    name: "telehealth_consent_name",
                    title: "Patient's Printed Name or Patient's Legal Representative",
                    //isRequired: true,
                },
                {
                    type: "signaturepad",
                    name: "telehealth_consent_signature",
                    title: "Signature of Patient or Patient's Legal Representative",
                    //isRequired: true,
                },
                {
                    type: "text",
                    name: "telehealth_consent_date",
                    title: "Date",
                    inputType: "date",
                    //isRequired: true,
                },
                {
                    type: "panel",
                    name: "interpreter_attestation",
                    title: "INTERPRETER'S ATTESTATION (if applicable)",
                    elements: [
                        {
                            type: "text",
                            name: "interpreter_language",
                            title: "I certify that I am fluent in the language of the person providing consent:",
                            //isRequired: false,
                        },
                        {
                            type: "checkbox",
                            name: "interpreter_certification",
                            title: "I certify that I have accurately and completely interpreted the contents of this form, and that the person giving consent has indicated their understanding of the contents.",
                            choices: ["I agree"],
                            //isRequired: false,
                        },
                        {
                            type: "signaturepad",
                            name: "interpreter_signature",
                            title: "Signature of Interpreter",
                            //isRequired: false,
                        },
                        {
                            type: "text",
                            name: "interpreter_date",
                            title: "Date",
                            inputType: "date",
                            //isRequired: false,
                        },
                    ],
                },
            ],
        },
        {
            name: "behavioral_health_confidentiality_limitations",
            title: "BEHAVIORAL HEALTH LIMITATIONS OF CONFIDENTIALITY",
            elements: [
                {
                    type: "html",
                    name: "confidentiality_info",
                    html: `<article style="font-family: Arial, sans-serif; color: #494949; line-height: 1.6; max-width: 800px; margin: 20px auto; background-color: #fff; border-radius: 10px; box-shadow: 0 0 20px rgba(12, 60, 96, 0.1); padding: 40px;">
    <h1 style="color: #0C3C60; text-align: center;">Confidentiality and Consent Information</h1>
    
    <section style="background-color: #D1E0EB; border-radius: 5px; padding: 20px; margin-bottom: 20px;">
        <p><strong>Counseling for psychological, psychiatric or substance abuse issues necessarily involve establishing relationships that are both confidential and professional in nature. What you communicate during the course of treatment is protected by legal, professional and ethical standards. Information gathered in the course of treatment may not be released without your prior written consent except under certain circumstances, as outlined below.</strong></p>
    </section>

    <section style="background-color: #D1E0EB; border-radius: 5px; padding: 20px; margin-bottom: 20px;">
        <h2 style="color: #0C3C60;">Written Consent Requirements</h2>
        <p>Written Consent requires ten elements:</p>
        <ol>
            <li>The names or general designations of the programs making the disclosure</li>
            <li>The name of the individual or organization that will receive the disclosure</li>
            <li>The name of the patient who is the subject of the disclosure</li>
            <li>The specific purpose or need for the disclosure</li>
            <li>A description of how much and what kind of information will be disclosed</li>
            <li>The patient's right to revoke the consent in writing and the exceptions to the right to revoke or, if the exceptions are included in the program's notice, a reference to the notice</li>
            <li>The program's ability to condition treatment, payment, enrollment, or eligibility of benefits on the patient agreeing to sign the consent, by stating 1) the program may not condition these services on the patient signing the consent, or 2) the consequences for the patient refusing to sign the consent</li>
            <li>The date, event, or condition upon which the consent expires if not previously revoked</li>
            <li>The signature of the patient (and/or other authorized person)</li>
            <li>The date on which the consent is assigned</li>
        </ol>
        <p><strong>When used in the criminal justice setting, expiration of the consent may be conditioned upon the completion of, or termination from, a program instead of a date.</strong></p>
        <p><strong>At Four Square Clinicals, communication between your primary care provider and your behavioral health provider is a standard of practice in order to improve both quality of healthcare services and for coordination of your care.</strong></p>
        <p><strong>Both federal and State law have placed specific limits on the confidentiality of the therapeutic relationship.</strong></p>
    </section>

    <section style="background-color: #D1E0EB; border-radius: 5px; padding: 20px; margin-bottom: 20px;">
        <h2 style="color: #0C3C60;">Situations Where Disclosures Are Required</h2>
        <p><strong>According to State law, this counselor and agency has a legal obligation to release information and/or notify the appropriate authorities under the following circumstances:</strong></p>
        <ol>
            <li>If a patient communicates a serious threat of physical violence against a reasonably identifiable victim or victims, including him or herself.</li>
            <li>If a psychiatric service provider/psychologist/therapist knows or reasonably suspects a child is being severely neglected or abused.</li>
            <li>If a psychiatric service provider/psychologist/therapist has reasonable knowledge that a person over the age of 65 or a dependent adult has been physically abused.</li>
            <li>If requested by patient or compelled by court order.</li>
        </ol>
    </section>

    <section style="background-color: #D1E0EB; border-radius: 5px; padding: 20px; margin-bottom: 20px;">
        <h2 style="color: #0C3C60;">Situations With Potential Limitations on Confidentiality</h2>
        <ol>
            <li>If the psychiatric service provider/psychologist/therapist determines, or has reasonable cause to believe, the patient is in a mental or emotional condition that causes him or her to be a danger to him/herself or another person or property of another, and if the disclosure of confidential information is necessary to prevent the threatened danger.</li>
            <li>In case of threatened suicide, the psychiatric service provider/psychologist/therapist has a legal duty to take reasonable steps to prevent it.</li>
            <li>Reasonable suspicion of elder or dependent adult abuse.</li>
            <li>In case of a medical emergency.</li>
        </ol>
    </section>

    <section style="background-color: #D1E0EB; border-radius: 5px; padding: 20px; margin-bottom: 20px;">
        <h2 style="color: #0C3C60;">Confidentiality Limitations in Training Contexts</h2>
        <p><strong>In accordance with State laws and licensing regulations, all counselors who have not yet attained licensure receive individual and group supervision. Therefore, confidentiality will not be maintained during consultation with supervisors and other professional persons hired by the agency for the purpose of staff training.</strong></p>
    </section>
</article>`,
                },
                {
                    type: "checkbox",
                    name: "confidentiality_agreement",
                    title: "I have read this statement and fully understand the contents. I agree to these limits of confidentiality and will not hold the agency staff or the agency liable for any breach of confidentiality under the conditions stated above.",
                    //isRequired: true,
                    choices: ["I agree"],
                },
                {
                    type: "text",
                    name: "confidentiality_expiration",
                    title: "This document expires three years from the date of execution unless previously revoked.",
                    readOnly: true,
                },
                {
                    type: "signaturepad",
                    name: "confidentiality_signature",
                    title: "Signature",
                    //isRequired: true,
                },
                {
                    type: "text",
                    name: "confidentiality_date",
                    title: "Date",
                    inputType: "date",
                    //isRequired: true,
                },
                {
                    type: "text",
                    name: "confidentiality_printed_name",
                    title: "PRINTED FULL NAME OF PATIENT",
                    //isRequired: true,
                },
            ],
        },
        {
            name: "four_square_clinicals_policy_agreement",
            title: "Four Square Clinicals Policy Agreement",
            elements: [
                {
                    type: "html",
                    name: "policy_agreement_info",
                    html: `<article style="font-family: Arial, sans-serif; color: #494949; line-height: 1.6; max-width: 800px; margin: 20px auto; background-color: #fff; border-radius: 10px; box-shadow: 0 0 20px rgba(12, 60, 96, 0.1); padding: 40px;">
    <h1 style="color: #0C3C60; text-align: center;">FOUR SQUARE CLINICALS POLICY AGREEMENT</h1>
    
    <section style="background-color: #D1E0EB; border-radius: 5px; padding: 20px; margin-bottom: 20px;">
        <p><strong>Welcome and thank you for choosing Four Square Clinicals as your Behavioral Health Care Provider. It is our mission to be the community leader in improving the health of the populations in our service area, by providing quality and compassionate care.</strong></p>
        <p><strong>Please read the following information specific to your Behavioral Health visits:</strong></p>
    </section>

    <ul style="list-style-type: none; padding-left: 0;">
        <li style="background-color: #D1E0EB; border-radius: 5px; padding: 15px; margin-bottom: 10px;">
            <strong style="color: #0C3C60;">Appointments:</strong> Length of appointment times are driven by session type and at discretion of your provider. Please be sure to cancel any session with at least 24 hours notice.
        </li>
        <li style="background-color: #D1E0EB; border-radius: 5px; padding: 15px; margin-bottom: 10px;">
            <strong style="color: #0C3C60;">Missed or No-Show Appointments:</strong> Please note that a letter will be sent addressing non-compliance and to schedule an appointment within one week of your missed/cancelled appointment in certain cases.
        </li>
        <li style="background-color: #D1E0EB; border-radius: 5px; padding: 15px; margin-bottom: 10px;">
            <strong style="color: #0C3C60;">Fees:</strong> Four Square Clinicals is a preferred provider on several insurance plans. All insurance information is collected in the New Patient packet and insurance verification will be run and discussed with the patient at their request.
        </li>
        <li style="background-color: #D1E0EB; border-radius: 5px; padding: 15px; margin-bottom: 10px;">
            <strong style="color: #0C3C60;">Limitations of Confidentiality:</strong> Anything discussed in the therapy will be kept confidential, with some exceptions as detailed in the Behavioral Health Limitations of Confidentiality form.
        </li>
        <li style="background-color: #D1E0EB; border-radius: 5px; padding: 15px; margin-bottom: 10px;">
            <strong style="color: #0C3C60;">Emergencies:</strong> You should dial 911 if there is an emergency. For non-emergency crises, you may call the office to request an appointment or use the provided local crisis lines.
        </li>
    </ul>
</article>`,
                },
                {
                    type: "checkbox",
                    name: "policy_agreement",
                    title: "I acknowledge that I have read and understand the above information as well as received a copy of the local 24 hour access and crisis lines.",
                    //isRequired: true,
                    choices: ["I agree"],
                },
                {
                    type: "signaturepad",
                    name: "policy_agreement_signature",
                    title: "Signature",
                    //isRequired: true,
                },
                {
                    type: "text",
                    name: "policy_agreement_date",
                    title: "Date",
                    inputType: "date",
                    //isRequired: true,
                },
                {
                    type: "text",
                    name: "policy_agreement_printed_name",
                    title: "Printed Full Name of Patient",
                    //isRequired: true,
                },
            ],
        },
        {
            name: "patient_rights_acknowledgement",
            title: "FOUR SQUARE CLINICALS PATIENT RIGHTS ACKNOWLEDGEMENT",
            elements: [
                {
                    type: "html",
                    name: "acknowledgement-intro",
                    html: "<strong>By signing this form, I acknowledge understanding and receipt of the following information was given to me during the intake process:</strong>",
                },
                {
                    type: "checkbox",
                    name: "rights-acknowledgement",
                    title: "I acknowledge receipt and understanding of:",
                    //isRequired: true,
                    choices: [
                        {
                            value: "rights",
                            text: "1. My rights and responsibilities",
                        },
                        {
                            value: "opinion",
                            text: "2. How to give my opinion about:",
                        },
                        { value: "goals", text: "a. Goals achieved" },
                        {
                            value: "satisfaction",
                            text: "b. Level of satisfaction",
                        },
                        {
                            value: "expectations",
                            text: "3. What is expected of me",
                        },
                        {
                            value: "hours",
                            text: "4. Hours the Behavioral Program is open for services",
                        },
                        {
                            value: "after-hours",
                            text: "5. How to receive assistance after hours, especially if it's an emergency",
                        },
                        {
                            value: "code-of-conduct",
                            text: "6. A summary of the Professional Code of Conduct of the Organization",
                        },
                        {
                            value: "confidentiality",
                            text: "7. Information of how my information is kept confidential",
                        },
                        {
                            value: "confidentiality-limits",
                            text: "8. Information about the limits of confidentiality and how to file grievance",
                        },
                        {
                            value: "coordinator",
                            text: "9. I have met the person that will be coordinating my services",
                        },
                        {
                            value: "treatment-planning",
                            text: "10. How I will participate in my treatment planning",
                        },
                    ],
                },
                {
                    type: "signaturepad",
                    name: "patient-signature",
                    title: "Patient Signature",
                    //isRequired: true,
                },
                {
                    type: "text",
                    name: "patient-name",
                    title: "Patient Name (printed)",
                    //isRequired: true,
                },
                {
                    type: "text",
                    name: "date",
                    title: "Date",
                    inputType: "date",
                    //isRequired: true,
                },
            ],
            width: "100%",
            minWidth: "256px",
        },
        {
            name: "crisis_hotlines",
            title: "Crisis Hotlines and Support Services",
            elements: [
                {
                    type: "html",
                    name: "local-24-hour",
                    html: `<article style="font-family: Arial, sans-serif; color: #494949; line-height: 1.6; max-width: 800px; margin: 20px auto; background-color: #fff; border-radius: 10px; box-shadow: 0 0 20px rgba(12, 60, 96, 0.1); padding: 40px;">
    <h1 style="color: #0C3C60; text-align: center;">Local 24 Hour Access and Crisis Lines</h1>
    
    <section style="background-color: #D1E0EB; border-radius: 5px; padding: 20px; margin-bottom: 20px;">
        <h2 style="color: #0C3C60;">National Suicide Prevention Life Line</h2>
        <p><strong>Call <a href="tel:1-800-273-8255" style="color: #1FABC7; text-decoration: none;">1-800-273-8255</a></strong></p>
        <p><strong>The Lifeline provides 24/7, free and confidential support for people in distress, prevention and crisis resources for you or your loved ones, and best practices for professionals.</strong></p>
    </section>

    <section style="background-color: #D1E0EB; border-radius: 5px; padding: 20px; margin-bottom: 20px;">
        <h2 style="color: #0C3C60;">Ayuda En Español (Spanish National Suicide Prevention Lifeline)</h2>
        <p><strong>Cuando usted llama al número <a href="tel:1-888-628-9454" style="color: #1FABC7; text-decoration: none;">1-888-628-9454</a>, su llamada se dirige al centro de ayuda de nuestra red disponible más cercano. Cuando el centro contesta su llamada, usted estará hablando con una persona que le escuchará, le hará preguntas y hará todo lo que esté a su alcance para ayudarle.</strong></p>
    </section>

    <section style="background-color: #D1E0EB; border-radius: 5px; padding: 20px; margin-bottom: 20px;">
        <h2 style="color: #0C3C60;">Crisis Text Line</h2>
        <p><strong>Crisis Text Line is free, 24/7 support for those in crisis. Text HOME to 741741 from anywhere in the US to text with a trained Crisis Counselor.</strong></p>
    </section>

    <section style="background-color: #D1E0EB; border-radius: 5px; padding: 20px; margin-bottom: 20px;">
        <h2 style="color: #0C3C60;">Mobile Outreach Safety Team (18 yrs and older)</h2>
        <p><strong>Washoe County <a href="tel:775-334-2677" style="color: #1FABC7; text-decoration: none;">(775) 334-2677</a></strong></p>
    </section>

    <section style="background-color: #D1E0EB; border-radius: 5px; padding: 20px; margin-bottom: 20px;">
        <h2 style="color: #0C3C60;">Trevor Project</h2>
        <p><strong>Call <a href="tel:1-866-488-7386" style="color: #1FABC7; text-decoration: none;">1-866-488-7386</a> or Text "Trevor" to <a href="sms:1-202-304-1200" style="color: #1FABC7; text-decoration: none;">1-202-304-1200</a> M- F, 12 noon - 7 PM PST (Standard text messaging rates apply.)</strong></p>
        <p><strong>The Trevor Project is the leading national organization providing crisis intervention and suicide prevention services to lesbian, gay, bisexual, transgender, queer & questioning (LGBTQ) young people under 25.</strong></p>
    </section>

    <section style="background-color: #D1E0EB; border-radius: 5px; padding: 20px; margin-bottom: 20px;">
        <h2 style="color: #0C3C60;">Children's Mobile Crisis Response Team (18 years and younger)</h2>
        <p><strong>Southern NV--<a href="tel:702-486-7865" style="color: #1FABC7; text-decoration: none;">702-486-7865</a>; Monday - Sunday, 24 hours</strong></p>
        <p><strong>Northern NV--<a href="tel:775-688-4970" style="color: #1FABC7; text-decoration: none;">775-688-4970</a>; Monday - Friday, 8 AM to 8 PM; Saturday - Sunday, 8 AM - 6PM</strong></p>
        <p><strong>Rural NV--<a href="tel:702-486-7865" style="color: #1FABC7; text-decoration: none;">702-486-7865</a>; Monday - Sunday, 9 AM - 6 PM</strong></p>
    </section>

    <section style="background-color: #D1E0EB; border-radius: 5px; padding: 20px; margin-bottom: 20px;">
        <h2 style="color: #0C3C60;">National 24 Hours Access and Crisis Lines</h2>
        <ul style="list-style-type: none; padding-left: 0;">
            <li>Family Crisis: <a href="tel:866-233-4357" style="color: #1FABC7; text-decoration: none;">866-233-4357</a></li>
            <li>Suicide Crisis: <a href="tel:800-273-8255" style="color: #1FABC7; text-decoration: none;">800-273-8255</a></li>
            <li>Teen Crisis: <a href="tel:866-331-9474" style="color: #1FABC7; text-decoration: none;">866-331-9474</a></li>
            <li>Teen Crisis Hotline: <a href="tel:800-852-8336" style="color: #1FABC7; text-decoration: none;">800-852-8336</a></li>
            <li>Substance Abuse: <a href="tel:877-548-2072" style="color: #1FABC7; text-decoration: none;">877-548-2072</a></li>
        </ul>
    </section>
</article>`,
                },
            ],
            width: "100%",
            minWidth: "256px",
        },
        {
            name: "adult_adhd_self_report",
            title: "Adult ADHD Self-Report Scale (ASRS-v1.1) Symptom Checklist",
            elements: [
                {
                    type: "matrix",
                    name: "asrs_questions",
                    title: "Please answer the questions below, rating yourself on each of the criteria shown using the scale on the right side of the page. As you answer each question, select the box that best describes how you have felt and conducted yourself over the past 6 months.",
                    //isRequired: true,
                    columns: [
                        { value: 0, text: "Never" },
                        { value: 1, text: "Rarely" },
                        { value: 2, text: "Sometimes" },
                        { value: 3, text: "Often" },
                        { value: 4, text: "Very Often" },
                    ],
                    rows: [
                        "How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?",
                        "How often do you have difficulty getting things in order when you have to do a task that requires organization?",
                        "How often do you have problems remembering appointments or obligations?",
                        "When you have a task that requires a lot of thought, how often do you avoid or delay getting started?",
                        "How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?",
                        "How often do you feel overly active and compelled to do things, like you were driven by a motor?",
                    ],
                },
            ],
        },
        {
            name: "medication_informed_consent",
            title: "Medication Informed Consent Form",
            elements: [
                {
                    type: "html",
                    name: "medication_consent_info",
                    html: `<article style="font-family: Arial, sans-serif; color: #494949; line-height: 1.6; max-width: 800px; margin: 20px auto; background-color: #fff; border-radius: 10px; box-shadow: 0 0 20px rgba(12, 60, 96, 0.1); padding: 40px;">
    <h1 style="color: #0C3C60; text-align: center;">Four Square Clinicals Psychotropic Medication Consent Information</h1>
    
    <div style="background-color: #D1E0EB; border-radius: 5px; padding: 20px; margin-bottom: 20px;">
        <p><strong>Four Square Clinicals needs to maintain a written record of your decision to consent to the administration of psychotropic medications. You may be treated with psychotropic medication only after you have been informed of your right to accept or refuse such medications.</strong></p>
        <p><strong>Your physician must have provided to you sufficient information regarding the proposed psychotropic medication, which shall include the following:</strong></p>
    </div>

    <ol style="background-color: #D1E0EB; border-radius: 5px; padding: 20px;">
        <li style="margin-bottom: 15px; padding: 10px; background-color: #fff; border-radius: 5px;">
            The nature of your psychiatric condition.
        </li>
        <li style="margin-bottom: 15px; padding: 10px; background-color: #fff; border-radius: 5px;">
            The reason for taking such medication, including the likelihood of your improving or not improving without such medication, and that your consent, once given, may be withdrawn at any time by your stating such intentions to your physician.
        </li>
        <li style="margin-bottom: 15px; padding: 10px; background-color: #fff; border-radius: 5px;">
            The reasonable alternative treatments available, if any.
        </li>
        <li style="margin-bottom: 15px; padding: 10px; background-color: #fff; border-radius: 5px;">
            The type, range of frequency, amount, and duration of taking the medications.
        </li>
        <li style="margin-bottom: 15px; padding: 10px; background-color: #fff; border-radius: 5px;">
            The probable side effects of these medications known to commonly occur, risks, as well as expected benefits, and approximate time course to improvement.
        </li>
        <li style="margin-bottom: 15px; padding: 10px; background-color: #fff; border-radius: 5px;">
            The possible additional side effects which may occur if you take such medication beyond three months. (specifically, neuroleptics/antipsychotics).
        </li>
    </ol>
</article>`,
                },
                {
                    type: "checkbox",
                    name: "medication_classes",
                    title: "The original and/or subsequent class(es) of medication(s) discussed, and recommended by your provider is/are:",
                    //isRequired: true,
                    choices: [
                        "Antipsychotics/Neuroleptics",
                        "Antidepressant",
                        "MAO Inhibitors Antidepressants",
                        "Anxiolytics/Sedatives",
                        "Benzodiazepines/Hypnotics",
                        "Stimulants",
                        "Mood Stabilizers/Antiepileptic",
                        "Antiparkinson agents",
                        "Lithium",
                        "Other",
                    ],
                },
                {
                    type: "checkbox",
                    name: "medication_consent_agreement",
                    title: "Your signature below constitutes your acknowledgement:",
                    //isRequired: true,
                    choices: [
                        "That you have read and agree to the foregoing.",
                        "That the medications and treatment set forth above have been adequately explained and/or discussed with you by your physician, and that you have received all the information you desire concerning such medication and treatment.",
                        "That if you encounter side effects or difficulties with this/these medication(s) you will contact your physician or your pharmacist.",
                        "That if you have a reason to believe you have become pregnant (if applicable) while on medication, you will contact your physician immediately.",
                        "That you authorize and consent to the administration of such medication and treatment.",
                    ],
                },
                {
                    type: "signaturepad",
                    name: "medication_consent_signature",
                    title: "Signature",
                    //isRequired: true,
                },
                {
                    type: "text",
                    name: "medication_consent_date",
                    title: "Date",
                    inputType: "date",
                    //isRequired: true,
                },
                {
                    type: "text",
                    name: "medication_consent_printed_name",
                    title: "Printed Full Name of Patient",
                    //isRequired: true,
                },
            ],
        },
        {
            type: "panel",
            name: "appointment-suggestion",
            title: "Appointment Suggestion",
            elements: [
                {
                    type: "boolean",
                    name: "suggestAppointment",
                    title: "Would you like to suggest an appointment?",
                    isRequired: true,
                },
                {
                    type: "text",
                    name: "appointmentDate",
                    title: "Preferred Date",
                    inputType: "date",
                    visibleIf: "{suggestAppointment} = true",
                    validators: [
                        {
                            type: "expression",
                            expression:
                                "getDate({appointmentDate}) >= today() + 3",
                            text: "Please select a date at least 72 hours in the future.",
                        },
                    ],
                    defaultValueExpression: "today() + 3",
                },
                {
                    type: "text",
                    name: "appointmentTime",
                    title: "Preferred Time",
                    inputType: "time",
                    visibleIf: "{suggestAppointment} = true",
                    min: "09:00",
                    max: "17:00",
                    step: 900,
                    defaultValue: "09:00",
                },
            ],
            width: "100%",
            minWidth: "256px",
        },
    ],
    calculatedValues: [
        {
            name: "gad7_score",
            expression:
                "{gad7_questions.row1} + {gad7_questions.row2} + {gad7_questions.row3} + {gad7_questions.row4} + {gad7_questions.row5} + {gad7_questions.row6} + {gad7_questions.row7}",
        },
        {
            name: "phq9_score",
            expression:
                "{phq9_questions.row1} + {phq9_questions.row2} + {phq9_questions.row3} + {phq9_questions.row4} + {phq9_questions.row5} + {phq9_questions.row6} + {phq9_questions.row7} + {phq9_questions.row8} + {phq9_questions.row9}",
        },
        {
            name: "asrs_score",
            expression:
                "{asrs_questions.row1} + {asrs_questions.row2} + {asrs_questions.row3} + {asrs_questions.row4} + {asrs_questions.row5} + {asrs_questions.row6}",
        },
        {
            name: "dast_score",
            expression:
                "{dast_questions.row1} + {dast_questions.row2} + {dast_questions.row3} + {dast_questions.row4} + {dast_questions.row5} + {dast_questions.row6} + {dast_questions.row7} + {dast_questions.row8} + {dast_questions.row9} + {dast_questions.row10}",
        },
    ],
    showQuestionNumbers: "off",
    showProgressBar: "bottom",
    showNavigationButtons: true,
    showCompletedPage: true,
    completeText: "Submit Registration",
    widthMode: "static",
    showTOC: true,
    showPreviewBeforeComplete: "showAllQuestions",
};
