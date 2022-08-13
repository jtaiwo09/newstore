import React from "react";
import NumberFormat from "react-number-format";

const CurrencyFormatter = ({ price }) => {
  return (
    <div>
      <NumberFormat
        value={price}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₦"}
        decimalScale={2}
        fixedDecimalScale={true}
      />
    </div>
  );
};

export default CurrencyFormatter;
