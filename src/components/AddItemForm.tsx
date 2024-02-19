import { ChangeEvent, useState } from "react";
import { IconButton } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import TextField from "@mui/material/TextField";

type AddItemPropsType = {
  addItem: (title: string) => void;
};

function AddItemForm(props: AddItemPropsType) {
  const [inputData, setInputData] = useState<string>("");
  const [IsError, setIsError] = useState<boolean>(false);

  const onSetInputData = (e: ChangeEvent<HTMLInputElement>) => {
    setIsError(false);
    setInputData(e.currentTarget.value);
  };

  const onAddTask = () => {
    if (inputData.trim() === "") {
      setIsError(true);
      return;
    }
    props.addItem(inputData.trim());
    setInputData("");
  };
  return (
    <div>
      <TextField
        id="standard-basic"
        label="add text"
        variant="standard"
        type="text"
        value={inputData}
        onChange={onSetInputData}
        error={IsError}
        helperText={IsError && "Field is required"}
      />

      <IconButton color={"primary"} onClick={onAddTask}>
        <ControlPointIcon />
      </IconButton>
    </div>
  );
}

export default AddItemForm;
