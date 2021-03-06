require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

/* eslint-disable @typescript-eslint/camelcase */

module.exports = {
  siteMetadata: {
    title: "kuliah.sg",
    titleTemplate: "%s | kuliah.sg",
    description: "Watch local Islamic contents from the comfort of your home.",
    author: "Hafidz & Fatiha",
    url: "https://www.kuliah.sg", // No trailing slash allowed!
    image: "/share-banner.jpg", // Path to your image you placed in the 'static' folder
  },
  plugins: [
    "gatsby-plugin-typescript",
    "gatsby-plugin-postcss",
    "gatsby-plugin-offline",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-google-gtag",
      options: {
        trackingIds: [process.env.GATSBY_GA_TRACKING_ID],
        gtagConfig: {
          anonymize_ip: true,
        },
        pluginConfig: {
          head: true,
        },
      },
    },
    {
      resolve: "gatsby-source-data",
      options: {
        youtubeApiKey: process.env.GATSBY_GOOGLE_API_KEY,
        sheetsApiKey: process.env.GATSBY_GOOGLE_API_KEY,
        useLocal: process.env.GATSBY_USE_LOCAL_DATA || false,
      },
    },
    {
      resolve: "gatsby-plugin-remote-images",
      options: {
        nodeType: "Playlist",
        imagePath: "thumbnailUrl",
      },
    },
    {
      resolve: "gatsby-plugin-remote-images",
      options: {
        nodeType: "Video",
        imagePath: "thumbnailUrl",
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "kuliah.sg",
        short_name: "kuliah.sg",
        start_url: "/",
        background_color: "#F7FAFC",
        theme_color: "#38B2AC",
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: "standalone",
        icon: "static/app-icon.png", // This path is relative to the root of the site.
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
  ],
};
