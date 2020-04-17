import { graphql, useStaticQuery } from "gatsby";
import React, { ReactElement, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import {
  GtagCategories,
  InputEvent,
  PlaylistModel,
  PlayedPlaylistsModel,
  PlaylistsAndVideoIds,
} from "../../models";
import { getFuseFilterResult, getPlayedPlaylists } from "../../utils";
import { gtagEventClick } from "../../utils/gtag";
import SearchInput, { LanguageCode } from "../search-input";
import CategorisedPlaylists from "./categorised-playlists";

const PlaylistsSection = (): ReactElement => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>("all");
  const data = useStaticQuery(graphql`
    query AllPlaylistsQuery {
      allPlaylist(sort: { fields: updatedAt, order: DESC }) {
        nodes {
          channelTitle
          donationUrl
          id
          updatedAt
          language
          organisationName
          publishedAt
          tags
          thumbnailUrl
          title
          videos {
            id
            publishedAt
            title
            thumbnailUrl
          }
        }
      }
    }
  `);

  const playlistsData: PlaylistModel[] = data.allPlaylist.nodes;

  const getSearchFilterResult = (
    playlists: PlaylistModel[]
  ): PlaylistModel[] => {
    const filterByKeys = [
      "organisationName",
      "videos.language",
      "title",
      "videos.title",
    ];
    const fuseFilterResults: object[] = getFuseFilterResult(
      playlists,
      filterByKeys,
      searchTerm
    );
    return fuseFilterResults.map(result => result.item);
  };

  const getFilteredPlaylists = (): PlaylistModel[] => {
    const playlistsFilteredBySearch: PlaylistModel[] = searchTerm
      ? getSearchFilterResult(playlistsData)
      : playlistsData;

    const playlistsFilteredByLanguage =
      selectedLanguage === "all"
        ? playlistsFilteredBySearch
        : playlistsFilteredBySearch.filter(playlist =>
            playlist.language.includes(selectedLanguage)
          );

    return playlistsFilteredByLanguage;
  };

  const playlistsToDisplay: PlaylistModel[] = getFilteredPlaylists();

  const handleSearchFilter = (e: InputEvent): void => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    gtagEventClick("search_playlists", {
      event_category: GtagCategories.Engagement,
      event_label: e.target.value,
    });
  };

  const getFormattedPlaylistsAndVideoIds = (
    playedPlaylists: PlayedPlaylistsModel[]
  ): PlaylistsAndVideoIds => {
    const videoIds: string[] = [];
    const formattedPlayedPlaylists: PlaylistModel[] = [];

    playedPlaylists.forEach(playedPlaylist => {
      playlistsToDisplay.forEach(playlist => {
        if (playedPlaylist.playlistId === playlist.id) {
          formattedPlayedPlaylists.push(playlist);
          videoIds.push(playedPlaylist.videoId);
        }
      });
    });

    return {
      formattedPlayedPlaylists,
      videoIds,
    };
  };

  const renderPlayedPlaylists = (): ReactElement => {
    const playedPlaylists: PlayedPlaylistsModel[] = getPlayedPlaylists();

    if (playedPlaylists.length > 0 && playlistsToDisplay.length > 0) {
      const {
        formattedPlayedPlaylists,
        videoIds,
      } = getFormattedPlaylistsAndVideoIds(playedPlaylists);

      return videoIds.length ? (
        <CategorisedPlaylists
          playlists={formattedPlayedPlaylists}
          videoIds={videoIds}
          categoryName={"Continue Watching"}
        />
      ) : (
        <></>
      );
    }

    return <></>;
  };

  const renderPlaylistsByCategory = (): ReactElement[] => {
    const categories: object[] = [
      {
        name: "Short Videos",
        refs: ["short"],
      },
      {
        name: "Quran, Hadith & Kitab Lectures",
        refs: ["quran", "hadith", "kitab"],
      },
      {
        name: "Current Affairs & Podcast Format",
        refs: ["currentaffairs", "podcast"],
      },
      {
        name: "Practicing Islam & Spirituality",
        refs: ["howto", "spirituality"],
      },
      {
        name: "General Lectures",
        refs: ["general"],
      },
    ];

    return categories.map(
      (category, index): ReactElement => {
        const categorisedPlaylists: PlaylistModel[] = playlistsToDisplay.filter(
          (playlist: PlaylistModel) =>
            category.refs.some(ref =>
              playlist.tags
                .slice(0, Math.min(3, playlist.tags.length)) // Only take the first 2 tags
                .includes(ref)
            )
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
      <SearchInput
        handleSearchFilter={handleSearchFilter}
        showLanguageSelector={true}
        handleLanguageSelected={setSelectedLanguage}
        selectedLanguage={selectedLanguage}
      />
      {renderPlayedPlaylists()}
      {renderPlaylistsByCategory()}
    </div>
  );
};

export default PlaylistsSection;
