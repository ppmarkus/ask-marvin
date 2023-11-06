// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data

const table_data_demo = [
  { Date: "2023-07-03", RH_Beta: 0.163888617 },
  { Date: "2023-07-04", RH_Beta: 0.157007996 },
  { Date: "2023-07-05", RH_Beta: 0.165373881 },
  { Date: "2023-07-06", RH_Beta: 0.167588782 },
  { Date: "2023-07-07", RH_Beta: 0.175606089 },
  { Date: "2023-07-10", RH_Beta: 0.172515005 },
  { Date: "2023-07-11", RH_Beta: 0.185080624 },
  { Date: "2023-07-12", RH_Beta: 0.157559826 },
  { Date: "2023-07-13", RH_Beta: 0.158691908 },
  { Date: "2023-07-14", RH_Beta: 0.161307434 },
  { Date: "2023-07-17", RH_Beta: 0.161307434 },
  { Date: "2023-07-18", RH_Beta: 0.147413303 },
  { Date: "2023-07-19", RH_Beta: 0.148960276 },
  { Date: "2023-07-20", RH_Beta: 0.169573504 },
  { Date: "2023-07-21", RH_Beta: 0.164519971 },
  { Date: "2023-07-24", RH_Beta: 0.171333597 },
  { Date: "2023-07-25", RH_Beta: 0.183769739 },
  { Date: "2023-07-26", RH_Beta: 0.188987978 },
  { Date: "2023-07-27", RH_Beta: 0.169876138 },
  { Date: "2023-07-28", RH_Beta: 0.112442885 },
  { Date: "2023-07-31", RH_Beta: 0.140914264 },
];

const chat_qestion_answer_data = [
  {
    id: "1",
    question: "What is the attribution and alpha for Rockhampton for the current month?",
    isDataLoading: false,
    answer_text: "The attribution for Rockhampton for the current month (2023-08) is approximately 0.0153 and the alpha is approximately 0.0165.",
    answer_sql:
      "SELECT DATE_FORMAT(processDate, '%Y-%m') AS Date, SUM(RHAttribution) AS RHAttribution, SUM(RHMktAlpha) AS RHAlpha FROM t05PortfolioResponsibilities WHERE DATE_FORMAT(processDate, '%Y-%m') = '2023-08' GROUP BY DATE_FORMAT(processDate, '%Y-%m')",
    answer_table: null,
    answer_time_taken: 3.5687,
    answer_total_cost: 0.0002,
    answer_total_tokens: 98700,
    answer_confidence_score: 0.98,
    question_ask_date: "2023-07-01T12:31:58",
    is_odd: false,
    like_rating: false,
    not_like_rating: true,
    sql_generation_status: "VALID",
  },
  {
    id: "2",
    question: "What is the RH Daily Beta for August 2023?",
    isDataLoading: false,
    answer_table: JSON.stringify(table_data_demo),
    answer_sql:
      "select processDate,sum(if(side='S',-1,1)*beta*t05PortfolioResponsibilities.RHExposure) as RHSensitivity " +
      "from t05PortfolioResponsibilities " +
      " where processDate between '2023-07-01' and '2023-07-31' " +
      " group by processDate order by processDate",
    answer_time_taken: 3.159,
    answer_total_cost: 0.0001,
    answer_total_tokens: 1500,
    answer_confidence_score: 0.95,
    question_ask_date: "2023-07-01T12:31:58",
    is_odd: true,
    like_rating: false,
    not_like_rating: false,
    sql_generation_status: "VALID",
  },
  {
    id: "3",
    question: "What is the RH Daily Beta for August 2023?",
    isDataLoading: false,
    answer_table: JSON.stringify(table_data_demo),
    answer_sql:
      "select processDate,sum(if(side='S',-1,1)*beta*t05PortfolioResponsibilities.RHExposure) as RHSensitivity " +
      "from t05PortfolioResponsibilities " +
      " where processDate between '2023-07-01' and '2023-07-31' " +
      " group by processDate order by processDate",
    answer_time_taken: 3.159,
    answer_total_cost: 0.0001,
    answer_total_tokens: 1500,
    answer_confidence_score: 0.95,
    question_ask_date: "2023-07-01T12:31:58",
    is_odd: false,
    like_rating: false,
    not_like_rating: false,
    sql_generation_status: "VALID",
  },
  {
    id: "4",
    question: "What is the monthly Beta RH/YA processDate between '2008-01-01' and '2012-01-01'?",
    answer_table: null,
    isDataLoading: true,
    answer_time_taken: 85.598,
    answer_total_cost: 0.048,
    answer_total_tokens: 6900,
    answer_confidence_score: 0.93,
    question_ask_date: "2023-07-28T12:31:58",
    is_odd: true,
    like_rating: true,
    not_like_rating: false,
    sql_generation_status: "INVALID",
    error_message: "<<Invalid SQL Generated>> This model's maximum context length is 8192 tokens. However, your messages resulted in 9134 tokens. Please reduce the length of the messages."
  },
  {
    id: "5",
    question: "What is the monthly Beta RH/YA processDate between '2008-01-01' and '2012-01-01'?",
    answer_table: null,
    isDataLoading: true,
    answer_time_taken: 85.598,
    answer_total_cost: 0.048,
    answer_total_tokens: 6900,
    answer_confidence_score: 0.93,
    question_ask_date: "2023-07-28T12:31:58",
    is_odd: true,
    like_rating: true,
    not_like_rating: false,
    sql_generation_status: "VALID",
  },
  {
    id: "6",
    question: "What is the attribution and alpha for Rockhampton for the current month?",
    isDataLoading: false,
    answer_text: "The attribution for Rockhampton for the current month (2023-08) is approximately 0.0153 and the alpha is approximately 0.0165.",
    answer_sql:
      "SELECT DATE_FORMAT(processDate, '%Y-%m') AS Date, SUM(RHAttribution) AS RHAttribution, SUM(RHMktAlpha) AS RHAlpha FROM t05PortfolioResponsibilities WHERE DATE_FORMAT(processDate, '%Y-%m') = '2023-08' GROUP BY DATE_FORMAT(processDate, '%Y-%m')",
    answer_table: null,
    answer_time_taken: 3.5687,
    answer_total_cost: 0.58,
    answer_total_tokens: 98700,
    answer_confidence_score: 0.98,
    question_ask_date: "2023-04-11T09:26:58",
    is_odd: false,
    like_rating: false,
    not_like_rating: true,
    sql_generation_status: "VALID",
  },
];

module.exports = {
  chat_qestion_answer_data
};
