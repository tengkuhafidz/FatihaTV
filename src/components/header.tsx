import { navigate } from "gatsby";
import React, { ReactElement, useState } from "react";
import {
  FaAngleDown,
  FaFacebookSquare,
  FaTelegramPlane,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { getSocialMediaShareUrls } from "../utils";
import { gtagEventClick } from "../utils/gtag";
import { OutboundLink } from "gatsby-plugin-google-gtag";
import { GtagCategories } from "../models";

const Header = (): ReactElement => {
  // check if the site is on client side to ensure window is available
  const hasWindow = typeof window !== "undefined";
  const currentUrl = hasWindow ? window.location.href : "https://kuliah.sg";
  const {
    facebookShareUrl,
    whatsappShareUrl,
    telegramShareUrl,
    twitterShareUrl,
  } = getSocialMediaShareUrls(currentUrl);

  const [isOpen, setIsOpen] = useState(false);

  const trackOpenShareDropdown = (): void => {
    if (isOpen) {
      gtagEventClick("open_share_dropdown", {
        event_category: GtagCategories.Engagement,
        event_label: currentUrl,
      });
    }
  };

  const trackSharePage = (sharePlatform: string): void => {
    gtagEventClick(sharePlatform, {
      event_category: GtagCategories.Engagement,
      event_label: currentUrl,
    });
  };

  const handleShareDropdownClick = (): void => {
    setIsOpen(!isOpen);
    trackOpenShareDropdown();
  };

  return (
    <nav className="flex items-center justify-between flex-wrap p-6 bg-gray-800 w-full">
      <div
        className="flex items-center flex-shrink-0 mr-6 cursor-pointer"
        onClick={(): Promise<void> => navigate("/")}
      >
        <img src="/kuliahsg-logo-long-light.png" className="h-12" />
      </div>
      <div className="flex-grow"></div>

      <div>
        <button
          className="block text-sm px-4 py-3 border rounded border-gray-200 text-gray-200 hover:border-teal-500 hover:text-white hover:bg-teal-500 lg:mt-0 uppercase"
          onClick={handleShareDropdownClick}
        >
          Share page
          <FaAngleDown className="-mt-1 ml-2 inline align-middle" />
        </button>
        <div
          className={`bg-white rounded shadow-xl absolute ${
            isOpen ? "block" : "hidden"
          }`}
          style={{ zIndex: 1000 }}
        >
          <OutboundLink
            href={facebookShareUrl}
            target="_blank"
            rel="noopener"
            className="block px-4 py-2 text-gray-800 hover:bg-teal-500 hover:text-gray-100"
            onClick={(): void => trackSharePage("share_facebook")}
          >
            <FaFacebookSquare className="-mt-1 inline align-middle mr-2" />
            Facebook
          </OutboundLink>
          <OutboundLink
            href={whatsappShareUrl}
            target="_blank"
            rel="noopener"
            className="block px-4 py-2 text-gray-800 hover:bg-teal-500 hover:text-gray-100"
            onClick={(): void => trackSharePage("share_whatsapp")}
          >
            <FaWhatsapp className="-mt-1 inline align-middle mr-2" />
            Whatsapp
          </OutboundLink>
          <OutboundLink
            href={telegramShareUrl}
            target="_blank"
            rel="noopener"
            className="block px-4 py-2 text-gray-800 hover:bg-teal-500 hover:text-gray-100"
            onClick={(): void => trackSharePage("share_telegram")}
          >
            <FaTelegramPlane className="-mt-1 inline align-middle mr-2" />
            Telegram
          </OutboundLink>
          <OutboundLink
            href={twitterShareUrl}
            target="_blank"
            rel="noopener"
            className="block px-4 py-2 text-gray-800 hover:bg-teal-500 hover:text-gray-100"
            onClick={(): void => trackSharePage("share_twitter")}
          >
            <FaTwitter className="-mt-1 inline align-middle mr-2" />
            Twitter
          </OutboundLink>
        </div>
      </div>
    </nav>
  );
};

export default Header;
