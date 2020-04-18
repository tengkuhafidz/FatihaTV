import { navigate } from "gatsby";
import React from "react";
import { PlaylistModel } from "../../models";

interface Props {
  playlist: PlaylistModel;
  videoId?: string;
}

const SinglePlaylist: React.FC<Props> = ({ playlist, videoId }) => {
  const { title, organisationName, videos, publishedAt, id } = playlist;

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
      className={`overflow-hidden align-center cursor-pointer inline-block pr-4 md:w-full`}
      onClick={handleClick}
    >
      <img className="w-48 md:w-full z-10" src={thumbnailUrl} alt={title} />
      <div>
        <div className="font-semibold w-48 md:w-full leading-tight truncate capitalize">
          {title.toLowerCase()}
        </div>
        <p className="text-gray-600 text-sm truncate capitalize">
          {organisationName}
        </p>
        <p className="text-gray-600 text-sm truncate">
          {publishedAt} &middot; {videos.length}{" "}
          {videos.length === 1 ? "video " : "videos"}
        </p>
      </div>
    </div>
  );
};

export default SinglePlaylist;
