import { Feilds } from "@/pages/shiksha/explore/[Type]";
import React, { SetStateAction } from "react";
import EachFeild from "./EachFeild";


interface Props {
  items: Feilds[];
  setItems: React.Dispatch<React.SetStateAction<Feilds[]>>;
  flexDir?: "col" | "row";
  fullwidth?: boolean;
  className?: string;
  formClassName?: string;
  containerFull?: boolean;
  setCallApi?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
}
const UserForm = ({
  items,
  setItems,
  flexDir,
  fullwidth,
  className,
  formClassName,
  containerFull,
  setCallApi,
}: Props) => {
  return (
    <>
      <div
        className={`flex flex-wrap gap-y-4 justify-around w-full  px-4 ${
          formClassName ? formClassName : "py-6 "
        }`}
      >
        {items.map((eachfeild: Feilds, ind: number) => {
          if (eachfeild.type == "hidden") {
            return;
          }
          return (
            <div
              key={ind}
              className={
                flexDir == "col"
                  ? `flex flex-col items-center  justify-around w-full  `
                  : `flex flex-col items-center md:flex-row gap-[1vw] justify-center w-full ${
                      containerFull ? "w-full" : "lg:w-[45%]"
                    }`
              }
            >
              <EachFeild
                width={fullwidth ? "full" : undefined}
                EachInfo={eachfeild}
                ind={ind}
                items={items}
                setItems={setItems}
                className={className}
                setCallApi={setCallApi}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default UserForm;
