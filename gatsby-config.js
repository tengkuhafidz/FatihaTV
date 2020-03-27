module.exports = {
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