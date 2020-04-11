import { navigate } from "gatsby";
import React, { ReactElement } from "react";
import { PlaylistModel, SpanEvent } from "../../models";

interface Props {
  playlist: PlaylistModel;
  isPlaylistPinnedLocally: boolean;
  handleTagFilterClick: (e: SpanEvent, tag: string) => void;
}

const SinglePlaylist: React.FunctionComponent<Props> = ({
  playlist,
  isPlaylistPinnedLocally,
  handleTagFilterClick,
}) => {
  const { title, thumbnailUrl, organisation, videos, id, tags } = playlist;

  const tagsArray = tags.split(",");

  const renderTags = (): ReactElement[] => {
    return tagsArray.map(tag => (
      <span
        key={tag}
        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 hover:bg-teal-500 hover:text-white"
        onClick={(e): void => handleTagFilterClick(e, tag)}
      >
        #{tag}
      </span>
    ));
  };

  return (
    <div
      data-cy="playlist-card"
      className={`rounded overflow-hidden shadow-lg hover:shadow-2xl bg-white align-center cursor-pointer  ${
        isPlaylistPinnedLocally ? "border-teal-500 border-4" : ""
      }`}
      onClick={(): void => navigate(`/watch/${id}/${playlist.videos[0].id}`)}
    >
      <img className="w-full z-10" src={thumbnailUrl} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl leading-tight">{title}</div>
        <p className="text-gray-600 text-base">
          {organisation} &middot; {videos.length}{" "}
          {videos.length === 1 ? "video " : "videos"}
        </p>
        <div className="pt-4">{renderTags()}</div>
      </div>
    </div>
  );
};

export default SinglePlaylist;
