import React from "react";

const FormGroup = ({
  label,
  placeholder,
  name,
  type = "text",
  required = false,
  value,
  setValue,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default FormGroup;
