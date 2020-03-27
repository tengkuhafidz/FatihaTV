import React from 'react'

import SingleLiveSession from './single-live-session'
import mergedPlaylistData from '../../data/merged-playlist-video-data.json'

const LiveSessions = () => {
    const renderLiveSessions = () => {
        return mergedPlaylistData.map(() => <SingleLiveSession />)
    }
    return (
        <div className="container mx-auto px-8 pt-16 pb-32" id="liveSessions">
            <div className="grid gap-8">
                {renderLiveSessions()} 
            </div>
        </div>
    )
}

export default LiveSessions