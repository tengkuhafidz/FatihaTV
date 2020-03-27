import React from 'react'
import FacebookPlayer from 'react-facebook-player'

const VideoPlayer = () => {
    return (
        <div >
            <FacebookPlayer 
                appId="1905777919676190"
                videoId="2252063531563109"
                allowfullscreen={true}
            />
        </div>
    )
}

export default VideoPlayer
