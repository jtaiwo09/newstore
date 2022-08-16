import { useEffect, useState } from "react";

const Alert = ({ children, type, show }) => {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (show) setIsShow(true);
    setTimeout(() => setIsShow(false), 5000);
    return () => clearTimeout();
  }, [show]);

  return (
    <>
      {isShow && (
        <div
          className={`${
            type === "error"
              ? "bg-red-400 animate__animated animate__shakeX"
              : type === "success"
              ? "bg-green-300"
              : type === "warning"
              ? "bg-orange-200"
              : ""
          } text-white mb-5 rounded-[5px] py-4 px-3 flex`}
        >
          <span className="font-[500]">{children}</span>
        </div>
      )}
    </>
  );
};

Alert.defaultProps = {
  show: false,
};

export default Alert;
