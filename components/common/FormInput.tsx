import React from "react";
import { HTMLInputTypeAttribute } from "react";

interface Props {
  type: string;
  placeholder: string;
  id: string;
  value: string | number;
  label?: string;
  onChange: any;
  required?: boolean;
}

const FormInput = ({ type, placeholder, id, value, onChange, label, required = false }: Props) => {
  if (label) {
    return (
      <div className="space-y-2">
        <label htmlFor={id} className="font-bold">
          {label}
        </label>
        <input type={type} placeholder={placeholder} id={id} name={id} value={value} onChange={onChange} className="w-full px-7 py-4 rounded-full border-none bg-gray-100" required={required} />
      </div>
    );
  }

  return <input type={type} placeholder={placeholder} id={id} name={id} value={value} onChange={onChange} className="w-full px-7 py-4 rounded-full border-none bg-gray-100" required={required} />;
};

export default FormInput;
