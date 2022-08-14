import React, { useState } from "react";
import { useField } from "formik";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

const TextField = ({ label, type, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  const [show, setShow] = useState(false);
  const [field, meta] = useField(props);

  const TogglePwd = () => {
    if (type === "password") {
      if (show) {
        return (
          <FaRegEye
            onClick={() => setShow((prevState) => !prevState)}
            className="absolute right-5 text-[20px] cursor-pointer text-[#000]/50"
          />
        );
      } else
        return (
          <FaRegEyeSlash
            onClick={() => setShow((prevState) => !prevState)}
            className="absolute right-5 text-[20px] cursor-pointer text-[#000]/50"
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
