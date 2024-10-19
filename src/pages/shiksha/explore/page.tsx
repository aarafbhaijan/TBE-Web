"use client";
import GreenButton from "@/app/Component/UIComponents/GreenButton";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";


import QuestionsCards from "./QuestionsCards";
import { StyleProvider } from "@ant-design/cssinjs";

export interface Question {
  name: string;
  ans: string;
  type: string;
  time: Date;
  _id: string;
}
const TestQn = () => {
  const questions: Question[] = [
    {
      name: "What is Next.js, and how does it differ from React?",
      ans: "Next.js is a React framework that enables server-side rendering and static site generation, enhancing performance and SEO. React is a JavaScript library for building UI components.",
      type: "NextJS",
      time: new Date(),
      _id: "teasdfad",
    },
    {
      name: "How do you set up a Node.js server?",
      ans: "You can set up a Node.js server by using the built-in 'http' module or with frameworks like Express. Example: 'const app = express(); app.listen(3000, () => console.log('Server running'));'.",
      type: "NodeJS",
      time: new Date(),
      _id: "teasdfad",
    },
    {
      name: "What are React Hooks, and why are they used?",
      ans: "React Hooks allow you to use state and other React features in function components. They simplify logic reuse and code organization by eliminating class components.",
      type: "ReactJS",
      time: new Date(),
      _id: "teasdfad",
    },
    {
      name: "How do you implement API routes in Next.js?",
      ans: "Next.js API routes are created in the 'pages/api' directory. Each file becomes an API endpoint, handling requests and responses. Example: 'export default function handler(req, res) { res.status(200).json({ message: 'Hello World' }) }'.",
      type: "NextJS",
      time: new Date(),
      _id: "teasdfad",
    },
    {
      name: "Explain how to handle asynchronous operations in Node.js.",
      ans: "Asynchronous operations in Node.js are handled using callbacks, promises, or async/await. Example: 'async function fetchData() { const data = await fetch(url); return data.json(); }'.",
      type: "NodeJS",
      time: new Date(),
      _id: "teasdfad",
    },
    {
      name: "What is the 'useEffect' Hook in React?",
      ans: "'useEffect' is a React Hook that runs side-effects in function components. It can handle tasks like fetching data, updating the DOM, and subscribing to external services.",
      type: "ReactJS",
      time: new Date(),
      _id: "teasdfad",
    },
  ];
  const regexPattern = {
    onKey: /^[A-Za-z0-9\s.,&-?]*$/, // Allows typing letters, numbers, space, period, comma, ampersand, hyphen, and question mark
    whole: /^[A-Za-z0-9\s.,&-?]+$/, // Ensures the entire input contains valid characters and is not empty
  };
//   const styles = {
//     container: {
//       maxWidth: "600px",
//       margin: "0 auto",
//       padding: "20px",
//       fontFamily: "Arial, sans-serif",
//     },
//     questionCard: {
//       backgroundColor: "#f9f9f9",
//       border: "1px solid #ddd",
//       borderRadius: "8px",
//       padding: "16px",
//       marginBottom: "20px",
//       boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//     },
//     questionText: {
//       fontSize: "1.2rem",
//       color: "#333",
//     },
//     answerText: {
//       fontSize: "1rem",
//       color: "#555",
//       marginTop: "10px",
//     },
//     meta: {
//       marginTop: "12px",
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//     },
//     typeTag: {
//       backgroundColor: "#0070f3",
//       color: "#fff",
//       padding: "4px 8px",
//       borderRadius: "4px",
//       fontSize: "0.9rem",
//     },
//     time: {
//       fontSize: "0.85rem",
//       color: "#888",
//     },
//   };
  const [CallAddQn, setCallAddQn] = useState<boolean | undefined>(false);
  const [showAddModal, setshowAddModal] = useState(false);
  const [AddFeild, setAddFeild] = useState<Feilds[]>([
    {
      id: "AddFeild",
      label: "Enter your question Please..",
      value: "",
      regexPattern: regexPattern,
      isError: false,
      type: "ant-text",
    },
    {
      id: "AddFeild",
      label: "Enter Answer",
      value: "",
      regexPattern: regexPattern,
      isError: false,
      type: "ant-text",
    },
  ]);
  useEffect(() => {
    if (CallAddQn) {
      const req = {
        name: AddFeild[0].value,
        ans: AddFeild[1].value,
        Date: new Date(),
        type: "Type",
      };
      // call APi Here
      console.log("req", req);
    }
    if (CallAddQn == undefined) {
      setshowAddModal(false);
    }
  }, [CallAddQn]);
  async function updateQn(req: Question) {
    console.log(req, "update Req");
  }
  async function deleteQn(_id: string) {
    console.log(_id, "update Req");
  };

  return (
    <div className={"w-full"}>
      <StyleProvider>
        <div className="ml-auto mb-2">
          <EnterAnyLabelModal
            width={400}
            items={AddFeild}
            setItems={setAddFeild}
            buttonLabel="Proceed"
            isCallApi={CallAddQn}
            label="Enter your Question and"
            mainLabel="Proceed "
            setIsCallApi={setCallAddQn}
            setShowModal={setshowAddModal}
            showModal={showAddModal}
          />
          <Button
            type="primary"
            onClick={() => {
              setshowAddModal(true);
            }}
            icon={<FaPlus />}
          >
            Add
          </Button>
        </div>
        <div className="h-[70vh] overflow-y-auto  scrollbar-setting py-5">
          <QuestionsCards
            questions={questions}
            updateQn={updateQn}
            deleteQn={deleteQn}
          />
        </div>
      </StyleProvider>
    </div>
  );
};

export default TestQn;
