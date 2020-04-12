import { graphql, useStaticQuery } from "gatsby";
import React, { ReactElement, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import {
  GtagCategories,
  InputEvent,
  PlaylistModel,
  SpanEvent,
} from "../../models";
import {
  getFuseFilterResult,
  isPlaylistPinnedOnLocalStorage,
} from "../../utils";
import { gtagEventClick } from "../../utils/gtag";
import SearchInput from "../search-input";
import CategorisedPlaylists from "./categorised-playlists";

const PlaylistsSection = (): ReactElement => {
  const [tagFilter, setTagFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const data = useStaticQuery(graphql`
    query AllPlaylistsQuery {
      allPlaylist {
        edges {
          node {
            donationMethod
            id
            organisation
            pageUrl
            platform
            tags
            thumbnailUrl
            title
            videos {
              addedOn
              asatizah
              id
              language
              playlistId
              title
              videoUrl
            }
          }
        }
      }
    }
  `);

  const playlistsData: PlaylistModel[] = data.allPlaylist.edges.map(
    (datum: any) => {
      return datum.node;
    }
  );

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
    const fuseFilterResults: any[] = getFuseFilterResult(
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

  const playlists = sortPinnedPlaylistFirst(playlistsToDisplay);

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
      <CategorisedPlaylists
        playlists={playlists}
        handleTagFilterClick={handleTagFilterClick}
      />
    </div>
  );
};

export default PlaylistsSection;
