import React, { useState } from 'react'
import Fuse from 'fuse.js'
import playlistsData from '../../data/merged-playlist-video-data.json'
import { isPlaylistPinnedOnLocalStorage } from '../../utils'
import { gtagEventClick } from '../../utils/gtag'
import SinglePlaylist from './single-playlist'
import { PlaylistModel, InputEvent, SpanEvent } from '../../models'

const Playlists = () => {
    // used as a hack to get json of the playlist <> video merged data - to run on first load
    // console.log("<<<", JSON.stringify(getMergePlaylistData()))

    const [tagFilter, setTagFilter] = useState("");
    const [searchFilter, setSearchFilter] = useState("");

    const getFilteredPlaylists = (): PlaylistModel[] => {
        const playlistsFilteredByTag: PlaylistModel[] = tagFilter ? 
            playlistsData.filter(playlist => playlist.tags.includes(tagFilter)) : playlistsData

        const playlistsFilteredBySearch: PlaylistModel[] = searchFilter ? 
            getFuseFilterResult(playlistsFilteredByTag) : playlistsFilteredByTag
            
        return playlistsFilteredBySearch
    }

    const getFuseFilterResult = (playlistFilteredByTag: PlaylistModel[]): PlaylistModel[]  => {
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
        const fuseFilteredPlaylists: PlaylistModel[] = []
        fuseResults.forEach(result => fuseFilteredPlaylists.push(result.item as PlaylistModel))
        return fuseFilteredPlaylists
    }

    const playlistsToDisplay: PlaylistModel[] = !tagFilter && !searchFilter ? playlistsData : getFilteredPlaylists()

    const handleTagFilterClick = (e: SpanEvent, tag: string) => {
        e.stopPropagation()
        setTagFilter(tag)
        gtagEventClick({
            action: 'filter_by_tag',
            tag: tag
        })
    }

    const handleSearchFilter = (e: InputEvent) => {
        e.preventDefault();
        setSearchFilter(e.target.value)
    }

    const renderPlaylists = () => {
        const playlists = sortPinnedPlaylistFirst(playlistsToDisplay)
        return playlists.map(playlist => (
                <SinglePlaylist 
                    playlist={playlist} 
                    key={playlist.id} 
                    isPlaylistPinnedLocally={isPlaylistPinnedOnLocalStorage(playlist.id)} 
                    handleTagFilterClick={handleTagFilterClick}/>)
            )
    }

    const sortPinnedPlaylistFirst = (playlists: PlaylistModel[]) => {
        return playlists.sort((currPlaylist, nextPlaylist) => {
             if(isPlaylistPinnedOnLocalStorage(currPlaylist.id) && isPlaylistPinnedOnLocalStorage(nextPlaylist.id)) return 0;
             else if(isPlaylistPinnedOnLocalStorage(currPlaylist.id)) return -1;
             else return 0;
        })
     }

    const renderCurrentTagFilter = () => {
        if(tagFilter) {
            return (
                <p className="mx-auto mb-8 rounded bg-gray-800 px-2 py-2 w-xs text-white font-semibold text-lg">
                    Current Filter: 
                    <span className="text-teal-500"> #{tagFilter} </span>
                    &middot;&nbsp;
                    <span className="font-light hover:font-semibold cursor-pointer" onClick={(e) => handleTagFilterClick(e, "")}>
                        clear
                    </span>
                </p>
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
           {renderCurrentTagFilter()}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                {renderPlaylists()} 
            </div>
        </div>
    )

}

export default Playlists