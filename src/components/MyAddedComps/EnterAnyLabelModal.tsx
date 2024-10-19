import {
  Button,
  Checkbox,
  ConfigProvider,
  Modal,
  notification,
  Tooltip,
} from "antd";
import React, { useEffect, useRef, useState } from "react";

import { ExclamationCircleFilled } from "@ant-design/icons";
import { FaCross, FaSync } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { Feilds } from "@/pages/shiksha/explore/[Type]";
import { clearVals, velidateForm } from "./helperFuncs";
import EachFeild from "./EachFeild";



interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setItems: React.Dispatch<React.SetStateAction<Feilds[]>>;
  items: Feilds[];
  isCallApi: boolean | undefined;
  setIsCallApi: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  label: React.ReactNode;
  mainLabel?: React.ReactNode;
  buttonLabel: string;
  amountExact?: string;
  defAmount?: string;
  strictRegex?: boolean;
  formclassName?: string;
  width?: number;
  secondaryLabel?: string;
  tableFeilds?: Feilds[];
  confirmationTable?: boolean;
  textSize?: "xs" | "md" | "lg" | "xl" | "2xl" | "3xl";
  showRefetch?: boolean;
  setRefetch?: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  refetchTime?: number;
  confimationNote?: string;
  optName?: string;

  extraButton?: React.ReactNode;
}
const EnterAnyLabelModal = ({
  showModal,
  setShowModal,
  items,
  setItems,
  isCallApi,
  setIsCallApi,
  label,
  mainLabel,
  buttonLabel,
  amountExact,
  defAmount,
  strictRegex,
  formclassName,
  width,
  secondaryLabel,
  confirmationTable,
  tableFeilds,
  textSize = "lg",
  showRefetch,
  setRefetch,
  refetchTime,
  confimationNote,

  extraButton,
}: Props) => {




 
  const [isAgreedConfirmTable, setIsAgreedConfirmTable] = useState(true);
  const [DesableTime, setDesableTime] = useState(refetchTime);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (DesableTime && DesableTime > 0) {
      const timer = setTimeout(() => setDesableTime(DesableTime - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsDisabled(false); // Enable button after countdown
    }
  }, [DesableTime, refetchTime]);
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };
 
  return (
    <>
      <Modal
        width={width ? width : 300}
        onClose={() => {
          setShowModal(false);
        }}
        closeIcon={
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  defaultBg: "white",
                  // defaultHoverColor: '#ff1d25',
                  // defaultHoverBorderColor: "white",
                },
              },
            }}
          >
            <Button
              shape="circle"
              onClick={() => {
                setIsCallApi(undefined);
                clearVals(items, setItems);
                setShowModal(false);
              }}
            >
              X
            </Button>
          </ConfigProvider>
        }
        maskClosable
        centered
        open={showModal}
        footer={null}
        mask
        onOk={() => {}}
        title={
          <span className={`text-${textSize}`}>
            <ExclamationCircleFilled
              className="text-2xl text-sky-700"
              style={{
                color: "#1677FF",
                marginRight: "8px",
                fontSize: "2rem",
              }}
            />
            {label} <span className="text-[#1677FF]"> {mainLabel}!</span>
          </span>
        }
      >
        {secondaryLabel && (
          <div>
            <p className="w-[90%] text-wrap text-base font-medium my-3 mx-auto">
              {secondaryLabel}
            </p>
          </div>
        )}
       
        {confimationNote && (
          <>
            <div className="text-center mb-4">
              <span className="font-bold ">
                <Checkbox
                  checked={isAgreedConfirmTable}
                  onClick={() => {
                    setIsAgreedConfirmTable(!isAgreedConfirmTable);
                  }}
                  className="mr-2"
                />
                {confimationNote}
              </span>
            </div>
          </>
        )}

        <div
          className={`${
            formclassName
              ? formclassName
              : "flex flex-wrap gap-y-4 justify-around w-full  px-4 "
          } `}
        >
          {items.map((eachfeild, ind) => (
            <div key={ind} className="flex  items-center flex-col gap-2 w-full">
              <EachFeild
                
                width="full"
                EachInfo={eachfeild}
                ind={ind}
                items={items}
                setItems={setItems}
              />
            </div>
          ))}
         
         

          {items[0].id != "amount" && !strictRegex && (
            <div className="w-full flex justify-between">
              {/* <Tooltip title={'Re-Fetch OTP'}> */}
              <Button
                disabled={isDisabled}
                hidden={!showRefetch}
                size="small"
                type="primary"
                className=""
                // icon={<FaSync/>}
                onClick={() => {
                  setIsDisabled(true);
                  setDesableTime(90);
                  setRefetch!(undefined);
                  clearVals(items, setItems);

                  // setShowModal(false);
                }}
              >
                {isDisabled && DesableTime ? (
                  `Refetch in ${formatTime(DesableTime)}`
                ) : (
                  <FaSync />
                )}
              </Button>

              {/* </Tooltip> */}
              <Button
                hidden={confirmationTable && !isAgreedConfirmTable}
                size="small"
                type="primary"
                className="ml-auto"
                onClick={() => {
                  const valid = velidateForm(items, setItems);
                  console.log("after valid", items);
                  if (valid) {
                    setIsCallApi(true);
                    setShowModal(false);
                  }
                }}
              >
                {buttonLabel}
              </Button>
            </div>
          )}
          {extraButton}
        </div>
      </Modal>
    </>
  );
};

export default EnterAnyLabelModal;
