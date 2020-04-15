import { Link } from "gatsby";
import React, { ReactElement } from "react";
import BottomCta from "../components/bottom-cta";
import Hero from "../components/hero";
import PlaylistsSection from "../components/Home/playlists-section";
import Layout from "../components/layout";
import SEO from "../components/seo";

const HomePage = (): ReactElement => (
  <Layout showBanner>
    <SEO title="Local Islamic Videos" />
    <Hero
      title="Watch local Islamic content"
      subtext="Our local asatizah have been hard at work in producing online contents to ensure that we can continue to seek religious knowledge in this uncertain time. We curate them here to support their efforts."
    />
    <div className="max-w-xs md:max-w-sm mx-auto">
      <ul className="flex">
        <li className="flex-1 mr-4">
          <a
            className="text-center block border border-teal-500 rounded py-2 px-4 bg-teal-500 hover:bg-teal-500 text-white cursor-pointer"
            href="#playlists"
          >
            Video Playlists
          </a>
        </li>
        <li className="flex-1">
          <Link
            to={"/live"}
            className="text-center block border border-teal-500 rounded hover:border-gray-200 text-teal-500 hover:bg-teal-500 hover:text-white py-2 px-4 cursor-pointer"
          >
            Live Talks
          </Link>
        </li>
      </ul>
    </div>
    <PlaylistsSection />
    <BottomCta />
  </Layout>
);

export default HomePage;
