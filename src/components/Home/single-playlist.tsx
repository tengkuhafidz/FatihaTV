import { navigate } from 'gatsby'
import React from 'react'
import { PlaylistData } from '../../models'
import { isPlaylistPinnedOnLocalStorage } from '../../utils'


interface Props {
    playlist: PlaylistData,
    isPlaylistPinnedLocally: boolean
}

const SinglePlaylist: React.FunctionComponent<Props> = ({playlist, isPlaylistPinnedLocally}) => {
    const { title, thumbnailUrl, organisation, durationType, videos, id } = playlist

    return (
        <div className={`rounded overflow-hidden shadow-lg hover:shadow-2xl bg-white align-center cursor-pointer  ${ isPlaylistPinnedLocally ? "border-teal-500 border-4" : "" }`} onClick={() => navigate(`/watch/${id}/1`)}>
            <img className="w-full z-10" src={thumbnailUrl} alt={title} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl leading-tight">{title}</div>
                <p className="text-gray-600 text-base">
                    {organisation} &middot; {videos.length} {durationType} {videos.length === 1 ? "video " : "videos"}
                </p>
            </div>
        </div>
    )
}

export default SinglePlaylist