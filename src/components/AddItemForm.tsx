import { ChangeEvent, useState } from "react";

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
      <input
        type="text"
        value={inputData}
        onChange={onSetInputData}
        className={IsError ? "error" : ""}
      />

      <button onClick={onAddTask}>+</button>
      {IsError && <p className="error-message">Field is required</p>}
    </div>
  );
}

export default AddItemForm;
