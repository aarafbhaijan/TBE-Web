import mongoose from "mongoose";
const QuestionModel = new mongoose.Schema({
  qn: String,
  ans: String,
  type: String,
});
export const Question =
  mongoose.models.questions || mongoose.model("questions", QuestionModel);
