import { ChangeEvent, useState } from "react";

type EditableSpanPropsType = {
  title: string;
  onChange: (value: string) => void;
};

function EditableSpan(props: EditableSpanPropsType) {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  };
  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  };
  const ChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return editMode ? (
    <input
      value={title}
      onBlur={activateViewMode}
      onChange={ChangeTitleHandler}
      autoFocus
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  );
}
export default EditableSpan;
