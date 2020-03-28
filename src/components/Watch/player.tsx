import React from 'react'
import FacebookPlayer from 'react-facebook-player'

const VideoPlayer = ({ platform, url }) => {
    const getFbVideoId = () => {
        const urlSectionsArray = url.split('/')
        const finalIndex = urlSectionsArray.length - 1
        return urlSectionsArray[finalIndex] === "" ? urlSectionsArray[finalIndex - 1 ]: urlSectionsArray[finalIndex]
    }

    const renderFacebookPlayer = () => (
        <FacebookPlayer 
            appId="1905777919676190"
            videoId={getFbVideoId()}
            allowfullscreen={true}
        />
    )

    const renderYoutubePlayer = () => (
        <div className="embed-container">
            <iframe src="https://www.youtube.com/embed/W9GqOS9xAJM" frameborder="0" allowfullscreen></iframe>
        </div>
    )

    const renderPlayer =() => {
        return platform === "Facebook" ? renderFacebookPlayer() : renderYoutubePlayer()
    }

    return (
        <div className="bg-gray-500 shadow-lg">
            {renderPlayer()}
        </div>
    )
}

export default VideoPlayer
