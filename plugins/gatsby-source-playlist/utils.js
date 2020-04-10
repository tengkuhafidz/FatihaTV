// eslint-disable-next-line @typescript-eslint/no-var-requires
const channelMap = require("./channel-map.json");
const Youtube = require("./youtube").Youtube;
const fs = require('fs')

const getAllPlaylistWithVideosFromYoutube = async apiKey => {
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
        donationMethod: "<Donation Method>",  // TODO: Pull from some nap.
        tags: "tags,to,be,implemented",       // TODO: Parse from description?
        platform: "YouTube",
        pageUrl: channel.pageUrl,
        thumbnailUrl: playlist.snippet.thumbnails.medium.url, // Encountered error: thumbnails key (i.e. thumbnails.standard) may not exist.
      };
      const playlistVideos = await yt.getPlaylistVideos(playlist.id);
      const videosArr = playlistVideos.map(video => {
        return {
          id: video.snippet.resourceId.videoId,
          playlistId: video.snippet.playlistId,
          title: video.snippet.title,
          asatizah: "<Asatizah name>",        // TODO: Parse from description/title?
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
  console.log(">>> YouTube API Quota Units used:", yt.usedQuota);
  return allPlaylistWithVideos;
};

const getAllPlaylistWithVideos = async (apiKey, useLocal) => {
  // This path is relative to the root "gatsby-node.js" file calling it.
  const DATA_PATH = process.env.DATA_PATH || './playlist.cache.json';
  let playlists = {}
  if(useLocal && fs.existsSync(DATA_PATH)){
    console.log(">>> Found local data file. Using this instead of calling YouTube API.")
    playlists = loadJSON(DATA_PATH);
  } else {
    if(useLocal) console.log(">>> Local data not found.")
    console.log(">>> Retrieving data from YouTube.")
    playlists = await getAllPlaylistWithVideosFromYoutube(apiKey);
    if(useLocal){
      saveJSON(playlists, DATA_PATH);
      console.log(">>> Youtube data saved locally for future use.");
    }
  }
  
  return playlists;
} 

const saveJSON = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data))
  } catch (err) {
    console.error(err)
  }
}

const loadJSON = (path) => {
  try {
    return JSON.parse(fs.readFileSync(path, 'utf8'))
  } catch (err) {
    console.error(err)
    return false
  }
}


exports.getAllPlaylistWithVideos = getAllPlaylistWithVideos