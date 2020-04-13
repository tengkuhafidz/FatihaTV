import Fuse from "fuse.js";

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

export const isMobileDevice = (): boolean => {
  const hasWindow = typeof window !== "undefined";
  return hasWindow ? window.innerWidth <= 600 : false;
};

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
 * LOCALLY PINNED PLAYLIST
 */

export const getLocalPinnedPlaylist = (): string[] => {
  const hasLocalStorageReady = typeof Storage !== "undefined";
  if (hasLocalStorageReady) {
    const localStoragePinnedPlaylists =
      localStorage.getItem("pinnedPlaylists") || "";
    return localStoragePinnedPlaylists
      ? JSON.parse(localStoragePinnedPlaylists)
      : [];
  }
  return [];
};

export const addToLocalPinnedPlaylist = (playlistId: string): void => {
  const localPinnedPlaylists = getLocalPinnedPlaylist();
  localPinnedPlaylists.push(playlistId);
  localStorage.setItem("pinnedPlaylists", JSON.stringify(localPinnedPlaylists));
};

export const removeFromLocalPinnedPlaylist = (playlistId: string): void => {
  const localPinnedPlaylists = getLocalPinnedPlaylist();
  const playlistIndex = localPinnedPlaylists.indexOf(playlistId);
  if (playlistIndex !== -1) localPinnedPlaylists.splice(playlistIndex, 1);
  localStorage.setItem("pinnedPlaylists", JSON.stringify(localPinnedPlaylists));
};

export const isPlaylistPinnedOnLocalStorage = (playlistId: string): boolean => {
  const localPinnedPlaylists: string[] = getLocalPinnedPlaylist();
  return localPinnedPlaylists.includes(playlistId);
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
