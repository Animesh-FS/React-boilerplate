import React, { ChangeEvent, SyntheticEvent } from "react";

interface textFieldProps {
  name: string;
  value: string;
  onInput?: (value: string) => void;
}

const TextField = ({ name, value, onInput }: textFieldProps) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (onInput) {
      onInput(e.target.value);
    }
  };

  return (
    <input
      name={name}
      value={value}
      onChange={onChangeHandler}
      className="border border-neutrals-400 rounded p-1 w-72 ml-4 focus-visible:outline-neutrals-400"
      autoComplete="off"
    />
  );
};

export default TextField;
export { TextField };
