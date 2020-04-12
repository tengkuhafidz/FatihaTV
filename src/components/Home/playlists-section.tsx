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
    (datum: object) => {
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
    const fuseFilterResults: object[] = getFuseFilterResult(
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

  const renderCategoryPlaylists = (): ReactElement[] => {
    const categories: object[] = [
      {
        name: "Short Videos",
        refs: ["short"],
      },
      {
        name: "Quran & Hadith",
        refs: ["quran", "hadith", "kitab"],
      },
      {
        name: "Interactive & Podcast Format",
        refs: ["currentaffairs", "podcast"],
      },
      {
        name: "Practicing Islam & Spirituality",
        refs: ["howto", "currentaffairs"],
      },
      {
        name: "General Lectures",
        refs: ["general"],
      },
    ];

    return categories.map(
      (category, index): ReactElement => {
        const categorisedPlaylists: PlaylistModel[] = playlists.filter(
          (playlist: PlaylistModel) =>
            category.refs.some(ref => playlist.tags.includes(ref))
        );
        if (categorisedPlaylists.length > 0) {
          return (
            <CategorisedPlaylists
              playlists={categorisedPlaylists}
              categoryName={category.name}
              key={index}
            />
          );
        }
        return <></>;
      }
    );
  };

  return (
    <div className="mx-auto pl-8 pt-8 pb-32 w-full " id="playlists">
      <SearchInput handleSearchFilter={handleSearchFilter} />
      {renderCategoryPlaylists()}
    </div>
  );
};

export default PlaylistsSection;
