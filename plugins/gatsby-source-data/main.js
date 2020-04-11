// eslint-disable-next-line @typescript-eslint/no-var-requires
// const channelMap = require("./channel-map.json");
const Youtube = require("./youtube").Youtube;
const Sheets = require("./sheets").Sheets;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");

const dataDir = './src/data/'

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

const getLiveSessionsFromSheets = async apiKey => {
  const sheets = new Sheets(apiKey);
  const values = await sheets.getLiveSessions();
  values.shift() // Get rid of the first row which is just the title
  const keys = values.shift();
  let arr = [];
  for (let val of values){
    const obj = {}
    for (let i=0; i < val.length; i++){
      obj[keys[i]] = val[i]
    }
    obj['Date'] = obj['Date'].split(', ')[1] // Remove the day
    arr.push(obj)
  }
  return arr;
}


const getLiveSessions = async (apiKey, useLocal) => {
  const dataPath = "live_sessions.json";
  let orgData = [];
  if (useLocal && dataExists(dataPath)) {
    console.log(">>> Found local live sessions data files.");
    orgData = loadData(dataPath);
  } else {
    if (useLocal) console.log(">>> Local live sessions data not found.");
    console.log(">>> Retrieving data from Google Sheets.");
    orgData = await getLiveSessionsFromSheets(apiKey);
    if (useLocal) {
      saveData(orgData, dataPath)
      console.log(">>> Live sessions data saved locally for future use.");
    }
  }

  return orgData;
}


const getOrganisationDataFromSheets = async apiKey => {
  const sheets = new Sheets(apiKey);
  const values = await sheets.getOrganisationData();
  const keys = values.shift();
  let arr = []
  for (let val of values){
    const obj = {}
    for(let i=0; i < val.length; i++){
      obj[keys[i]] = val[i]
    }
    arr.push(obj);
  }    
  return arr;
}

const getOrganisationData = async (apiKey, useLocal) => {
  const dataPath = "organisations.json";
  let orgData = [];
  if (useLocal && dataExists(dataPath)) {
    console.log(">>> Found local organisation data files.");
    orgData = loadData(dataPath);
  } else {
    if (useLocal) console.log(">>> Local organisation data not found.");
    console.log(">>> Retrieving data from Google Sheets.");
    orgData = await getOrganisationDataFromSheets(apiKey);
    if (useLocal) {
      saveData(orgData, dataPath)
      console.log(">>> Organisation data saved locally for future use.");
    }
  }

  return orgData;
}

const getPlaylistsFromYoutube = async (orgData, apiKey) => {
  const yt = new Youtube(apiKey);
  let allPlaylistWithVideos = [];

  for (org of orgData) {
    if(org.youtubeId){
      const channelPlaylists = await yt.getChannelPlaylists(org.youtubeId);
      const playlistArr = [];

      for (playlist of channelPlaylists) {
        const playlistObj = {
          id: playlist.id,
          title: playlist.snippet.title,
          organisation: playlist.snippet.channelTitle,
          donationMethod: "<Donation Method>", // TODO: Pull from some nap.
          tags: "tags,to,be,implemented", // TODO: Parse from description?
          platform: "YouTube",
          pageUrl: org.youtubeUrl || "",
          thumbnailUrl: playlist.snippet.thumbnails.medium.url, // Encountered error: thumbnails key (i.e. thumbnails.standard) may not exist.
        };

        const playlistVideos = await yt.getPlaylistVideos(playlist.id);
        const videosArr = playlistVideos.map(video => {
          return {
            id: video.snippet.resourceId.videoId,
            playlistId: video.snippet.playlistId,
            title: video.snippet.title,
            asatizah: "<Asatizah name>", // TODO: Parse from description/title?
            language: "english",
            addedOn: video.snippet.publishedAt,
            videoUrl:
              "https://www.youtube.com/embed/" + video.snippet.resourceId.videoId,
          };
        });

        playlistObj.videos = videosArr;
        playlistArr.push(playlistObj);
      }

      allPlaylistWithVideos = [...allPlaylistWithVideos, ...playlistArr];
    }
  }

  console.log(">>> YouTube API Quota Units used:", yt.usedQuota);
  return allPlaylistWithVideos;
};

const getPlaylists = async (orgData, youtubeApiKey, useLocal) => {
  // This path is relative to the root "gatsby-node.js" file calling it.
  const dataPath = "playlists.json";
  let playlists = {};

  if (useLocal && dataExists(dataPath)) {
    console.log(">>> Found local playlist data files.");
    playlists = loadData(dataPath);
  } else {
    if (useLocal) console.log(">>> Local playlist data not found.");

    console.log(">>> Retrieving data from YouTube.");
    playlists = await getPlaylistsFromYoutube(orgData, youtubeApiKey);
    if (useLocal) {
      saveData(playlists, dataPath);
      console.log(">>> Youtube data saved locally for future use.");
    }
  }

  return playlists;
};

exports.getPlaylists = getPlaylists;
exports.getOrganisationData = getOrganisationData
exports.getLiveSessions = getLiveSessions