// eslint-disable-next-line @typescript-eslint/no-var-requires
const channelMap = require("./channel-map.json");
const Youtube = require("./youtube").Youtube;

const getAllPlaylistWithVideos = async apiKey => {
  const yt = new Youtube(apiKey);
  let allPlaylistWithVideos = [];
  for (channel of channelMap) {
    const channelPlaylists = await yt.getChannelPlaylists(channel.channelId);
    const playlistArr = [];
    for (playlist of channelPlaylists) {
      const playlistObj = {
        id: playlist.id,
        title: playlist.snippet.title,
        organisation: playlist.snippet.channelTitle,
        donationMethod: "<Donation Method>",
        tags: "tags,to,be,implemented",
        platform: "YouTube",
        pageUrl: "<Page URL>",
        thumbnailUrl: playlist.snippet.thumbnails.standard.url,
      };
      const playlistVideos = await yt.getPlaylistVideos(playlist.id);
      const videosArr = playlistVideos.map(video => {
        return {
          id: video.snippet.resourceId.videoId,
          playlistId: video.snippet.playlistId,
          title: video.snippet.title,
          asatizah: "<Asatizah name>",
          language: "english",
          addedOn: video.snippet.publishedAt,
          videoUrl:
            "https://www.youtube.com/embed/" +
            video.snippet.resourceId.videoId,
        };
      });
      playlistObj.videos = videosArr;
      playlistArr.push(playlistObj);
    }
    allPlaylistWithVideos = [...allPlaylistWithVideos, ...playlistArr];
  }
  console.log("YouTube API Quota used: ", yt.usedQuota + "~ish");
  return allPlaylistWithVideos;
};

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

  const playlists = await getAllPlaylistWithVideos(configOptions.apiKey);

  // Creates a new node for each playlist in array.
  playlists.forEach(datum => createNode(processDatum(datum)));
};
