import React, { ReactElement } from "react";
import NewsletterForm from "./newsletter-form";
import { OutboundLink } from "gatsby-plugin-google-gtag";
import { FaEnvelope } from "react-icons/fa";
import { gtagEventClick } from "../../utils/gtag";
import { GtagCategories } from "../../models";

const Footer = (): ReactElement => {
  const handleEmailClick = (): void => {
    gtagEventClick("click_email", {
      event_category: GtagCategories.Engagement,
      event_label: "hello@kuliah.sg",
    });
  };

  return (
    <div className="text-white bg-gray-800">
      <div className="py-16 px-8 lg:p-16 grid lg:grid-cols-3 gap-8">
        <div className="hidden lg:block" id="footer-about">
          <h4 className="font-semibold text-xl mb-4">About</h4>
          <p className="text-gray-200">
            kuliah.sg is a one-stop platform for local Islamic online content.
            We were inspired by our asatizah who have been tirelessly producing
            online content for our benefit. So we curate them here to support
            their efforts.
          </p>
        </div>
        <div className="mx-auto" id="footer-collaborators">
          <h4 className="font-semibold text-xl text-center mb-4">
            In Collaboration With
          </h4>
          <img
            src="https://media.devlabs.academy/file/h_128/kuliahsg/assets/ourmosque_logo.png"
            className="h-32 inline"
          />
          <img
            src="https://media.devlabs.academy/file/h_128/kuliahsg/assets/msociety_logo.png"
            className="h-32 inline opacity-75"
          />
        </div>
        <NewsletterForm />
      </div>
      <div className="py-4 bg-gray-900 text-gray-200">
        <p className="text-center font-light text-sm">
          <span className="mr-2">&copy; 2020 kuliah.sg</span>|
          <OutboundLink
            href="mailto:hello@kuliah.sg"
            className="hover:text-teal-500"
            onClick={handleEmailClick}
          >
            <FaEnvelope className="inline ml-2 mr-1 hover:text-teal-500" />
            hello@kuliah.sg
          </OutboundLink>
        </p>
      </div>
    </div>
  );
};

export default Footer;
