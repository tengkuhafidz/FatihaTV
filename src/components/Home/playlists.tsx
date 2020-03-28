import React from 'react'
import SinglePlaylist from './single-playlist'
import mergedPlaylistData from '../../data/merged-playlist-video-data.json'

// import { mergePlaylistData } from '../../utils/index'

const Playlists = () => {
    const renderPlaylists = () => {
        // console.log("<<<", JSON.stringify(mergePlaylistData()))
        return mergedPlaylistData.map((data) => <SinglePlaylist data={data} key={data.id}/>)
    }

    return (
        <div className="container mx-auto px-8 pt-16 pb-32" id="playlists">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                {renderPlaylists()} 
            </div>
        </div>
    )

}

export default Playlists