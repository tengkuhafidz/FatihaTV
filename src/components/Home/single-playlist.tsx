import { navigate } from "gatsby";
import React from "react";
import { PlaylistModel, SpanEvent } from "../../models";

interface Props {
  playlist: PlaylistModel;
  isPlaylistPinnedLocally: boolean;
}

const SinglePlaylist: React.FunctionComponent<Props> = ({
  playlist,
  isPlaylistPinnedLocally,
}) => {
  const { title, thumbnailUrl, organisation, videos, id } = playlist;

  return (
    <div
      data-cy="playlist-card"
      className={`overflow-hidden align-center cursor-pointer ${
        isPlaylistPinnedLocally ? "border-teal-500 border-4" : ""
      }`}
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
