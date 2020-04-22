import React from "react";
import { OutboundLink } from "gatsby-plugin-google-gtag";

interface Props {
  title: string;
  secondTitle?: string;
  subtext: string;
}

const Hero: React.FC<Props> = ({
  title,
  secondTitle = "from the comfort of your home.",
  subtext
}) => (
  <div className="max-w-xs md:max-w-6xl mx-auto md:text-center pt-8 py-16">
    <h1 className="font-sans md:font-light text-2xl md:text-5xl text-gray-200 leading-tight">
      <span className="block">{title}</span>
      <span className="font-normal text-teal-500 tracking-normal">
        {secondTitle}
      </span>
    </h1>
    <div className="md:max-w-2xl mx-auto">
      <p className="text-xl text-gray-600 font-light mt-4 ">
        {subtext}&nbsp;
        <span>
          Have a channel you want us to include? Let us know via&nbsp;
          <OutboundLink
            href="mailto:hello@kuliah.sg"
            className="hover:text-teal-500 underline"
          >
            email
          </OutboundLink>
          .
        </span>
      </p>
    </div>
  </div>
);

export default Hero;
