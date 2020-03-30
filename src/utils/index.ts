import playlistData from '../data/playlist-data.json'
import videoData from '../data/video-data.json'

export const mergePlaylistData = () => {
    let completePlaylistData: any[] = [];

    playlistData.forEach((singlePlaylist) => {
        const videosInCurrPlaylist = videoData.filter((singleVideo) => singlePlaylist.id === singleVideo.playlistId)

        const completeSinglePlaylist = {
            ...singlePlaylist,
            videos: videosInCurrPlaylist
        }

        completePlaylistData.push(completeSinglePlaylist)
    })

    return completePlaylistData
}

export const enableSmoothScroll = () => {
    if (typeof window !== 'undefined') {
        require('smooth-scroll')('a[href*="#"]');
    }
}

export const getSocialMediaShareUrls = (pageUrl: string) => {
    return {
        facebookShareUrl: getFacebookShareUrl(pageUrl),
        whatsappShareUrl: getWhatsappShareUrl(pageUrl),
        telegramShareUrl: getTelegramShareUrl(pageUrl),
        twitterShareUrl: getTwitterShareUrl(pageUrl),
    }
}

export const getFacebookShareUrl = (pageUrl: string) => {
    return `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`
}

export const getWhatsappShareUrl = (pageUrl: string) => {
    return `https://api.whatsapp.com/send?text=${pageUrl}`
}

export const getTelegramShareUrl = (pageUrl: string) => {
    return `https://telegram.me/share/url?url=${pageUrl}`
}

export const getTwitterShareUrl = (pageUrl: string) => {
    return `https://twitter.com/share?url=${pageUrl}`
}

export const isMobileDevice = () => {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}

export const getLocalPinnedPlaylist = () => {
    const hasLocalStorageReady = typeof(Storage) !== "undefined"
    if (hasLocalStorageReady) {
        const localStoragePinnedPlaylists = localStorage.getItem("pinnedPlaylists") || ""
        return localStoragePinnedPlaylists ? JSON.parse(localStoragePinnedPlaylists) : []
    }
    return []
}

export const addToLocalPinnedPlaylist = (playlistId) => {
    const localPinnedPlaylists = getLocalPinnedPlaylist()
    localPinnedPlaylists.push(playlistId)
    localStorage.setItem("pinnedPlaylists", JSON.stringify(localPinnedPlaylists))
}

export const removeFromLocalPinnedPlaylist = (playlistId) => {
    const localPinnedPlaylists = getLocalPinnedPlaylist()
    const playlistIndex = localPinnedPlaylists.indexOf(playlistId);
    if (playlistIndex !== -1) localPinnedPlaylists.splice(playlistIndex, 1);
    localStorage.setItem("pinnedPlaylists", JSON.stringify(localPinnedPlaylists))
}

export const isPlaylistPinnedOnLocalStorage = (playlistId) => {
    const localPinnedPlaylists: string[] = getLocalPinnedPlaylist()
    return localPinnedPlaylists.includes(playlistId)
}

        