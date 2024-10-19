import React from "react";
import EachQuestion from "./EachQuestion";
import { Question } from "@/pages/shiksha/explore/[Type]";

const QuestionsCards = ({
  questions,
  updateQn,
  deleteQn,
  type,
  error
}: {
  questions: Question[];
  updateQn(req: Question): Promise<void>;
  deleteQn(_id: string): Promise<void>;
  type: string;
  error: string

}) => {
  return (
    <div>
      {questions && questions.filter((qn) => qn.type == type).length > 0 ? (
        questions.map((qn, ind) => (
          <EachQuestion type={type} question={qn} key={ind} updateQn={updateQn} deleteQn={deleteQn} />
        ))
      ) : (
        <div>
          <h3 className="text-red-500 font-bold">{error ? error : 'Oops No Questions were Added....'}</h3>
        </div>
      )}
    </div>
  );
};

export default QuestionsCards;
