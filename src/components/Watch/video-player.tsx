import React from 'react'
import FacebookPlayer from 'react-facebook-player'
import { gtagEventClick } from '../../utils/gtag'
import { isMobileDevice } from '../../utils'

const VideoPlayer = ({ playlist, video }) => {
    const { videoUrl } = video
    const { platform } = playlist
    const getFbVideoId = () => {
        const urlSectionsArray = videoUrl.split('/')
        const finalIndex = urlSectionsArray.length - 1
        return urlSectionsArray[finalIndex] === "" ? urlSectionsArray[finalIndex - 1 ]: urlSectionsArray[finalIndex]
    }

    const trackFbVideoPlay = () => {
        gtagEventClick({
            actions: "play_facebook_video",
            video,
            playlist
        })
    }

    const renderFacebookPlayer = () => (
        <FacebookPlayer 
            appId="1905777919676190"
            videoId={getFbVideoId()}
            allowfullscreen={true}
            onStartedPlaying={() => trackFbVideoPlay()}
        />
    )

    const renderYoutubePlayer = () => (
        <div className="embed-container">
            <iframe src={videoUrl} frameborder="0" allowfullscreen></iframe>
        </div>
    )

    const renderPlayer =() => {
        return platform === "Facebook" ? renderFacebookPlayer() : renderYoutubePlayer()
    }

    return (
        <div className={`bg-gray-500 shadow-lg max-w-xs md:max-w-none`}>
            {renderPlayer()}
        </div>
    )
}

export default VideoPlayer
