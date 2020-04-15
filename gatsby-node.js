exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  // Query for nodes to use in creating pages.
  const result = await graphql(
    `
      {
        allPlaylist {
          edges {
            node {
              channelTitle
              donationUrl
              id
              language
              organisationName
              publishedAt
              tags
              thumbnailUrl
              title
              videos {
                id
                publishedAt
                title
              }
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
  result.data.allPlaylist.edges.forEach(({ node: playlist }) => {
    playlist.videos.forEach(currentVideo => {
      createPage({
        path: `/watch/${playlist.id}/${currentVideo.id}`,
        component: require.resolve("./src/templates/watch.tsx"),
        context: { playlist, currentVideo },
      });
    });
  });
};
