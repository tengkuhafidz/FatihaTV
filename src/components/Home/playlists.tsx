import React, { useState } from 'react'
import Fuse from 'fuse.js'
import mergedPlaylistData from '../../data/merged-playlist-video-data.json'
import { isPlaylistPinnedOnLocalStorage } from '../../utils'
import { gtagEventClick } from '../../utils/gtag'
import SinglePlaylist from './single-playlist'

const Playlists = () => {
    // console.log("<<<", JSON.stringify(getMergePlaylistData()))
    // const renderPlaylists = () => {
    //     return mergedPlaylistData.map((playlist) => {
    //         return(
    //             <SinglePlaylist playlist={playlist} key={playlist.id} isPlaylistPinnedLocally={isPlaylistPinnedLocally}/>
    //         )
    //     })
    // }

    const [tagFilter, setTagFilter] = useState("");
    const [searchFilter, setSearchFilter] = useState("");

    const getFilteredPlaylists = () => {
        const playlistFilteredByTag = tagFilter ? mergedPlaylistData.filter(playlist => playlist.tags.includes(tagFilter)) : mergedPlaylistData
        return searchFilter ? getFuseFilterResult(playlistFilteredByTag) : playlistFilteredByTag
    }

    const getFuseFilterResult = (playlistFilteredByTag) => {
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
            keys: [
              "organisation",
              "videos.asatizah",
              "videos.tags",
              "videos.language",
              "title",
              "videos.title"
            ]
          }
          
        const fuse = new Fuse(playlistFilteredByTag, options)
        const fuseResults = fuse.search(searchFilter)
        const fuseFilteredPlaylists: any[] = []
        fuseResults.forEach(result => fuseFilteredPlaylists.push(result.item))
        return fuseFilteredPlaylists
    }

    const filteredPlaylists = !tagFilter && !searchFilter ? mergedPlaylistData : getFilteredPlaylists()
    const handleTagFilterClick = (e: any, tag: string) => {
        e.stopPropagation()
        setTagFilter(tag)
        gtagEventClick({
            action: 'filter_by_tag',
            tag: tag
        })
    }

    const handleSearchFilter = (e: any) => {
        e.preventDefault();
        setSearchFilter(e.target.value)
    }

    const renderPinnedPlaylist = () => {
        const pinnedPlaylists = filteredPlaylists.filter(playlist => isPlaylistPinnedOnLocalStorage(playlist.id))
        return pinnedPlaylists.map(playlist => <SinglePlaylist playlist={playlist} key={playlist.id} isPlaylistPinnedLocally={true} handleTagFilterClick={handleTagFilterClick}/>)
    }

    const renderUnpinnedPlaylist = () => {
        const unpinnedPlaylists = filteredPlaylists.filter(playlist => !isPlaylistPinnedOnLocalStorage(playlist.id))
        return unpinnedPlaylists.map(playlist => <SinglePlaylist playlist={playlist} key={playlist.id} isPlaylistPinnedLocally={false} handleTagFilterClick={handleTagFilterClick}/>)
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
            <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-8" 
                id="search" 
                type="text" 
                placeholder="Try this shiny new search feature! ^_^"
                onChange={(e) => handleSearchFilter(e)} 
            />
           {renderCurrentFilter()}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                {renderPinnedPlaylist()} 
                {renderUnpinnedPlaylist()} 
            </div>
        </div>
    )

}

export default Playlists