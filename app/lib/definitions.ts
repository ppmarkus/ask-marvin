// This file contains type definitions for the data.
// It describes the shape of the data, and what data type each property should accept.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type ChatQuestionAnswerUnitType = {
  id: string;
  question: string;
  question_ask_date?: string | null;
  answer_text?: string | null;
  isDataLoading?: boolean;
  answer_sql?: string | null;
  sql_generation_status?: string | null;
  answer_table?: string | null;
  error_message?: string | null;
  answer_time_taken?: number | null;
  answer_total_tokens?: number | null;
  answer_total_cost?: number | null;
  answer_confidence_score?: number | null;
  is_odd?: boolean;
  like_rating: boolean;
  not_like_rating: boolean;
  setHasUpdate: (hasUpdated: boolean) => void;
};

export type MarvinChatState = {
  chat_question: string;
  set_chat_question: (question: string) => void;
  chatQuestionAnswerUnits: ChatQuestionAnswerUnitType[];
  setChatQuestionAnswerUnits: (units: ChatQuestionAnswerUnitType[]) => void;
  setHasUpdate: (hasUpdated: boolean) => void;
  setHasError: (hasError: boolean) => void;
  setErrorMessage: (errorMessage: string | null) => void;
};

export interface UserInputPrompt {
  chat_question: string;
  set_chat_question: (question: string) => void;
  chatQuestionAnswerUnits: ChatQuestionAnswerUnitType[];
  setChatQuestionAnswerUnits: (units: ChatQuestionAnswerUnitType[]) => void;
  setHasUpdate: (hasUpdated: boolean) => void;
  setHasError: (hasError: boolean) => void;
  setErrorMessage: (errorMessage: string | null) => void;
}

export type MarvinMainChatProps = {
  chat_question: string;
  set_chat_question: (question: string) => void;
  setHasUpdate: (hasUpdated: boolean) => void;
  logEntryToLoad: string | null;
};

export type ChatResultProps = {
  id: string;
  question_ask_date?: string;
  isDataLoading: boolean;
  answer_text?: string;
  answer_sql?: string;
  sql_generation_status?: string;
  answer_table?: any;
  error_message?: string;
  is_odd?: boolean;
  answer_time_taken?: number | null;
  answer_total_tokens?: number | null;
  answer_total_cost?: number | null;
  answer_confidence_score?: number | null;
  like_rating: boolean;
  not_like_rating: boolean;
  setHasUpdate: (hasUpdated: boolean) => void;
};

export type DataUpdateStatus = {
  status: string;
  error_message: string;
};

export type UserInputPromptProps = {
  question: string;
  isCompleted?: boolean;
};
