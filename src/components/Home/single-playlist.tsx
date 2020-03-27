import React from 'react'
import { navigate } from 'gatsby'

import { PlaylistData } from '../../models'

interface Props {
    data: PlaylistData
}

const SinglePlaylist: React.FunctionComponent<Props> = ({data}) => {
    const { title, thumbnailUrl, organisation, durationType, videos } = data
    return (
        <div className="rounded overflow-hidden shadow-lg hover:shadow-2xl bg-white align-center cursor-pointer" onClick={() => navigate('/watch')}>
            <img className="w-full z-10" src={thumbnailUrl} alt="Sunset in the mountains" />
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