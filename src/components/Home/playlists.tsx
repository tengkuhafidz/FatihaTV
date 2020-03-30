import React from 'react'
import mergedPlaylistData from '../../data/merged-playlist-video-data.json'
import SinglePlaylist from './single-playlist'
import { isPlaylistPinnedOnLocalStorage, getLocalPinnedPlaylist } from '../../utils'
import { mergePlaylistData } from '../../utils/index'

const Playlists = () => {
    // console.log("<<<", JSON.stringify(mergePlaylistData()))
    // const renderPlaylists = () => {
    //     return mergedPlaylistData.map((playlist) => {
    //         return(
    //             <SinglePlaylist playlist={playlist} key={playlist.id} isPlaylistPinnedLocally={isPlaylistPinnedLocally}/>
    //         )
    //     })
    // }

    const renderPinnedPlaylist = () => {
        const pinnedPlaylists = mergedPlaylistData.filter(playlist => isPlaylistPinnedOnLocalStorage(playlist.id))

        return pinnedPlaylists.map(playlist => (
            <SinglePlaylist playlist={playlist} key={playlist.id} isPlaylistPinnedLocally={true}/>
        ))
    }

    const renderUnpinnedPlaylist = () => {
        const unpinnedPlaylists = mergedPlaylistData.filter(playlist => !isPlaylistPinnedOnLocalStorage(playlist.id))

        return unpinnedPlaylists.map(playlist => (
            <SinglePlaylist playlist={playlist} key={playlist.id} isPlaylistPinnedLocally={false}/>
        ))
    }

    return (
        <div className="container mx-auto px-8 pt-8 pb-32" id="playlists">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                {renderPinnedPlaylist()} 
                {renderUnpinnedPlaylist()} 
            </div>
        </div>
    )

}

export default Playlists