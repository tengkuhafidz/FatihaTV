import React, { useEffect } from "react";
import YouTube from "react-youtube";
import { GtagCategories, VideoModel, PlaylistModel } from "../../models";
import { gtagEventClick } from "../../utils/gtag";
import { addToPlayedPlaylists } from "../../utils";

interface Props {
  playlist: PlaylistModel;
  video: VideoModel;
}

const VideoPlayer: React.FC<Props> = ({ playlist, video }) => {
  useEffect(() => {
    addToPlayedPlaylists(playlist.id, video.id);
  });

  const trackVideoPlay = (): void => {
    gtagEventClick("play_video", {
      event_category: GtagCategories.Engagement,
      event_label: `${playlist.title}: ${video.title}`
    });
  };

  const trackVideoEnded = (): void => {
    gtagEventClick("ended_video", {
      event_category: GtagCategories.Engagement,
      event_label: `${playlist.title}: ${video.title}`
    });
  };

  const handleVideoPlayed = (): void => {
    addToPlayedPlaylists(playlist.id, video.id);
    trackVideoPlay();
  };

  const handleVideoEnded = (): void => {
    trackVideoEnded();
  };

  return (
    <div className="bg-gray-500 shadow-lg max-w-xs md:max-w-none embed-container">
      <YouTube
        videoId={video.id}
        onPlay={handleVideoPlayed}
        onEnd={handleVideoEnded}
      />
    </div>
  );
};

export default VideoPlayer;
