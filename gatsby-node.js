exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  // Query for nodes to use in creating pages.
  const result = await graphql(
    `
      {
        allPlaylist(sort: { fields: updatedAt, order: DESC }) {
          nodes {
            channelTitle
            channelId
            id
            updatedAt
            publishedAt(formatString: "D MMM YYYY")
            thumbnailUrl
            title
            childrenVideo {
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
    playlist.childrenVideo.forEach(currentVideo => {
      createPage({
        path: `/watch/${playlist.id}/${currentVideo.id}`,
        component: require.resolve("./src/templates/watch.tsx"),
        context: { playlist, currentVideo }
      });
    });
  });
};
