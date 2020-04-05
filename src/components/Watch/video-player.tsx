import React from "react";
import FacebookPlayer from "react-facebook-player";
import { PlaylistModel, VideoModel, GtagCategories } from "../../models";
import { gtagEventClick } from "../../utils/gtag";

interface Props {
  playlist: PlaylistModel;
  video: VideoModel;
}

const VideoPlayer: React.FC<Props> = ({ playlist, video }) => {
  const { videoUrl } = video;
  const { platform } = playlist;

  const getFbVideoId = () => {
    const urlSectionsArray = videoUrl.split("/");
    const finalIndex = urlSectionsArray.length - 1;
    return urlSectionsArray[finalIndex] === ""
      ? urlSectionsArray[finalIndex - 1]
      : urlSectionsArray[finalIndex];
  };

  const trackFbVideoPlay = () => {
    gtagEventClick("play_facebook_video", {
      event_category: GtagCategories.Engagement,
      event_label: playlist.title + " " + video.title,
    });
  };

  const renderFacebookPlayer = () => (
    <FacebookPlayer
      appId="1905777919676190"
      videoId={getFbVideoId()}
      allowfullscreen={true}
      onStartedPlaying={() => trackFbVideoPlay()}
    />
  );

  const renderYoutubePlayer = () => (
    <div className="embed-container">
      <iframe src={videoUrl} frameBorder="0" allowFullScreen></iframe>
    </div>
  );

  const renderPlayer = () => {
    return platform === "Facebook"
      ? renderFacebookPlayer()
      : renderYoutubePlayer();
  };

  return (
    <div className={`bg-gray-500 shadow-lg max-w-xs md:max-w-none`}>
      {renderPlayer()}
    </div>
  );
};

export default VideoPlayer;
