import React, { useEffect, useRef } from "react";
import "./styles.css";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
  showBox: boolean;
  setShowBox: React.Dispatch<React.SetStateAction<boolean>>;
}

const SubInputField: React.FC<Props> = ({
  todo,
  setTodo,
  handleAdd,
  showBox,
  setShowBox,
}) => {
  const subinputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    subinputRef.current?.focus();
  }, [showBox]);

  return (
    <form
      className="todos__single"
      onBlur={(e) => {
        handleAdd(e);
        setShowBox(!showBox);
      }}
      onSubmit={(e) => handleAdd(e)}
    >
      <input
        ref={subinputRef}
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className="todos__single--text"
      />
    </form>
  );
};

export default SubInputField;
