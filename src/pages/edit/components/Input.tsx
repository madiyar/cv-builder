import React from "react";

interface PropsTypes {
  label: string
};

const Input:React.FC<PropsTypes> = ({ label }) => {
  return (
    <label className="label">
      <span>{label}</span>
      <input className="text-field" />
    </label>
  )
}

export default Input;