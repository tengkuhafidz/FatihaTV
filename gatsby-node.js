exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  // Query for nodes to use in creating pages.
  const result = await graphql(
    `
      {
        allPlaylist(sort: { fields: updatedAt, order: DESC }) {
          nodes {
            channelTitle
            donationUrl
            id
            updatedAt
            language
            organisationName
            publishedAt(formatString: "D MMM YYYY")
            tags
            thumbnailUrl
            title
            videos {
              id
              publishedAt(formatString: "D MMM YYYY")
              title
            }
          }
        }
      }
    `
  );

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // Create a page for each video in every playlist.
  result.data.allPlaylist.nodes.forEach(playlist => {
    playlist.videos.forEach(currentVideo => {
      createPage({
        path: `/watch/${playlist.id}/${currentVideo.id}`,
        component: require.resolve("./src/templates/watch.tsx"),
        context: { playlist, currentVideo },
      });
    });
  });
};
