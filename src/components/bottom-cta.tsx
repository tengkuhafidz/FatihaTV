import React, { ReactElement, useState } from "react";
import { OutboundLink } from "gatsby-plugin-google-gtag";
import { gtagEventClick } from "../utils/gtag";
import { GtagCategories } from "../models";

const BottomCta = (): ReactElement => {
  // check if the site is on client side to ensure local storage is available
  const hasLocalSotrage: boolean = typeof Storage !== "undefined";
  const localHasClosedCta: boolean =
    hasLocalSotrage &&
    (localStorage.getItem("hasClosedKitaCareCta") === "true" || false);

  const [hasClosedCta, setHasClosedCta] = useState(localHasClosedCta);

  const trackBottomCtaClose = (): void => {
    gtagEventClick("close_bottom_cta", {
      event_category: GtagCategories.Engagement,
      event_label: "kitacare_crowdfunding_cta"
    });
  };

  const trackCtaClick = (): void => {
    gtagEventClick("click_cta_link", {
      event_category: GtagCategories.Engagement,
      event_label:
        "https://masjidwaktanjong.give.asia/campaign/kita-care-3219#/"
    });
  };

  const closeCta = (): void => {
    setHasClosedCta(true);
    localStorage.setItem("hasClosedKitaCareCta", "true");
    trackBottomCtaClose();
  };

  if (hasClosedCta) return <></>;

  return (
    <div className="fixed bottom-0 pb-8 w-full hidden md:block pointer-events-none">
      <div className="bg-gray-900 p-4 md:max-w-screen-sm rounded-lg mx-auto shadow-lg pointer-events-auto border border-gray-100">
        <strong className="font-semibold text-white text-lg">
          COVID-19 Support
        </strong>
        <span className="block sm:inline text-gray-200 ml-2">
          Contribute to #kitacare crowdfunding.{" "}
        </span>
        <button
          className="p-1 float-right ml-2 -mt-1"
          onClick={(): void => closeCta()}
        >
          <svg
            className="h-6 w-6 text-white"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <OutboundLink
          className="bg-white hover:bg-gray-200 text-gray-800 py-1 px-4 rounded float-right -mt-1 cursor-pointer"
          href="https://masjidwaktanjong.give.asia/campaign/kita-care-3219#/"
          target="_blank"
          rel="noopener"
          onClick={trackCtaClick}
        >
          Learn More
        </OutboundLink>
      </div>
    </div>
  );
};

export default BottomCta;
