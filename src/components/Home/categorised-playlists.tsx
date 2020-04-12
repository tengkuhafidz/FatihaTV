import React, { ReactElement } from "react";
import { PlaylistModel, SpanEvent } from "../../models";
import SinglePlaylist from "./single-playlist";
import { isPlaylistPinnedOnLocalStorage } from "../../utils";

interface Props {
  playlists: PlaylistModel[];
}

const CategorisedPlaylists: React.FC<Props> = ({ playlists }) => {
  const renderPlaylists = (): ReactElement[] => {
    return playlists.map(playlist => (
      <SinglePlaylist
        playlist={playlist}
        key={playlist.id}
        isPlaylistPinnedLocally={isPlaylistPinnedOnLocalStorage(playlist.id)}
      />
    ));
  };

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
      {renderPlaylists()}
    </div>
  );
};

export default CategorisedPlaylists;
