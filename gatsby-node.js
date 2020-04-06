exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  // Query for nodes to use in creating pages.
  const result = await graphql(
    `
      {
        __typename
        allPlaylist {
          edges {
            node {
              donationMethod
              id
              organisation
              pageUrl
              platform
              tags
              thumbnailUrl
              title
              videos {
                addedOn
                asatizah
                id
                language
                playlistId
                title
                videoUrl
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
