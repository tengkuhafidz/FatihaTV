// eslint-disable-next-line @typescript-eslint/no-var-requires
// const channelMap = require("./channel-map.json");
const Youtube = require("./youtube").Youtube;
const Sheets = require("./sheets").Sheets;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");

const saveJSON = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};

const loadJSON = path => {
  try {
    return JSON.parse(fs.readFileSync(path, "utf8"));
  } catch (err) {
    console.error(err);
    return false;
  }
};


const getOrganisationDataFromSheets = async apiKey => {
  const sheets = new Sheets(apiKey);
  const values = await sheets.getOrganisationData(apiKey);
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
  const org_data_path = "./src/data/organisations.json";
  let orgData = [];
  if (useLocal && fs.existsSync(org_data_path)) {
    console.log(">>> Found local organisation data files. Using this instead of calling external APIs.");
    orgData = loadJSON(org_data_path);
  } else {
    if (useLocal) console.log(">>> Local organisation data not found.");
    console.log(">>> Retrieving data from Google Sheets.");
    orgData = await getOrganisationDataFromSheets(apiKey);
    if (useLocal) {
      saveJSON(orgData, org_data_path)
      console.log(">>> Organisation data saved locally for future use.");
    }
  }

  return orgData;
}

const getPlaylistsFromYoutube = async (orgData, apiKey) => {
  const yt = new Youtube(apiKey);
  let allPlaylistWithVideos = [];

  for (org of orgData) {
    if(org.channel_id){
      const channelPlaylists = await yt.getChannelPlaylists(org.channel_id);
      const playlistArr = [];

      for (playlist of channelPlaylists) {
        const playlistObj = {
          id: playlist.id,
          title: playlist.snippet.title,
          organisation: playlist.snippet.channelTitle,
          donationMethod: "<Donation Method>", // TODO: Pull from some nap.
          tags: "tags,to,be,implemented", // TODO: Parse from description?
          platform: "YouTube",
          pageUrl: org.page_url || "",
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
  const playlist_data_path = "./src/data/playlists.json";
  let playlists = {};

  if (useLocal && fs.existsSync(playlist_data_path)) {
    console.log(">>> Found local playlist data files. Using this instead of calling external APIs.");
    playlists = loadJSON(playlist_data_path);
  } else {
    if (useLocal) console.log(">>> Local playlist data not found.");

    console.log(">>> Retrieving data from YouTube.");
    playlists = await getPlaylistsFromYoutube(orgData, youtubeApiKey);
    if (useLocal) {
      saveJSON(playlists, playlist_data_path);
      console.log(">>> Youtube data saved locally for future use.");
    }
  }

  return playlists;
};

exports.getPlaylists = getPlaylists;
exports.getOrganisationData = getOrganisationData