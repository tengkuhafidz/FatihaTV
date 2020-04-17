import React, { ReactElement } from "react";

const Footer = (): ReactElement => (
  <div className="text-white bg-gray-800">
    <div className="p-16 grid md:grid-cols-3 gap-8">
      <div className="hidden md:block">
        <h4 className="font-semibold text-xl mb-4">About</h4>
        <p className="text-gray-200">
          {" "}
          euqghf q;ehf o;qeuhqefb qehbfg qebhfge qfhqeoifh qef qeklfn qeo;hfn
          qeklnf eqohf qelnf qeofh qenf qeohnf qejhf qeufg qekfgqe f.
        </p>
      </div>
      <div className="mx-auto">
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
      <div>
        <h4 className="font-semibold text-xl mb-4 text-center md:text-left">
          Subscribe to Newsletter
        </h4>
        <p className="hidden md:block text-gray-200">
          Get updated on our content and features
        </p>
        <form className="w-full max-w-sm mt-4">
          <div className="flex items-center">
            <input
              className="bg-gray-200 rounded-l w-full py-2 md:py-3 px-2 text-gray-800 leading-tight focus:outline-none focus:bg-white border-2 border-gray-200 focus:border-teal-500"
              id="inline-full-name"
              type="text"
              placeholder="Your Email"
            />
            <button
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 border-4 text-white py-1 md:py-2 px-2 rounded-r"
              type="button"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
    <div className="py-4 bg-gray-900 text-gray-200">
      <p className="text-center font-light text-sm">&copy; 2020 kuliah.sg</p>
    </div>
  </div>
);

export default Footer;
