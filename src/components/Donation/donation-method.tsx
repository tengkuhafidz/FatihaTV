import React from "react";

interface Props {
  methodKey: string;
  methodValue: string;
}

const DonationMethod: React.FC<Props> = ({ methodKey, methodValue }) => {
  const getMethodLabel = () => {
    switch (methodKey) {
      case "paynow_uen":
        return "Paynow UEN";
      case "bank_account":
        return "Bank Account";
    }
  };

  if (methodValue === "") {
    return <></>;
  }

  return (
    <p className="text-gray-700  text-base mt-1">
      <span className="text-gray-800 font-semibold">{getMethodLabel()}:</span>{" "}
      {methodValue}
    </p>
  );
};

export default DonationMethod;
