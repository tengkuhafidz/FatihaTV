import { Link } from "gatsby";
import React, { ReactElement } from "react";
import BottomCta from "../components/bottom-cta";
import Hero from "../components/hero";
import PlaylistsSection from "../components/Home/playlists-section";
import Layout from "../components/layout";
import SEO from "../components/seo";

const HomePage = (): ReactElement => (
  <Layout showBanner>
    <SEO title="Islamic Videos" />
    <Hero
      title="Want a productive Ramadan?"
      secondTitle="Watch beneficial content on FatihaTV."
      subtext="This Ramdan, let's pledge to consume more beneficial content than entertainment. We organise playlists from reputable Islamic Youtube channels in one platform so that we can watch them here with no distractions."
    />
    <div className="max-w-xs md:max-w-sm mx-auto">
      <ul className="flex">
        <li className="flex-1 mr-4">
          <a
            className="text-center block border border-teal-500 rounded py-2 px-4 bg-teal-500 hover:bg-teal-500 text-white cursor-pointer"
            href="#playlists"
          >
            General Videos
          </a>
        </li>
        <li className="flex-1">
          <Link
            to={"/kids"}
            className="text-center block border border-teal-500 rounded hover:border-gray-200 text-teal-500 hover:bg-teal-500 hover:text-white py-2 px-4 cursor-pointer"
          >
            For Kids
          </Link>
        </li>
      </ul>
    </div>
    <PlaylistsSection audience="general" />
    <BottomCta />
  </Layout>
);

export default HomePage;
