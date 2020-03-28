import React from 'react'
import { navigate } from 'gatsby'

const VideoInPlaylist = ({ playlistId, video, videoIndex, currentVideo }) => {
    const videoNumber = videoIndex + 1
    const isCurrentVideo = video.id === currentVideo.id

    const openVideo = () => navigate(`/watch/${playlistId}/${videoNumber}`)

    const renderCurrentlyPlaying = () => {
        return isCurrentVideo && (
            <p className="text-teal-500 font-semibold uppercase text-sm">
                Current Video
            </p>
        )
    }

    return (
        <div 
            className={`w-full rounded-lg border-2 mb-4 shadow-sm hover:shadow-lg cursor-pointer w-full shadow-sm hover:shadow-lg ${isCurrentVideo && "border-teal-500"}`} 
            onClick={() => openVideo()}
        >
            <div className="px-6 py-2">
                { renderCurrentlyPlaying() }
                <div className="font-bold text-lg">{video.title}</div>
                <p className="text-gray-700 text-base">
                    Ustaz Tamliikhaa
                </p>
            </div>
        </div>
    )
    
}

export default VideoInPlaylist