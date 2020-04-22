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
    <PlaylistsSection />
    <BottomCta />
  </Layout>
);

export default HomePage;
