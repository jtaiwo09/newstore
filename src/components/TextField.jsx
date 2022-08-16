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
    <div className="w-full box-border">
      {label && <label htmlFor={props.id || props.name}>{label}</label>}
      <div className="flex relative items-center">
        <input
          type={setText()}
          autoComplete="off"
          className="w-full h-[50px] focus:outline-none border border-solid border-[#000]/30 px-4 rounded-[5px] placeholder::text-[#8a8a8a]"
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
