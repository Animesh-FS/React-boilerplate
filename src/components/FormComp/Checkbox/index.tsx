import React from "react";

interface checkboxProps {
  name: string;
  label?: string;
  value?: boolean;
  disabled?: boolean;
  onSelect?: (value: boolean) => void;
}
const Checkbox = ({
  name,
  label,
  value = false,
  disabled = false,
  onSelect = () => {},
}: checkboxProps) => {
  const handleChange = (value: boolean) => {
    if (!disabled) onSelect(value);
  };

  return (
    <div className="inline-flex items-center">
      <input
        type="checkbox"
        name={name}
        checked={value}
        className={`${value ? "accent-blue-900" : ""} ${
          disabled ? "disabled:bg-neutrals-100" : ""
        }`}
        onChange={() => handleChange(!value)}
        disabled={disabled}
      />
      {label && (
        <label
          className={`ml-3 ${disabled ? "text-neutrals-100" : "text-blue-100"}`}
        >
          {label}
        </label>
      )}
    </div>
  );
};
export default Checkbox;
export { Checkbox };
