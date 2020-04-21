import { OutboundLink } from "gatsby-plugin-google-gtag";
import React from "react";
import { gtagEventClick } from "../utils/gtag";
import { GtagCategories } from "../models";

interface Props {
  showBanner: boolean;
}

const DonationBanner: React.FC<Props> = ({ showBanner }) => {
  const handleBannerClick = (): void => {
    gtagEventClick("click_kuliahsg_banner", {
      event_category: GtagCategories.Engagement,
      event_label: "https://kuliah.sg"
    });
  };

  if (!showBanner) {
    return <></>;
  }

  return (
    <OutboundLink
      href="https://kuliah.sg"
      target="_blank"
      rel="noopener"
      onClick={handleBannerClick}
    >
      <div
        className="flex items-center bg-teal-800 text-white text-sm px-8 py-3 hover:shadow-xl cursor-pointer"
        role="alert"
      >
        <p className="text-center text-sm">
          {" "}
          Watch frequently updated content from Singapore 🇸🇬
        </p>
      </div>
    </OutboundLink>
  );
};

export default DonationBanner;
