import { navigate } from "gatsby";
import React, { ReactElement } from "react";
import { VideoModel } from "../../models";

interface Props {
  playlistId: string;
  video: VideoModel;
  currentVideo: VideoModel;
}

const VideoInPlaylist: React.FC<Props> = ({
  playlistId,
  video,
  currentVideo
}) => {
  const isCurrentVideo = video.id === currentVideo.id;

  const openVideo = (): Promise<void> =>
    navigate(`/watch/${playlistId}/${video.id}`);

  const renderCurrentlyPlaying = (): ReactElement | boolean => {
    return (
      isCurrentVideo && (
        <p className="text-teal-500 font-semibold uppercase text-sm">
          Current Video
        </p>
      )
    );
  };

  return (
    <div
      className={`w-full rounded-lg border-2 mb-4 shadow-sm hover:shadow-lg cursor-pointer w-full shadow-sm hover:shadow-lg bg-gray-800 ${isCurrentVideo &&
        "border-teal-500"}`}
      onClick={(): Promise<void> => openVideo()}
    >
      <div className="px-6 py-2">
        {renderCurrentlyPlaying()}
        <div>
          <p className="font-semibold leading-tight text-gray-200">
            {video.title}
          </p>
          <p className="text-gray-500">{video.publishedAt}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoInPlaylist;
