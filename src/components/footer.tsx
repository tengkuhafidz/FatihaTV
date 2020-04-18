import React, { ReactElement } from "react";
import NewsletterForm from "./footer/newsletter-form";

const Footer = (): ReactElement => (
  <div className="text-white bg-gray-800">
    <div className="py-16 px-8 md:p-16 grid md:grid-cols-3 gap-8">
      <div className="hidden md:block" id="footer-about">
        <h4 className="font-semibold text-xl mb-4">About</h4>
        <p className="text-gray-200">
          {" "}
          euqghf q;ehf o;qeuhqefb qehbfg qebhfge qfhqeoifh qef qeklfn qeo;hfn
          qeklnf eqohf qelnf qeofh qenf qeohnf qejhf qeufg qekfgqe f.
        </p>
      </div>
      <div className="mx-auto" id="footer-collaborators">
        <h4 className="font-semibold text-xl text-center mb-4">
          In Collaboration With
        </h4>
        <img
          src="https://media.devlabs.academy/file/kuliahsg/assets/ourmosque_logo.png"
          className="h-32 inline"
        />
        <img
          src="https://media.devlabs.academy/file/kuliahsg/assets/msociety_logo.png"
          className="h-32 inline opacity-75"
        />
      </div>
      <NewsletterForm />
    </div>
    <div className="py-4 bg-gray-900 text-gray-200">
      <p className="text-center font-light text-sm">&copy; 2020 kuliah.sg</p>
    </div>
  </div>
);

export default Footer;
