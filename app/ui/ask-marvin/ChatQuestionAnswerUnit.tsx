"use client";

import Box from "@mui/material/Box";
import ChatResult from "./ChatResult";
import UserInputPromptSent from "./UserInputPromptSent";

import { ChatQuestionAnswerUnitType } from "@/app/lib/definitions";

export default function ChatQuestionAnswerUnit(props: ChatQuestionAnswerUnitType) {
  const {
    id,
    question,
    question_ask_date,
    isDataLoading,
    answer_text,
    answer_table,
    error_message,
    answer_sql,
    sql_generation_status,
    is_odd,
    answer_time_taken,
    answer_total_cost,
    answer_total_tokens,
    answer_confidence_score,
    like_rating,
    not_like_rating,
    setHasUpdate,
  } = props;

  return (
    <div className={`bg-${is_odd ? "bg-gray-400 border-gray-200 border-x-0 border-y-0 border-dotted" : "white"} p-4 border-y-2 border-gray-300`}>
      <UserInputPromptSent question={question!} />

      <ChatResult
        id={id}
        question_ask_date={question_ask_date!}
        isDataLoading={isDataLoading || false}
        answer_text={answer_text!}
        answer_sql={answer_sql!}
        sql_generation_status={sql_generation_status!}
        answer_table={answer_table}
        error_message={error_message!}
        is_odd={is_odd}
        answer_time_taken={answer_time_taken}
        answer_total_cost={answer_total_cost}
        answer_total_tokens={answer_total_tokens}
        answer_confidence_score={answer_confidence_score}
        like_rating={like_rating}
        not_like_rating={not_like_rating}
        setHasUpdate={setHasUpdate}
      />
    </div>
  );
}
