"use client";

import ChatResult from "./ChatResult";
import UserInputPromptSent from "./UserInputPromptSent";

import { ChatQuestionAnswerUnitType } from "@/app/lib/definitions";

export default function ChatQuestionAnswerUnit(
  props: ChatQuestionAnswerUnitType,
) {
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
    <div
      className={`${
        is_odd
          ? "border-x-0 border-y-0 border-gray-200 bg-transparent"
          : "rounded-lg bg-white dark:bg-slate-900"
      } p-4 `}
    >
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
