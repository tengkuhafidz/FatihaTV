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
            FatihaTV is an initiative by the{" "}
            <OutboundLink
              href="https://kuliah.sg"
              className="cursor-pointer text-teal-500 hover:text-teal-600"
            >
              kuliah.sg
            </OutboundLink>
            &nbsp;team. We organise beneficial content from reputable Islamic
            Youtube channels on one platform. We hope that this can help us
            maximise our time in consuming beneficial content without other
            distractions.
          </p>
        </div>
        <div className="mx-auto" id="footer-collaborators">
          <h4 className="font-semibold text-xl text-center mb-4">
            Supported by
          </h4>
          <img
            src="https://media.devlabs.academy/file/h_128/FatihaTV/assets/ramadan-logo.png"
            className="h-32 inline"
          />
          <img
            src="https://media.devlabs.academy/file/h_128/kuliahsg/assets/msociety_logo.png"
            className="h-32 inline opacity-75"
          />
          <p className="mt-4">
            <OutboundLink
              href="https://www.producthunt.com/posts/fatihatv?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-fatihatv"
              target="_blank"
            >
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=195384&theme=dark"
                alt="FatihaTV - Watch Islamic content without distractions this Ramadan | Product Hunt Embed"
                style={{ width: 250, height: 54 }}
                width="250px"
                height="54px"
              />
            </OutboundLink>
          </p>
        </div>
        <NewsletterForm />
      </div>
      <div className="py-4 bg-black text-gray-200">
        <p className="text-center font-light text-sm">
          <span className="mr-2">&copy; 2020 FatihaTV</span>|
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
