import React from "react";
import { enableSmoothScroll } from "../utils";
import DonationBanner from "./banner";
import Footer from "./footer";
import Header from "./header";
import BackToTop from "./back-to-top";

enableSmoothScroll();

interface Props {
  children: React.ReactNode;
  showBanner?: boolean;
}

const Layout: React.FC<Props> = ({ children, showBanner = false }) => (
  <div className="min-h-screen bg-gray-100 overflow-x-hidden">
    <Header />
    <DonationBanner showBanner={showBanner} />
    <main>{children}</main>
    <Footer />
    <BackToTop />
  </div>
);

export default Layout;
