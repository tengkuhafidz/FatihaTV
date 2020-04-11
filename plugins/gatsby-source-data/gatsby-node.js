const { getPlaylists, getOrganisationData, getLiveSessions } = require('./main')

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

  const processLiveSessionDatum = (datum) => {
    const nodeData = Object.assign({}, datum, {
      id: createNodeId(`live-session-${datum.title}`), // Use youtube playlist id instead.
      parent: null,
      children: [],
      internal: {
        type: 'LiveSession',
        content: JSON.stringify(datum),
        contentDigest: createContentDigest(datum),
      },
    });
    return nodeData;
  }

  const orgData = await getOrganisationData(configOptions.sheetsApiKey, configOptions.useLocal);
  const playlists = await getPlaylists(orgData, configOptions.youtubeApiKey, configOptions.useLocal);
  const liveSessionData = await getLiveSessions(configOptions.sheetsApiKey, configOptions.useLocal);

  // Creates a new node for each data source.
  playlists.forEach(datum => createNode(processPlaylistDatum(datum)));
  orgData.forEach(datum => createNode(processOrgDatum(datum)));
  liveSessionData.forEach(datum => createNode(processLiveSessionDatum(datum)))
};
