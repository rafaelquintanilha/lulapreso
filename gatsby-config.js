module.exports = {
  siteMetadata: {
    title: `Lula na Cadeia`,
    description: `Descubra quanto tempo de cana resta ao ex-presidente Lula.`,
    author: `@rafaelquintanilha`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-64315802-2`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Quanto tempo resta ao Lula na cadeia?`,
        short_name: `Lula na Cadeia`,
        start_url: `/`,
        background_color: `#ff0000`,
        theme_color: `#ff0000`,
        display: `minimal-ui`,
        icon: `src/images/lula-icon.jpg`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
