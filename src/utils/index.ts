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