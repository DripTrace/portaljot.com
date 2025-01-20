
export const UPDATE_TRANSCRIBED_TEXT = "UPDATE_TRANSCRIBED_TEXT";
export const ADD_SYSTEM_MESSAGE = "ADD_SYSTEM_MESSAGE";
export const ADD_PATIENT_MESSAGE = "ADD_PATIENT_MESSAGE";
export const UPDATE_CONVERSATION = "UPDATE_CONVERSATION";

export interface UpdateTranscribedTextAction {
  type: typeof UPDATE_TRANSCRIBED_TEXT;
  payload: string;
}

export interface AddSystemMessageAction {
  type: typeof ADD_SYSTEM_MESSAGE;
  payload: string;
}

export interface AddPatientMessageAction {
  type: typeof ADD_PATIENT_MESSAGE;
  payload: string;
}

export interface UpdateConversationAction {
  type: typeof UPDATE_CONVERSATION;
  payload: string;
}

export type ConvoActionTypes =
  | UpdateTranscribedTextAction
  | AddSystemMessageAction
  | AddPatientMessageAction
  | UpdateConversationAction;
