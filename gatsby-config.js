module.exports = {
  siteMetadata: {
    title: "FatihaTV",
    description: "Watch local Islamic content from the comfort of your home.",
    url: "https://www.fatihatv.com", // No trailing slash allowed!
    image: "/images/fatihatv.jpg", // Path to your image you placed in the 'static' folder
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-postcss',
      {
        resolve: `gatsby-plugin-google-gtag`,
        options: {
          trackingIds: [
            "UA-162017890-1",
          ],
        },
      },
  ],
}