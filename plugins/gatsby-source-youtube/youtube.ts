import axios from "axios";

export class Youtube {
  constructor(apiKey: string) {
    this.API_KEY = apiKey;
  }

  API_KEY: string;
  BASE_URL = "https://www.googleapis.com/youtube/v3/";

  url = (
    service: "channels" | "playlists" | "playlistItems",
    part: Array<string>,
    params: Record<string, string>
  ): string => {
    const paramString = Object.keys(params)
      .map(key => {
        return "&" + key + "=" + params[key];
      })
      .join("");
    return (
      this.BASE_URL +
      service +
      "?key=" +
      this.API_KEY +
      "&part=" +
      part.join(",") +
      paramString
    );
  };

  usedQuota = 0;

  getChannel = async (channelId: string): Promise<void> => {
    // For ease of calculating quota cost.
    const part = [
      // "auditDetails", //4 - Requires special perms
      // "contentDetails", //2
      // "brandingSettings", //2
      // "contentOwnerDetails", //2
      "id", //0
      // "localizations", //2
      "snippet", //2
      // "status", //2
      // "topicDetails", //2
      // "statistics", //2
    ];
    const cost = 2;
    // Valid params: categoryId, forUsername, id, managedByMe, mine, maxResults.
    const params = {
      id: channelId,
      maxResults: "50",
    };
    const res = await axios.get(this.url("channels", part, params));
    this.usedQuota += cost;
    return res.data.items;
  };

  getChannelPlaylists = async (channelId: string): Promise<void> => {
    const part = [
      // "contentDetails", //2,
      "id", //0,
      // "localizations", //2,
      // "player", //0,
      "snippet", //2,
      // "status", //2,
    ];
    const cost = 2;
    const params = {
      channelId,
      maxResults: "50",
    };
    let res = await axios.get(this.url("playlists", part, params));
    this.usedQuota += cost;
    let playlists = res.data.items;
    while (res.data.nextPageToken) {
      res = await axios.get(
        this.url("playlists", part, {
          ...params,
          pageToken: res.data.nextPageToken,
        })
      );
      this.usedQuota += cost;
      playlists = [...playlists, ...res.data.items];
    }
    return playlists;
  };

  getPlaylistVideos = async (playlistId: string): Promise<void> => {
    const part = [
      // "contentDetails", //2,
      "id", //0,
      "snippet", //2,
      // "status", //2,
    ];
    const cost = 2;
    const params = {
      playlistId,
      maxResults: "50",
    };
    let res = await axios.get(this.url("playlistItems", part, params));
    this.usedQuota += cost;

    let videos = res.data.items;
    while (res.data.nextPageToken) {
      res = await axios.get(
        this.url("playlistItems", part, {
          ...params,
          pageToken: res.data.nextPageToken,
        })
      );
      this.usedQuota += cost;
      videos = [...videos, ...res.data.items];
    }
    return videos;
  };
}

// (async (): Promise<void> => {
//   const yt = new Youtube();
//   await Promise.all([
//     yt.getChannel("UCnqD9EhaRuKIhHY_pHPyxcA"),
//     yt.getChannelPlaylists("UCnqD9EhaRuKIhHY_pHPyxcA"),
//     yt.getPlaylistVideos("PLoBuEb7Cp3UPmrc4IqSU_N68sNELPFAjh"),
//   ]);
//   console.log(yt.usedQuota);
// })();

// const yt = new Youtube();

// (async (): Promise<void> => {
//   console.log(await yt.getChannel("UCnqD9EhaRuKIhHY_pHPyxcA"));
// })();

// (async (): Promise<void> => {
//   console.log(await yt.getChannelPlaylists("UCnqD9EhaRuKIhHY_pHPyxcA"));
// })();

// (async (): Promise<void> => {
//   console.log(await yt.getPlaylistVideos("PLoBuEb7Cp3UPmrc4IqSU_N68sNELPFAjh"));
// })();
