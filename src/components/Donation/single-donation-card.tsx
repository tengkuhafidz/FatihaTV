import React from "react";
import { DonationListingModel } from "../../models";
import DonationMethod from "./donation-method";

interface Props {
  donationData: DonationListingModel;
}

const SingleDonationCard: React.FC<Props> = ({ donationData }) => {
  const { organisation_name, paynow_uen, bank_account } = donationData;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white hover:scale-110 hover:shadow-xl transform hover:scale-110 border-2">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{organisation_name}</div>
        <DonationMethod methodKey="paynow_uen" methodValue={paynow_uen} />
        <DonationMethod methodKey="bank_account" methodValue={bank_account} />
      </div>
    </div>
  );
};

export default SingleDonationCard;
