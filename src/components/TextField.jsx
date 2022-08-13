import React, { useState } from "react";
import { useField } from "formik";
import { GrFormViewHide, GrFormView } from "react-icons/Gr";

const TextField = ({ label, type, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  const [show, setShow] = useState(false);
  const [field, meta] = useField(props);

  const TogglePwd = () => {
    if (type === "password") {
      if (show) {
        return (
          <GrFormView
            onClick={() => setShow((prevState) => !prevState)}
            className="absolute right-4 text-[25px] cursor-pointer"
          />
        );
      } else
        return (
          <GrFormViewHide
            onClick={() => setShow((prevState) => !prevState)}
            className="absolute right-4 text-[25px] cursor-pointer"
          />
        );
    }
  };

  const setText = () => {
    if (type == "password") {
      if (show) return "text";
      else return "password";
    }
    return "text";
  };

  return (
    <div className="w-full">
      {label && <label htmlFor={props.id || props.name}>{label}</label>}
      <div className="flex relative items-center">
        <input
          type={setText()}
          autoComplete="off"
          className="w-full focus:outline-none border border-solid border-[#e4e4e4] p-[20px] rounded-[5px] text-[#8a8a8a]"
          {...field}
          {...props}
        />
        <TogglePwd />
      </div>
      {meta.touched && meta.error ? (
        <div className="pt-2 text-[13px] text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default TextField;
