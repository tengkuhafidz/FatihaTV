// eslint-disable-next-line @typescript-eslint/no-var-requires
// const channelMap = require("./channel-map.json");
const Youtube = require("./youtube").Youtube;
const Sheets = require("./sheets").Sheets;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");
const tagList = require('./tags.json');
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

const getLiveSessionsFromSheets = async apiKey => {
  const sheets = new Sheets(apiKey);
  let liveSessions = await sheets.getLiveSessions();
  liveSessions = liveSessions.slice(2) // Get rid of first two rows  
  
  return liveSessions.map(session => (
    {
      Date: session[0].split(', ')[1],
      Time: session[1],
      Mosque: session[2],
      Title: session[3],
      Speaker: session[4],
      Link: session[5],
    }
  ))
}


const getLiveSessions = async (apiKey, useLocal) => {
  const dataPath = "live_sessions.json";
  let orgData = [];
  if (useLocal && dataExists(dataPath)) {
    console.log(">>> Found local live sessions data files.");
    orgData = loadData(dataPath);
  } else {
    if (useLocal) console.log(">>> Local live sessions data not found.");
    console.log(">>> Retrieving live sessions data from Google Sheets.");
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
    console.log(">>> Retrieving organisation data from Google Sheets.");
    orgData = await getOrganisationDataFromSheets(apiKey);
    if (useLocal) {
      saveData(orgData, dataPath)
      console.log(">>> Organisation data saved locally for future use.");
    }
  }

  return orgData;
}

const getValidTags = playlist => {
  const desc = playlist.snippet.description
  const tags = desc.match(/#(\w+)/g);
  let langTags = []
  let categoryTags = []
  if(tags !== null){
    for(tag of tags){
      let tagStr = tag.substr(1);
      if(tagList.language[tagStr] !== undefined){
        langTags.push(tagStr)
      }
      else if(tagList.category[tagStr] !== undefined){
        categoryTags.push(tagStr)
      }
    }
  }
  return { language: langTags, category: categoryTags }
}

const getPlaylistsFromYoutube = async (orgData, apiKey) => {
  const yt = new Youtube(apiKey);

  // Only keep orgs with youtubeId
  orgData = orgData.filter(org => !!org.youtubeId)

  // Create array of promises to get playlists from org youtube channels.
  const getPlaylists = orgData.map(org => yt.getChannelPlaylists(org.youtubeId))

  // Get all playlists on each channel.
  let channelPlaylists = await Promise.all(getPlaylists)

  // Add organisationName and donationUrl to channelPlaylists.
  channelPlaylists = channelPlaylists.map(playlists => {
    return playlists.map((playlist, index) => ({
      ...playlist,
      organisationName: orgData[index].organisationName,
      donationUrl: orgData[index].donationUrl,
    }))
  })

  // Flatten array of arrays. Now its a single array of playlists. 
  // Add tags to playlists. And filter out playlists with no valid tags.
  let playlists = channelPlaylists
    .reduce((acc, val) => acc.concat(val), [])
    .map(playlist => {
      let tags = getValidTags(playlist)
      return {
        ...playlist,
        language: tags.language,
        tags: tags.category,
      }
    })
    .filter(playlist => playlist.tags.length > 0)

  // Create array of promises to get videos from playlists.
  const getVideos = playlists.map(playlist => yt.getPlaylistVideos(playlist.id));
  
  // Get all videos of each playlist.
  let playlistVideos = await Promise.all(getVideos);

  // Filter out private videos, and reshape video object.
  playlistVideos = playlistVideos.map(videos => {
    return (
      videos
        .filter(video => video.snippet.title !== 'Private video')
        .map(video => ({
          id: video.snippet.resourceId.videoId,
          title: video.snippet.title,
          description: video.snippet.description,
          publishedAt: video.snippet.publishedAt,
          thumbnailUrl: video.snippet.thumbnails.medium.url,
          donationUrl: video.donationUrl,
        }))
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
        publishedAt: playlist.snippet.publishedAt,
        thumbnailUrl: playlist.snippet.thumbnails.medium.url,
        organisationName: playlist.organisationName,
        donationUrl: playlist.donationUrl,
        tags: playlist.tags,
        language: playlist.language,
        updatedAt,
        videos: playlistVideos[index],
      }
    })
    .filter(playlist => playlist.videos.length > 0)

  console.log(">>> YouTube API Quota Units used:", yt.usedQuota);
  return playlists;
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