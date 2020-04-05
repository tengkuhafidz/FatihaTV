import React, { ReactElement, useState } from "react";
import playlistsData from "../../data/merged-playlist-video-data.json";
import {
  getFuseFilterResult,
  isPlaylistPinnedOnLocalStorage,
} from "../../utils";
import { gtagEventClick } from "../../utils/gtag";
import SinglePlaylist from "./single-playlist";
import {
  GtagCategories,
  InputEvent,
  PlaylistModel,
  SpanEvent,
} from "../../models";
import SearchInput from "../search-input";

const Playlists = (): ReactElement => {
  // used as a hack to get json of the playlist <> video merged data - to run on first load
  // console.log("<<<", JSON.stringify(getMergePlaylistData()))

  const [tagFilter, setTagFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const getSearchFilterResult = (
    playlists: PlaylistModel[]
  ): PlaylistModel[] => {
    const filterByKeys = [
      "organisation",
      "videos.asatizah",
      "videos.tags",
      "videos.language",
      "title",
      "videos.title",
    ];
    const fuseFilterResults = getFuseFilterResult(
      playlists,
      filterByKeys,
      searchTerm
    );

    const fuseFilteredPlaylists: PlaylistModel[] = [];
    fuseFilterResults.forEach(result =>
      fuseFilteredPlaylists.push(result.item as PlaylistModel)
    );
    return fuseFilteredPlaylists;
  };

  const getFilteredPlaylists = (): PlaylistModel[] => {
    const playlistsFilteredByTag: PlaylistModel[] = tagFilter
      ? playlistsData.filter(playlist => playlist.tags.includes(tagFilter))
      : playlistsData;

    const playlistsFilteredBySearch: PlaylistModel[] = searchTerm
      ? getSearchFilterResult(playlistsFilteredByTag)
      : playlistsFilteredByTag;

    return playlistsFilteredBySearch;
  };

  const playlistsToDisplay: PlaylistModel[] =
    !tagFilter && !searchTerm ? playlistsData : getFilteredPlaylists();

  const handleTagFilterClick = (e: SpanEvent, tag: string): void => {
    e.stopPropagation();
    setTagFilter(tag);
    gtagEventClick("filter_by_tag", {
      event_category: GtagCategories.Engagement,
      event_label: tag,
    });
  };

  const handleSearchFilter = (e: InputEvent): void => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    gtagEventClick("search_playlists", {
      event_category: GtagCategories.Engagement,
      event_label: e.target.value,
    });
  };

  const sortPinnedPlaylistFirst = (
    playlists: PlaylistModel[]
  ): PlaylistModel[] => {
    return playlists.sort((currPlaylist, nextPlaylist) => {
      if (
        isPlaylistPinnedOnLocalStorage(currPlaylist.id) &&
        isPlaylistPinnedOnLocalStorage(nextPlaylist.id)
      )
        return 0;
      else if (isPlaylistPinnedOnLocalStorage(currPlaylist.id)) return -1;
      else return 0;
    });
  };

  const renderPlaylists = (): ReactElement[] => {
    const playlists = sortPinnedPlaylistFirst(playlistsToDisplay);
    return playlists.map(playlist => (
      <SinglePlaylist
        playlist={playlist}
        key={playlist.id}
        isPlaylistPinnedLocally={isPlaylistPinnedOnLocalStorage(playlist.id)}
        handleTagFilterClick={handleTagFilterClick}
      />
    ));
  };

  const renderCurrentTagFilter = (): ReactElement => {
    if (tagFilter) {
      return (
        <p className="mx-auto mb-8 rounded bg-gray-800 px-2 py-2 w-xs text-white font-semibold text-lg">
          Current Filter:
          <span className="text-teal-500"> #{tagFilter} </span>
          &middot;&nbsp;
          <span
            className="font-light hover:font-semibold cursor-pointer"
            onClick={(e): void => handleTagFilterClick(e, "")}
          >
            clear
          </span>
        </p>
      );
    }
    return <></>;
  };

  return (
    <div className="container mx-auto px-8 pt-8 pb-32" id="playlists">
      <SearchInput handleSearchFilter={handleSearchFilter} />
      {renderCurrentTagFilter()}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {renderPlaylists()}
      </div>
    </div>
  );
};

export default Playlists;
