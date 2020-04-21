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
    const part = [
      "snippet",
    ];
    const cost = 3;
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
      "id",
      "snippet",
    ];
    const cost = 3;
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
      "id",
      "snippet",
    ];
    const cost = 3;
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