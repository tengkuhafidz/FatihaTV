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
      subtext="Our local asatizah have been hard at work in producing online content to ensure that we can continue to seek religious knowledge in this uncertain time. We curate them here to support their efforts."
    />
    <PlaylistsSection />
    <BottomCta />
  </Layout>
);

export default HomePage;
