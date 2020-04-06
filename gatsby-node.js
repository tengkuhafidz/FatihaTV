// const allPlaylistWithVideos = require("./src/data/merged-playlist-video-data.json");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const channelMap = require("./src/data/channel-map.json");
const Youtube = require("./src/data/youtube").Youtube;

/*
 {
    "id": "p30",
    "title": "Kuliah Harian Road to Ramadan",
    "organisation": "Masjid Al-Islah",
    "donationMethod": "PayNow to UEN T13MQ0001J",
    "tags": "english",
    "platform": "Facebook",
    "pageUrl": "https://www.facebook.com/pg/alislahmosque/",
    "thumbnailUrl": "https://scontent.fsin9-1.fna.fbcdn.net/v/t15.5256-10/s640x640/91568400_2035425409934469_2068718002240487424_n.jpg?_nc_cat=107&_nc_sid=ad6a45&_nc_ohc=-gvNL2eS-cMAX-QEft4&_nc_ht=scontent.fsin9-1.fna&_nc_tp=7&oh=311a90a036c4c8af7b71dd725a9508d5&oe=5EABCA00",
    "videos": [
      {
        "id": "v123",
      "playlistId": "p30",
        "epidsodeNumber": "e1",
        "title": "#1",
        "asatizah": "Ustaz Khidir Ibrahim",
        "language": "english",
        "addedOn": "01/04/2020",
        "videoUrl": "https://www.facebook.com/alislahmosque/videos/867333710338750/"
      }
    ]
  }
*/

const getAllPlaylistWithVideos = async () => {
  const yt = new Youtube();
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
        tags: "<Tags>",
        platform: "YouTube",
        pageUrl: "<Page URL>",
        thumbnailUrl: playlist.snippet.thumbnails.default.url,
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
            "https://www.youtube.com/watch?v=" +
            video.snippet.resourceId.videoId,
        };
      });
      playlistObj.videos = videosArr;
      playlistArr.push(playlistObj);
    }
    allPlaylistWithVideos = [...allPlaylistWithVideos, ...playlistArr];
  }
  console.log("Quota used: ", yt.usedQuota);
  return allPlaylistWithVideos;
};

// (async () => {
//   console.log(await allPlaylistWithVideos());
//   // console.log(yt.usedQuota);
// })();

exports.createPages = async ({ actions: { createPage } }) => {
  const allPlaylistWithVideos = await getAllPlaylistWithVideos();
  allPlaylistWithVideos.forEach(playlist => {
    playlist.videos.forEach(currentVideo => {
      console.log(
        "Creating page: " + `/watch/${playlist.id}/${currentVideo.id}`
      );
      createPage({
        path: `/watch/${playlist.id}/${currentVideo.id}`,
        component: require.resolve("./src/templates/watch.tsx"),
        context: { playlist, currentVideo },
      });
    });
  });
};
