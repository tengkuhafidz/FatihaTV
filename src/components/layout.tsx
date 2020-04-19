import React from "react";
import { enableSmoothScroll } from "../utils";
import DonationBanner from "./banner";
import Footer from "./footer";
import Header from "./header";
import BackToTop from "./back-to-top";
import Helmet from "react-helmet";

enableSmoothScroll();

interface Props {
  children: React.ReactNode;
  showBanner?: boolean;
}

const Layout: React.FC<Props> = ({ children, showBanner = false }) => (
  <div className="min-h-screen bg-gray-200 overflow-x-hidden">
    <Header />
    <DonationBanner showBanner={showBanner} />
    <main>{children}</main>
    <Footer />
    <BackToTop />
    <Helmet>
      <script
        defer
        id="io.birdseed.script-tag"
        type="text/javascript"
        src="https://cdn.birdseed.io/widget.js"
      ></script>
      <div
        id="birdseed-widget-container"
        data-token="64c3d69ae1d63222e211a82aefc2ea8f"
      ></div>
    </Helmet>
  </div>
);

export default Layout;
