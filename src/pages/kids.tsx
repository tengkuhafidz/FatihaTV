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
          <Link
            to={"/"}
            className="text-center block border border-teal-500 rounded hover:border-gray-200 text-teal-500 hover:bg-teal-500 hover:text-white py-2 px-4 cursor-pointer"
          >
            General Videos
          </Link>
        </li>
        <li className="flex-1">
          <a
            className="text-center block border border-teal-500 rounded py-2 px-4 bg-teal-500 hover:bg-teal-500 text-white"
            href="#liveSessions"
          >
            For Kids
          </a>
        </li>
      </ul>
    </div>
    <PlaylistsSection audience="kids" />
    <BottomCta />
  </Layout>
);

export default HomePage;
