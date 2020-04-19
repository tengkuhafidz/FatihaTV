import Fuse from "fuse.js";
import { PlayedPlaylistsModel } from "../models";

export const enableSmoothScroll = (): void => {
  if (typeof window !== "undefined") {
    // new SmoothScroll('a[href*="#"]');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("smooth-scroll")('a[href*="#"]');
  }
};

/**
 * SOCIAL MEDIA URL
 */

export const getFacebookShareUrl = (pageUrl: string): string => {
  return `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
};

export const getWhatsappShareUrl = (pageUrl: string): string => {
  return `https://api.whatsapp.com/send?text=${pageUrl}`;
};

export const getTelegramShareUrl = (pageUrl: string): string => {
  return `https://telegram.me/share/url?url=${pageUrl}`;
};

export const getTwitterShareUrl = (pageUrl: string): string => {
  return `https://twitter.com/share?url=${pageUrl}`;
};

interface SocialMediaUrls {
  facebookShareUrl: string;
  whatsappShareUrl: string;
  telegramShareUrl: string;
  twitterShareUrl: string;
}

export const getSocialMediaShareUrls = (pageUrl: string): SocialMediaUrls => {
  return {
    facebookShareUrl: getFacebookShareUrl(pageUrl),
    whatsappShareUrl: getWhatsappShareUrl(pageUrl),
    telegramShareUrl: getTelegramShareUrl(pageUrl),
    twitterShareUrl: getTwitterShareUrl(pageUrl),
  };
};

/**
 * DEVICE CHECK
 */

export const isMobileOrTableDevice = (): boolean => {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];

  return toMatch.some(toMatchItem => {
    return navigator.userAgent.match(toMatchItem);
  });
};

/**
 * PLAYED PLAYLIST - For continue watching category
 */

const getLocalStorageItem = (itemName: string): string => {
  const hasLocalStorageReady = typeof Storage !== "undefined";
  if (hasLocalStorageReady) {
    return localStorage.getItem(itemName) || "";
  }
  return "";
};

export const getPlayedPlaylists = (): PlayedPlaylistsModel[] => {
  const playedPlaylists = getLocalStorageItem("playedPlaylists");
  return playedPlaylists ? JSON.parse(playedPlaylists) : [];
};

const updatePlayedPlaylists = (
  playedPlaylists: PlayedPlaylistsModel[],
  playlistId: string,
  videoId: string
): PlayedPlaylistsModel[] => {
  const playlistIndexInPlayedPlaylists: number = playedPlaylists.findIndex(
    playlist => playlist.playlistId === playlistId
  );
  const playlistExistsInPlayedPlaylists: boolean =
    playlistIndexInPlayedPlaylists >= 0;

  console.log(
    "playlistExistsInPlayedPlaylists",
    playlistExistsInPlayedPlaylists
  );

  if (playlistExistsInPlayedPlaylists) {
    playedPlaylists.splice(playlistIndexInPlayedPlaylists, 1);
  }

  if (playedPlaylists.length >= 12) {
    playedPlaylists.pop();
  }

  playedPlaylists.unshift({ playlistId, videoId });

  return playedPlaylists;
};

export const addToPlayedPlaylists = (
  playlistId: string,
  videoId: string
): void => {
  const playedPlaylists: PlayedPlaylistsModel[] = getPlayedPlaylists();
  const updatedPlayedPlaylists = updatePlayedPlaylists(
    playedPlaylists,
    playlistId,
    videoId
  );

  localStorage.setItem(
    "playedPlaylists",
    JSON.stringify(updatedPlayedPlaylists)
  );
};

/**
 * FUSE FILTER
 */

export const getFuseFilterResult = (
  donationListing: object[],
  filterByKeys: string[],
  searchTerm: string
): object[] => {
  const options = {
    isCaseSensitive: false,
    findAllMatches: false,
    includeMatches: false,
    includeScore: false,
    useExtendedSearch: false,
    minMatchCharLength: 1,
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    keys: filterByKeys,
  };

  const fuse: Fuse<any, Fuse.IFuseOptions<any>> = new Fuse(
    donationListing,
    options
  );
  return fuse.search(searchTerm);
};
