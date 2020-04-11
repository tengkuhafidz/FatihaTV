const { getPlaylists, getOrganisationData } = require('./main')


exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions;
  delete configOptions.plugins;

  const processPlaylistDatum = (datum) => {
    const nodeData = Object.assign({}, datum, {
      parent: null,
      children: [],
      internal: {
        type: 'Playlist',
        content: JSON.stringify(datum),
        contentDigest: createContentDigest(datum),
      },
    });
    return nodeData;
  };

  const processOrgDatum = (datum) => {
    const nodeData = Object.assign({}, datum, {
      id: createNodeId(`organisation-${datum.name}`), // Use youtube playlist id instead.
      parent: null,
      children: [],
      internal: {
        type: 'Organisation',
        content: JSON.stringify(datum),
        contentDigest: createContentDigest(datum),
      },
    });
    return nodeData;
  };

  const orgData = await getOrganisationData(configOptions.sheetsApiKey, configOptions.useLocal);
  const playlists = await getPlaylists(orgData, configOptions.youtubeApiKey, configOptions.useLocal);

  // Creates a new node for each playlist in array.
  playlists.forEach(datum => createNode(processPlaylistDatum(datum)));
  // Creates a new node for each organisation in array.
  orgData.forEach(datum => createNode(processOrgDatum(datum)))
};
