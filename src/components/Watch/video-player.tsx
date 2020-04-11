import React from "react";
import YouTube from "react-youtube";
import { GtagCategories, VideoModel } from "../../models";
import { gtagEventClick } from "../../utils/gtag";

interface Props {
  video: VideoModel;
}

const VideoPlayer: React.FC<Props> = ({ video }) => {
  const { id } = video;

  const trackVideoPlay = (): void => {
    gtagEventClick("play_video", {
      event_category: GtagCategories.Engagement,
      event_label: video.title,
    });
  };

  const trackVideoEnded = (): void => {
    gtagEventClick("ended_video", {
      event_category: GtagCategories.Engagement,
      event_label: video.title,
    });
  };

  const handleVideoPlayed = (): void => {
    trackVideoPlay();
  };

  const handleVideoEnded = (): void => {
    trackVideoEnded();
  };

  return (
    <div className="bg-gray-500 shadow-lg max-w-xs md:max-w-none embed-container">
      <YouTube
        videoId={id}
        onPlay={handleVideoPlayed}
        onEnd={handleVideoEnded}
      />
    </div>
  );
};

export default VideoPlayer;
