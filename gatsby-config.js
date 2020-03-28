module.exports = {
  siteMetadata: {
    title: "FatihaTV",
    titleTemplate: "Watch local Islamic content from the comfort of your home.",
    description:
      "Hogwarts Potions master, Head of Slytherin house and former Death Eater.",
    url: "https://www.doe.com", // No trailing slash allowed!
    image: "/images/snape.jpg", // Path to your image you placed in the 'static' folder
    twitterUsername: "@occlumency",
  },
  plugins: [
      'gatsby-plugin-typescript',
      'gatsby-plugin-postcss',
      {
          resolve: `gatsby-plugin-google-fonts`,
          options: {
            fonts: [
              `Passion One`,
              `Patrick Hand` // you can also specify font weights and styles
            ],
            display: 'swap'
          }
        }
  ],
}