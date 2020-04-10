const { getAllPlaylistWithVideos } = require('./utils')

exports.sourceNodes = async (
  { actions, createContentDigest },
  configOptions
) => {
  const { createNode } = actions;
  delete configOptions.plugins;

  const processDatum = playlist => {
    const nodeData = Object.assign({}, playlist, {
      // id: createNodeId(`youtube-playlist-${playlist.id}`), // Use youtube playlist id instead.
      parent: null,
      children: [],
      internal: {
        type: `Playlist`,
        content: JSON.stringify(playlist),
        contentDigest: createContentDigest(playlist),
      },
    });
    return nodeData;
  };

  const playlists = await getAllPlaylistWithVideos(configOptions.apiKey, configOptions.useLocal);

  // Creates a new node for each playlist in array.
  playlists.forEach(datum => createNode(processDatum(datum)));
};
