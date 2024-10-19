import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState, memo, useCallback } from "react";

import {
  ConfigProvider,
  DatePicker,
  Input,
  notification,
  Radio,
  RadioChangeEvent,
} from "antd";
import dayjs from "dayjs";

// import { Feilds } from '..'
import { styled } from "@mui/material/styles";
import { Select as AntSelect } from "antd";
import { InputOTP } from "antd-input-otp";
import { Feilds, OptionsSelect } from "@/pages/shiksha/explore/[Type]";


const MaskedTextField = memo(
  styled(TextField)(({ id }) => ({
    "& input": {
      "-webkit-text-security":
        id &&
          id.toLowerCase().includes("pin") &&
          !id.toLowerCase().includes("pincode")
          ? "disc"
          : "none",
    },
  }))
);

const inputProps = {
  style: {
    borderRadius: 15, // Adjust the border radius as needed
  },
};


export const EachFeild = (
  {
    EachInfo,
    ind,
    items,
    setItems,
    setCallApi,
    width,
    className,
    onBlur,
    veriticalAlign,
    myChange,
    setIsCleared,
  }: // inputRef
    {
      EachInfo: Feilds;
      ind: number;
      items: Feilds[];
      setItems: React.Dispatch<React.SetStateAction<Feilds[]>>;
      setCallApi?: React.Dispatch<React.SetStateAction<boolean>>;
      width?: string;
      className?: string;
      onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
      veriticalAlign?: boolean;
      myChange?: (e: RadioChangeEvent) => void;
      setIsCleared?: React.Dispatch<React.SetStateAction<boolean>>;

    },
  ref: any
) => {
  const handleChange = (e: any, ind: number) => {
    const temp = [...items];
    if (
      temp[ind].regexPattern?.onKey.test(e.target.value) &&
      temp[ind].value != "Maharashtra" &&
      !EachInfo.imported
    ) {
      temp[ind].id == "PancardNum" || temp[ind].id == "IFSC"
        ? (temp[ind].value = e.target.value.toUpperCase())
        : (temp[ind].value = e.target.value);
      temp[ind].isError = false;
      setItems(temp);
    }
  };
  const handleSelect = (val: string, ind: number) => {
    const temp = [...items];
    temp[ind].value = val;
    temp[ind].isError = false;
    setItems(temp);
  };

  const [labeDiffValState, setLabeDiffValState] = useState("");
  useEffect(() => {
    console.log("test hitted");

    if (EachInfo.clearValue) {
      setLabeDiffValState("");
      const temp = [...items];
      temp[ind].value = "";
      temp[ind].clearValue = false;
      setItems([...temp]);
    }
    console.log("test label", labeDiffValState);
  }, [EachInfo.clearValue]);

  const handleAntSelect = (value: any, ind: number) => {
    const temp = [...items];

    temp[ind].value = value;
    temp[ind].isError = false;
    setItems(temp);
  };
  const [filteredOptions, setFilteredOptions] = useState<
    (string | OptionsSelect)[] | undefined
  >(EachInfo.options);

  useEffect(() => {
    setFilteredOptions(EachInfo.options);
  }, [EachInfo.options]);
  const [antSearchInput, setAntSearchInput] = useState();
  const handleSearch = (input: string) => {
    const filtered = EachInfo.options?.filter((option) => {
      if (typeof option === "string") {
        return option.toLowerCase().includes(input.toLowerCase());
      } else if (typeof option === "object" && "label" in option) {
        return option.label.toLowerCase().includes(input.toLowerCase());
      }
      return false;
    });

    setFilteredOptions(filtered);
  };
  const [otpValues, setOtpValues] = useState<string[]>([]);

  useEffect(() => {
    console.log("EachInfo", EachInfo);

    if (EachInfo.type == "OTP" && EachInfo.clearData == true) {
      setOtpValues([]);
      EachInfo.clearData = false;
    }
    if (EachInfo.type == "search" && EachInfo.clearData == true) {
      console.log("hitten 2");

      setLabeDiffValState("");
      EachInfo.clearData = false;
    }

    console.log("label now", labeDiffValState);
  }, [EachInfo.clearData]);
  const inputRef = useRef<any>(null);
  const dateFormat = "YYYY-MM-DD";
  useEffect(() => {
    if (ind === 0) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100); // Adjust the timeout as needed
    }
  }, [ind]);

  // useEffect(() => {
  //   if (isModalopen) {
  //     // Delay focus to ensure the modal is fully rendered
  //     const timer = setTimeout(() => {
  //       if (inputRef.current) {
  //         inputRef.current.focus();
  //       }
  //     }, 100);

  //     return () => clearTimeout(timer);
  //   }
  // }, [isModalopen]);
  useEffect(() => {
    if (EachInfo.type == "antSearch" && EachInfo.value != "") {
      setFilteredOptions(EachInfo.options);
    }
  }, [EachInfo.value]);


  return (
    <>
      {EachInfo.type == "bit" && (
        <div
          className={`flex md:px-4 py-1 ${className} items-center justify-between md:border-[1px] w-full rounded-md ${EachInfo.strict && "border-green-400"
            } ${EachInfo.isError && "border-[.1px] border-red-500"}`}
        >
          <p
            className={`${EachInfo.isError && " text-red-500"} text-[#6B7280] ${width == "full" && "pr-4"
              } `}
          >
            {EachInfo.label}
          </p>
          <Radio.Group
            size="small"
            value={EachInfo.value}
            onChange={
              myChange
                ? (e) => {
                  myChange(e);
                }
                : (e: any) => {
                  if (!EachInfo.strict) {
                    const temp = [...items];
                    temp[ind].value = e.target.value;
                    temp[ind].isError = false;
                    setItems(temp);
                  } else {
                    notification.warning({
                      message: `${EachInfo.label} is not editable!`,
                      description: (
                        <p>
                          You Cant&apos; edit{" "}
                          <span className="text-red-500">
                            {EachInfo.label}!
                          </span>
                        </p>
                      ),
                      placement: "top",
                    });
                  }
                }
            }
          >
            <>
              <Radio.Button className="text-green-00" value={"1"}>
                Yes
              </Radio.Button>
              <Radio.Button className="text-red-00 " value={"0"}>
                No
              </Radio.Button>
            </>
          </Radio.Group>
        </div>
      )}
      {EachInfo.type == "date" && (
        <div
          className={`flex px-4 py-1 ${className} items-center justify-between  w-full rounded-xl  ${EachInfo.isError
            ? "border-[.1px] border-red-500"
            : "border-[1px] border-[#c7c6c6]"
            }`}
        >
          <p
            className={`${EachInfo.isError && " text-red-500"} text-[#6B7280] ${width == "full" && "pr-4"
              } `}
          >
            {EachInfo.label}
          </p>
          <DatePicker
            width={"100%"}
            required={true}
            value={
              EachInfo.value != ""
                ? dayjs(EachInfo.value, dateFormat)
                : undefined
            }
            onChange={(value) => {
              const temp = [...items];
              temp[ind].isError = false;
              temp[ind].value = value ? value.format(dateFormat) : "";
              setItems(temp);
            }}
            maxDate={
              EachInfo.maxDate ? dayjs(EachInfo.maxDate, dateFormat) : undefined
            }
            minDate={
              EachInfo.minDate ? dayjs(EachInfo.minDate, dateFormat) : undefined
            }
          />
        </div>
      )}
      {EachInfo.type == "text" && (
        <div
          className={`w-full rounded-xl ${width == "full" ? "lg:w-full" : "lg:w-[46%]"
            } h-fit m-0  ${!veriticalAlign && items.length % 2 != 0 && "grow"} `}
        >
          <MaskedTextField
            className="bg-white rounded-xl"
            // ref={inputRef}
            // autoFocus
            inputRef={inputRef}
            autoFocus={ind == 0}
            rows={
              EachInfo.id.toLowerCase().includes("description") ? 3 : undefined
            }
            multiline={
              EachInfo.id.toLowerCase().includes("description") ? true : false
            }
            // type={
            //   EachInfo.id.toLowerCase().includes("pin") && !EachInfo.id.toLowerCase().includes("pincode") ? "password" : undefined
            // }
            disabled={EachInfo.imported}
            // id={EachInfo.id}
            id={EachInfo?.id || ""}
            label={EachInfo.label}
            variant="outlined"
            error={EachInfo.isError}
            InputProps={inputProps}
            value={EachInfo.value}
            onChange={(e) => {
              handleChange(e, ind);
            }}
            // onChange={handleInputChange}
            fullWidth
            size="small"
            onDoubleClick={() => {
              if (EachInfo.id == "BankName") {
                const temp = [...items];
                temp[ind].value = "";
                temp[ind].type = "select";
                setItems([...temp]);
              }
            }}
            onBlur={onBlur}
          />

        </div>
      )}
      {EachInfo.type == 'ant-text' && (
        <Input
          className={`${EachInfo.isError && 'border-[1px] border-red-500'}`}
          //  ref={searchInput}
          value={EachInfo.value}
          allowClear
          placeholder={EachInfo.label}
          onChange={(e) => {
            handleChange(e, ind);
          }}

          style={{ marginBottom: 10, width: '100%' }}
        />)}
      {EachInfo.type == "small-text" && (
        <div className="relative h-9 w-full ">
          <input
            className={`w-full h-full px-3 py-3 border-t-0 text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200  text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#2563EB]  focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50  ${EachInfo.isError && " border-b-red-500 border-[1px]"
              }`}
            type="text"
            placeholder=" "
            readOnly={EachInfo.imported}
            id={EachInfo?.id || ""}
            value={EachInfo.value}
            onChange={(e) => {
              handleChange(e, ind);
            }}
          />
          <label
            className={`before:content[' '] after:content[' ']  pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-[11px] peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#2563EB] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-sky-700 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-[#2563EB] peer-disabled:text-transparent peer-disabled:before:border-[#2563EB] peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500`}
          >
            {EachInfo.isError ? (
              <span className="text-red-500">{EachInfo.label}</span>
            ) : (
              EachInfo.label
            )}
          </label>
        </div>
      )}
      {EachInfo.type == "select" && (
        <div
          className={`w-full ${width == "full" ? "lg:w-full" : "lg:w-[46%]"
            } h-fit  m-0 ${items.length % 2 != 0 && "grow"}`}
        >
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">
              {EachInfo.label}
            </InputLabel>
            <Select
              sx={{ borderRadius: 3.5, textAlign: "left" }}
              // inputProps={inputProps}
              size="small"
              disabled={EachInfo.imported}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={EachInfo.value}
              label={EachInfo.label}
              error={EachInfo.isError}
              className=" bg-white"
              onChange={(e) => {
                handleSelect(e.target.value, ind);
              }}
            >
              {EachInfo.options?.map((opt: string | OptionsSelect, ind) => {
                if (typeof opt == "string") {
                  return (
                    <MenuItem key={ind} value={opt}>
                      {opt}
                    </MenuItem>
                  );
                } else {
                  return (
                    <MenuItem key={ind} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  );
                }
              })}
            </Select>
          </FormControl>
        </div>
      )}
      {EachInfo.type == "small-select" && (
        <AntSelect
          style={{ height: 35, width: "100%" }}
          value={EachInfo.value !== "" ? EachInfo.value : undefined}
          placeholder={EachInfo.label}
          className={`${EachInfo.isError && "border-2 border-red-500 rounded-lg"
            }`}
          onChange={(e) => {
            handleSelect(e, ind);
          }}
          options={EachInfo.options?.map((curr) => {
            if (typeof curr == "string") {
              return {
                label: curr,
                value: curr,
              };
            } else {
              return {
                label: curr.label,
                value: curr.value,
              };
            }
          })}
        />
      )}
      {EachInfo.type == "search" && (
        <div
          className={`w-full ${width == "full" ? "lg:w-full" : "lg:w-[46%]"
            } h-fit  m-0 ${items.length % 2 != 0 && "grow"}`}
        >
          <FormControl
            fullWidth
            size="small"
            sx={{ borderRadius: 3.5, textAlign: "left" }}
          >
            <Autocomplete
              onClick={() => {
                if (setCallApi) {
                  setCallApi(true);
                }
              }}
              sx={{
                borderRadius: 3.5,
                textAlign: "left",
              }}
              size="small"
              disabled={EachInfo.imported}
              freeSolo
              onClose={() => { }}
              onChange={(
                e,
                newVal: string | { label: string; value: number | string }
              ) => {
                const temp = [...items];

                if (newVal === null) {
                  setLabeDiffValState("");
                }
                if (typeof newVal === "string") {
                  temp[ind].value = newVal;
                  if (typeof EachInfo.options !== "string") {
                    setLabeDiffValState(""); // Set an empty string or handle accordingly
                  }
                } else {
                  temp[ind].value = newVal.value.toString();
                  if (typeof EachInfo.options !== "string") {
                    setLabeDiffValState(newVal.label);
                  }
                }

                temp[ind].isError = false;
                if (setCallApi) {
                  setCallApi(true);
                }
                setItems(temp);
              }}
              autoComplete
              value={
                EachInfo.strict
                  ? undefined
                  : EachInfo.labeDiffVal
                    ? labeDiffValState
                    : EachInfo.value
              }
              id="free-solo-2-demo"
              disableClearable
              options={
                EachInfo.options != null
                  ? EachInfo.options!.map((option: string | OptionsSelect) => {
                    if (typeof option == "string") {
                      return option;
                    } else {
                      return option;
                    }
                  })
                  : [{ label: "No_Scheme_Template", value: "" }]
              }
              renderInput={(params) => (
                <TextField
                  className="bg-white"
                  sx={{
                    borderRadius: 3.5,
                    textAlign: "left",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "14px",
                    },
                    backgroundColor: "white",
                  }}
                  error={EachInfo.isError}
                  onChange={(e) => {
                    console.log("changed", e.target.value);
                    const temp = [...items];
                    if (temp[ind].type == "search" && temp[ind].labeDiffVal) {
                      if (EachInfo.searchWithNoSpace) {
                        if (/\s/.test(e.target.value)) {
                          temp[ind].isError = true;
                        } else {
                          temp[ind].refName = e.target.value;
                        }
                      } else {
                        temp[ind].refName = e.target.value;
                      }
                    }
                    let opts = JSON.stringify(items[ind].options);
                    if (e.target.value == "") {
                      temp[ind].value = "";
                      temp[ind].isError = true;
                      temp[ind].options = [];
                      temp[ind].options = JSON.parse(opts);
                      setItems(temp);
                    } else {
                      const temp = [...items];

                      temp[ind].value = e.target.value;
                      temp[ind].isError = false;
                      setItems(temp);
                    }
                    // if(setCallApi){
                    //     setCallApi(true)
                    // }
                  }}
                  value={EachInfo.value}
                  {...params}
                  label={EachInfo.label}
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
          </FormControl>
        </div>
      )}
      {EachInfo.type == "antSearch" && (
        <div
          className={`w-full ${width == "full" ? "lg:w-full" : "lg:w-[46%]"
            } h-fit  m-0 ${items.length % 2 != 0 && "grow"}`}
        >
          <ConfigProvider
            theme={{
              token: {
                colorBorder: `${EachInfo.isError ? "#ff4d4f" : "#b8b8b8"}`,
                colorPrimaryHover: `${EachInfo.isError ? "#ff4d4f" : "#4096ff"
                  }`,
                borderRadius: 13,
                colorTextPlaceholder: "#707070",
              },
            }}
          >
            <AntSelect
              allowClear
              onClear={() => {
                if (setIsCleared) {
                  setIsCleared(true);
                }
                console.log("test done clear", EachInfo);

                const temp = [...items];
                temp[ind].value = "";
                // temp[ind].isError = true;
                setItems([...temp]);
                // EachInfo.value = "";
              }}
              placeholder={EachInfo.label || "Bank Name"}
              // optionFilterProp="label"
              className="w-full text-start"
              // className="custom-ant-select"
              size="large"
              // style={{
              //   width: "100%",
              // }}
              showSearch
              // title={EachInfo.label}

              onSelect={() => {
                if (setCallApi) {
                  setCallApi(true);
                }
              }}
              filterOption={false}
              // value={EachInfo.value}
              value={EachInfo.value !== "" ? EachInfo.value : undefined}
              onSearch={handleSearch}
              onChange={(value) => handleAntSelect(value, ind)}
              options={filteredOptions?.map((option) =>
                typeof option === "string"
                  ? { value: option, label: option }
                  : option
              )}
            />
          </ConfigProvider>
        </div>
      )}
      {EachInfo.type == "OTP" && (
        <div
          className={`w-full py-3 px-2 ${EachInfo.isError && "border-2 rounded-lg border-red-500 "
            } ${width == "full" ? "lg:w-full" : "lg:w-[46%]"} h-fit  m-0 ${items.length % 2 != 0 && "grow"
            }`}
        >
          <InputOTP
            size="small"
            inputType="numeric"
            inputStyle={{ height: "37px" }}
            onChange={(val) => {
              setOtpValues(val);
              const temp = [...items];
              temp[ind].value = val.join("");
              temp[ind].isError = false;

              setItems(temp);
            }}
            value={otpValues}
          />
        </div>
      )}
    </>
  );
};

export default EachFeild;
