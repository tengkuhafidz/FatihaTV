import { navigate } from "gatsby";
import React from "react";
import { PlaylistModel } from "../../models";

interface Props {
  playlist: PlaylistModel;
  videoId?: string;
}

const SinglePlaylist: React.FC<Props> = ({ playlist, videoId }) => {
  const { title, organisationName, videos, id } = playlist;

  const handleClick = (): void => {
    const pagePath = videoId
      ? `/watch/${id}/${videoId}`
      : `/watch/${id}/${playlist.videos[videos.length - 1].id}`;
    navigate(pagePath);
  };

  const thumbnailUrl = videoId
    ? videos.find(video => video.id === videoId)?.thumbnailUrl
    : videos[videos.length - 1].thumbnailUrl;

  return (
    <div
      data-cy="playlist-card"
      className={`overflow-hidden align-center cursor-pointer`}
      onClick={handleClick}
    >
      <img className="w-full z-10" src={thumbnailUrl} alt={title} />
      <div>
        <div className="font-semibold leading-tight">{title}</div>
        <p className="text-gray-600 text-sm">
          {organisationName} &middot; {videos.length}{" "}
          {videos.length === 1 ? "video " : "videos"}
        </p>
      </div>
    </div>
  );
};

export default SinglePlaylist;
