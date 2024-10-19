import { Feilds } from "@/pages/shiksha/explore/[Type]";

export const clearVals = (
    items: any[],
    setItems: React.Dispatch<React.SetStateAction<any[]>>
  ) => {
    const temp = [...items];
  
    temp.map((curr) => {
      (curr.value = ""), (curr.isError = false);
      if (curr.type == "OTP" && curr.clearData == false) {
        console.log("hitten");
        curr.clearData = true;
      }
      if (curr.type == "search" && curr.clearValue  == false) {
        curr.clearValue = true;
        temp[0].value = "";
      }
      if (curr.type == "antSearch" && curr.clearValue  == false) {
        curr.clearValue = true;
        temp[0].value = "";
      }
    });
    setItems(temp);
  };
  

  export function velidateForm(
    items: Feilds[],
    setItems: React.Dispatch<React.SetStateAction<Feilds[]>>
  ) {
    const tempInfo = [...items];
    tempInfo.map((curr) => {
      if (
        (curr.regexPattern?.whole && curr.type == "text") ||
        curr.type == "OTP" ||
        curr.type == "small-text"
      ) {
        if (!curr.regexPattern?.whole.test(curr.value)) {
          curr.isError = true;
        } else {
          curr.isError = false;
        }
      } else {
        if (curr.value == "" || !curr.value) {
          curr.isError = true;
        } else {
          curr.isError = false;
        }
      }
      if (curr.type == "hidden") {
        curr.isError = false;
        curr.value = "";
      }
    });
    setItems([...tempInfo]);
    const itemsErr = items.find((each) => each.isError == true);
    return !itemsErr;
  }