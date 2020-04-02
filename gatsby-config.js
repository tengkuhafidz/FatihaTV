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
    'gatsby-plugin-typescript',
    'gatsby-plugin-postcss',
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
      {
        resolve: `gatsby-plugin-google-gtag`,
        options: {
          trackingIds: [
            "UA-162017890-1",
          ],
          gtagConfig: {
            anonymize_ip: true,
          },
          pluginConfig: {
            head: true,
          },
        },
      },
      {
        resolve: `gatsby-plugin-manifest`,
        options: {
          name: `kuliah.sg`,
          short_name: `kuliah.sg`,
          start_url: `/`,
          background_color: `#F7FAFC`,
          theme_color: `#38B2AC`,
          // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
          // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
          display: `standalone`,
          icon: `static/app-icon.png`, // This path is relative to the root of the site.
        },
      },
  ],
}