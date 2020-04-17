import { navigate } from "gatsby";
import React from "react";
import { PlaylistModel } from "../../models";
import Img from "gatsby-image";

interface Props {
  playlist: PlaylistModel;
  videoId?: string;
}

const SinglePlaylist: React.FC<Props> = ({ playlist, videoId }) => {
  const {
    id,
    title,
    updatedAt,
    organisationName,
    childrenVideo: videos,
    thumbnailUrl,
  } = playlist;

  const handleClick = (): void => {
    const pagePath = videoId
      ? `/watch/${id}/${videoId}`
      : `/watch/${id}/${videos[videos.length - 1].id}`;
    navigate(pagePath);
  };

  const thumbnailMeta = videoId
    ? videos.find(video => video.id === videoId)?.localImage
    : videos[videos.length - 1].localImage;

  return (
    <div
      data-cy="playlist-card"
      className={`overflow-hidden align-center cursor-pointer inline-block pr-4 md:w-full`}
      onClick={handleClick}
    >
      <Img
        className="w-full z-10"
        fluid={thumbnailMeta.childImageSharp.fluid}
        alt={title}
      />
      <div>
        <div className="mt-2 font-semibold w-48 md:w-full leading-tight truncate capitalize">
          {title.toLowerCase()}
        </div>
        <p className="text-gray-600 text-sm truncate capitalize">
          {organisationName}
        </p>
        <p className="-mt-1 text-gray-600  text-sm truncate">
          {videos.length} {videos.length === 1 ? "video " : "videos"} &middot;
          &nbsp;
          {updatedAt}
        </p>
      </div>
    </div>
  );
};

export default SinglePlaylist;
