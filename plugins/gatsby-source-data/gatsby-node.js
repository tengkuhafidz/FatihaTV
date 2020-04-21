const { getPlaylists } = require('./main')

exports.onCreateNode = async ({ node, actions }) => {
  if (node.internal.type !== 'Playlist') {
    return
  }

  const { createNode, createParentChildLink } = actions
  node.videos.map(video => Object.assign({}, video, {
    parent: node.id,
    children: [],
    internal: {
      type: 'Video',
      content: JSON.stringify(video),
      contentDigest: `${node.internal.contentDigest}`,
    },
  })).forEach(childNode => {
    createNode(childNode)
    createParentChildLink({ parent: node, child: childNode })
  })
}

exports.sourceNodes = async (
  { actions, createContentDigest },
  configOptions
) => {
  const { createNode } = actions;
  delete configOptions.plugins;

  const processPlaylistDatum = (datum) => {
    const nodeData = Object.assign({}, datum, {
      parent: null,
      children: datum.videos.map(v => v.id),
      internal: {
        type: 'Playlist',
        content: JSON.stringify(datum),
        contentDigest: createContentDigest(datum),
      },
    });
    return nodeData;
  };

  const playlists = await getPlaylists(configOptions.youtubeApiKey, configOptions.useLocal);
  // Creates a new node for each data source.
  playlists.forEach(datum => createNode(processPlaylistDatum(datum)));
};
