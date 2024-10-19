import React, { useEffect, useRef, useState } from "react";
import { FaArrowUpFromGroundWater, FaDeleteLeft } from "react-icons/fa6";
import { Button } from "antd";
import { FaLocationArrow, FaPlus, FaTrash } from "react-icons/fa";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { Feilds, Question } from "@/pages/shiksha/explore/[Type]";
import UserForm from "./UserForm";
import { clearVals, velidateForm } from "./helperFuncs";


const EachQuestion = ({
  question,
  updateQn,
  deleteQn,
  type
}: {
  question: Question;
  updateQn(req: Question): Promise<void>;
  deleteQn(_id: string): Promise<void>;
  type: string
}) => {
  const [isUpadate, setIsUpdate] = useState(false);
  const regexPattern = {
    onKey: /^[A-Za-z0-9\s.,&-?]*$/, // Allows typing letters, numbers, space, period, comma, ampersand, hyphen, and question mark
    whole: /^[A-Za-z0-9\s.,&-?]+$/, // Ensures the entire input contains valid characters and is not empty
  };
  const [UpdateFeild, setUpdateFeild] = useState<Feilds[]>([
    {
      id: "UpdateQn",
      label: "Update your question Please..",
      value: question.qn,
      regexPattern: regexPattern,
      isError: false,
      type: "ant-text",
    },
    {
      id: "UpdateAns",
      label: "Update Answer",
      value: question.ans,
      regexPattern: regexPattern,
      isError: false,
      type: "ant-text",
    },
  ]);
  if (question.type !== type) {
    return
  }
  return (
    <div className="bg-[#F0F3FF] shadow-md rounded-lg p-6 mb-6 border border-gray-200">
      {!isUpadate ? (
        <>
          <h3 className="text-xl font-semibold text-gray-800">
            {question.qn}
          </h3>
          <p className="mt-3 text-gray-600">{question.ans}</p>
          <div className="mt-4 flex flex-col justify-between items-center">
            <div className="text-sm text-gray-500 ml-auto mb-4">
              {/* <p className="">{question.time.toLocaleString()}</p> */}
            </div>
            <div className="flex w-[70%] mx-auto justify-between">
              <Button
                type="dashed"
                onClick={() => {
                  setIsUpdate(true);
                }}
                icon={<FaLocationArrow />}
              >
                Update
              </Button>
              <Button
                danger
                icon={<FaTrash />}
                onClick={() => {
                  // call My Delete
                  deleteQn(question._id!);
                }}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <UserForm
            items={UpdateFeild}
            setItems={setUpdateFeild}
            fullwidth
            containerFull
          />
          <div className="flex w-[70%] mx-auto justify-between">
            <Button
              type="primary"
              icon={<FaLocationArrow />}
              onClick={() => {
                //call MY Update
                const isValid = velidateForm(UpdateFeild, setUpdateFeild);
                if (isValid) {
                  updateQn({
                    _id: question._id,
                    ans: UpdateFeild[1].value,
                    qn: UpdateFeild[0].value,
                    type: type,
                  });
                }
              }}
            //   icon={<>Update</>}
            >
              Update
            </Button>
            <Button
              onClick={() => {
                setIsUpdate(false);
                clearVals(UpdateFeild, setUpdateFeild)
              }}
              // icon={<FaTrash />}
              danger
              type="primary"
            >Cancel</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default EachQuestion;
