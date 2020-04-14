import { navigate } from "gatsby";
import React from "react";
import { PlaylistModel } from "../../models";

interface Props {
  playlist: PlaylistModel;
}

const SinglePlaylist: React.FC<Props> = ({ playlist }) => {
  const { title, thumbnailUrl, organisation, videos, id } = playlist;

  return (
    <div
      data-cy="playlist-card"
      className={`overflow-hidden align-center cursor-pointer`}
      onClick={(): Promise<void> =>
        navigate(`/watch/${id}/${playlist.videos[0].id}`)
      }
    >
      <img className="w-full z-10" src={thumbnailUrl} alt={title} />
      <div>
        <div className="font-semibold leading-tight">{title}</div>
        <p className="text-gray-600 text-sm">
          {organisation} &middot; {videos.length}{" "}
          {videos.length === 1 ? "video " : "videos"}
        </p>
      </div>
    </div>
  );
};

export default SinglePlaylist;
