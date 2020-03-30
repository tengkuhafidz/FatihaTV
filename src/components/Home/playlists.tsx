import React, { useState } from 'react'
import mergedPlaylistData from '../../data/merged-playlist-video-data.json'
import { isPlaylistPinnedOnLocalStorage } from '../../utils'
import { gtagEventClick } from '../../utils/gtag'
import SinglePlaylist from './single-playlist'

const Playlists = () => {
    // console.log("<<<", JSON.stringify(mergePlaylistData()))
    // const renderPlaylists = () => {
    //     return mergedPlaylistData.map((playlist) => {
    //         return(
    //             <SinglePlaylist playlist={playlist} key={playlist.id} isPlaylistPinnedLocally={isPlaylistPinnedLocally}/>
    //         )
    //     })
    // }

    const getFilteredPlaylists = () => {
        return mergedPlaylistData.filter(playlist => playlist.tags.includes(tagFilter))
    }

    const [tagFilter, setTagFilter] = useState("");
    const filteredPlaylists = !tagFilter ? mergedPlaylistData : getFilteredPlaylists()

    const handleTagFilterClick = (e: any, tag: string) => {
        e.stopPropagation()
        setTagFilter(tag)
        gtagEventClick({
            action: 'filter_by_tag',
            tag: tag
        })
    }

    const renderPinnedPlaylist = () => {
        const pinnedPlaylists = filteredPlaylists.filter(playlist => isPlaylistPinnedOnLocalStorage(playlist.id))

        return pinnedPlaylists.map(playlist => (
            <SinglePlaylist playlist={playlist} key={playlist.id} isPlaylistPinnedLocally={true} handleTagFilterClick={handleTagFilterClick}/>
        ))
    }

    const renderUnpinnedPlaylist = () => {
        const unpinnedPlaylists = filteredPlaylists.filter(playlist => !isPlaylistPinnedOnLocalStorage(playlist.id))

        return unpinnedPlaylists.map(playlist => (
            <SinglePlaylist playlist={playlist} key={playlist.id} isPlaylistPinnedLocally={false} handleTagFilterClick={handleTagFilterClick}/>
        ))
    }

    const renderCurrentFilter = () => {
        if(tagFilter){
            return (
                <p className="mx-auto mb-8 rounded bg-gray-800 px-2 py-2 w-xs text-white font-semibold text-lg">Current Filter: <span className="text-teal-500">#{tagFilter}</span> &middot; <span className="font-light hover:font-semibold cursor-pointer" onClick={(e) => handleTagFilterClick(e, "")}>clear</span></p>
            )
        }
        return <></>
    }

    return (
        <div className="container mx-auto px-8 pt-8 pb-32" id="playlists">
           {renderCurrentFilter()}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                {renderPinnedPlaylist()} 
                {renderUnpinnedPlaylist()} 
            </div>
        </div>
    )

}

export default Playlists