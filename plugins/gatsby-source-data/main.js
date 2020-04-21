const ytChannels = require("../../src/json-data/youtube-channels.json");
const Youtube = require("./youtube").Youtube;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");
const dataDir = './src/data/';

const saveData = (data, name) => {
  try {
    if(!fs.existsSync(dataDir)){
      fs.mkdirSync(dataDir);
    }
    const path = dataDir + name
    fs.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};

const loadData = name => {
  try {
    const path = dataDir + name
    return JSON.parse(fs.readFileSync(path, "utf8"));
  } catch (err) {
    console.error(err);
    return false;
  }
};

const dataExists = name => {
  return fs.existsSync(dataDir + name)
}

const getPlaylistsFromYoutube = async (apiKey) => {
  const yt = new Youtube(apiKey);

  // Create array of promises to get playlists from org youtube channels.
  const getPlaylists = await ytChannels.map(channel => yt.getChannelPlaylists(channel.id))

  // Get all playlists on each channel.
  let channelPlaylists = await Promise.all(getPlaylists)

  // Flatten array of arrays. Now its a single array of playlists. 
  let playlists = channelPlaylists
    .reduce((acc, val) => acc.concat(val), [])

  // Create array of promises to get videos from playlists.
  const getVideos = playlists.map(playlist => yt.getPlaylistVideos(playlist.id));
  
  // Get all videos of each playlist.
  let playlistVideos = await Promise.all(getVideos);

  // Filter out private videos, and reshape video object.
  playlistVideos = playlistVideos.map(videos => {
    return (
      videos
        .filter(video => video.snippet.title !== 'Private video' && video.snippet.title !== 'Deleted video')
        .map(video => {
          return (
            {
              id: video.snippet.resourceId.videoId,
              title: video.snippet.title,
              description: video.snippet.description,
              publishedAt: video.snippet.publishedAt,
              thumbnailUrl: video.snippet.thumbnails.medium.url,
            }
          )
        })
    )
  })

  // Reshape playlist object in array of playlists.
  // Also include videos key, which is taken from playlistVideos
  playlists = playlists
    .map((playlist, index) => {
      const updatedAt = playlistVideos[index].reduce((date, video) =>
        video.publishedAt > date ? video.publishedAt : date, new Date(0).toISOString())
      return {
        id: playlist.id,
        title: playlist.snippet.title,
        channelTitle: playlist.snippet.channelTitle,
        channelId: playlist.snippet.channelId,
        publishedAt: playlist.snippet.publishedAt,
        thumbnailUrl: playlist.snippet.thumbnails.medium.url,
        updatedAt,
        videos: playlistVideos[index],
      }
    })

  console.log(">>> YouTube API Quota Units used:", yt.usedQuota);
  return playlists;
};

const getPlaylists = async (youtubeApiKey, useLocal) => {
  // This path is relative to the root "gatsby-node.js" file calling it.
  const dataPath = "playlists.json";
  let playlists = {};

  if (useLocal && dataExists(dataPath)) {
    console.log(">>> Found local playlist data files.");
    playlists = loadData(dataPath);
  } else {
    if (useLocal) console.log(">>> Local playlist data not found.");

    console.log(">>> Retrieving data from YouTube.");
    playlists = await getPlaylistsFromYoutube(youtubeApiKey);
    if (useLocal) {
      saveData(playlists, dataPath);
      console.log(">>> Youtube data saved locally for future use.");
    }
  }

  return playlists;
};

exports.getPlaylists = getPlaylists;