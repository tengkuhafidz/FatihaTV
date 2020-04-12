import { graphql, useStaticQuery } from "gatsby";
import React, { ReactElement, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import { GtagCategories, InputEvent, PlaylistModel } from "../../models";
import {
  getFuseFilterResult,
  isPlaylistPinnedOnLocalStorage,
} from "../../utils";
import { gtagEventClick } from "../../utils/gtag";
import SearchInput from "../search-input";
import CategorisedPlaylists from "./categorised-playlists";

const PlaylistsSection = (): ReactElement => {
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
    const playlistsFilteredBySearch: PlaylistModel[] = searchTerm
      ? getSearchFilterResult(playlistsData)
      : playlistsData;

    return playlistsFilteredBySearch;
  };

  const playlistsToDisplay: PlaylistModel[] = !searchTerm
    ? playlistsData
    : getFilteredPlaylists();

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

  return (
    <div className="mx-auto pl-8 pt-8 pb-32 w-full " id="playlists">
      <SearchInput handleSearchFilter={handleSearchFilter} />
      <CategorisedPlaylists playlists={playlists} />
      <CategorisedPlaylists playlists={playlists} />
    </div>
  );
};

export default PlaylistsSection;
