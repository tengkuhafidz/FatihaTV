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
      event_label: "hello@kuliah.sg"
    });
  };

  return (
    <div className="text-white bg-black">
      <div className="py-16 px-8 lg:p-16 grid lg:grid-cols-3 gap-8">
        <div className="hidden lg:block" id="footer-about">
          <h4 className="font-semibold text-xl mb-4">About</h4>
          <p className="text-gray-200">
            DeenTube is a platform that compiles popular Islamic online content.
          </p>
          <p className="text-gray-200">
            This is an initiative by&nbsp;
            <OutboundLink
              href="https://kuliah.sg"
              className="cursor-pointer text-teal-500 hover:text-teal-600"
            >
              kuliah.sg
            </OutboundLink>
            &nbsp;team
          </p>
        </div>
        <div
          className="mx-auto m-0 align-center text-center"
          id="footer-collaborators"
        >
          <h4 className="font-semibold text-xl mb-4">In Collaboration With</h4>
          <img
            src="https://media.devlabs.academy/file/h_128/kuliahsg/assets/msociety_logo.png"
            className="h-32 inline opacity-75 block"
          />
        </div>
        <NewsletterForm />
      </div>
      <div className="py-4 bg-black text-gray-200">
        <p className="text-center font-light text-sm">
          <span className="mr-2">&copy; 2020 DeenTube</span>|
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
