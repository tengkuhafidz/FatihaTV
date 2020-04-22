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
import NoResults from "../no-results";

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
          updatedAt(fromNow: true)
          language
          organisationName
          publishedAt(fromNow: true)
          tags
          thumbnailUrl
          localImage {
            childImageSharp {
              fluid(maxWidth: 320, quality: 60) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          title
          childrenVideo {
            id
            publishedAt
            title
            thumbnailUrl
            localImage {
              childImageSharp {
                fluid(maxWidth: 320, quality: 60) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  `);

  const playlistsData: PlaylistModel[] = data.allPlaylist.nodes;

  const getSearchFilterResult = (
    playlists: PlaylistModel[]
  ): PlaylistModel[] => {
    const filterByKeys = ["organisationName", "title", "childrenVideo.title"];
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

  const getRamadanPlaylists = (): PlaylistModel[] => {
    const filterByKeys = ["title", "childrenVideo.title"];
    const filterTerm = "ramadan";
    const fuseFilterResults: object[] = getFuseFilterResult(
      playlistsToDisplay,
      filterByKeys,
      filterTerm
    );
    return fuseFilterResults.map(result => result.item);
  };

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

  const renderRamadhanPlaylists = (): ReactElement => {
    const ramadanPlaylists: PlaylistModel[] = getRamadanPlaylists();

    if (ramadanPlaylists.length > 0) {
      return (
        <CategorisedPlaylists
          playlists={ramadanPlaylists}
          categoryName="Ramadan Specials"
        />
      );
    }
    return <></>;
  };

  const renderPlaylistsByCategory = (): ReactElement[] => {
    const categories: object[] = [
      {
        name: "Short Videos - Under 10 Minutes",
        refs: ["short"],
      },
      {
        name: "Quran & Its Sciences",
        refs: ["quran"],
      },
      {
        name: "Legacy of Rasulullah PBUH",
        refs: ["hadith"],
      },
      {
        name: "Podcast & Current Affairs",
        refs: ["currentaffairs", "podcast", "interactive"],
      },
      {
        name: "Practising Islam & Spirituality",
        refs: ["howto", "spiritual"],
      },
      {
        name: "Kitab Studies & General Lectures",
        refs: ["kitab", "general"],
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

  const renderResults = (): ReactElement[] | ReactElement => {
    return playlistsToDisplay.length > 0 ? (
      renderPlaylistsByCategory()
    ) : (
      <NoResults />
    );
  };

  return (
    <div className="mx-auto pl-8 pt-8 pb-32 w-full" id="playlists">
      <SearchInput
        handleSearchFilter={handleSearchFilter}
        showLanguageSelector={true}
        handleLanguageSelected={setSelectedLanguage}
        selectedLanguage={selectedLanguage}
      />
      {renderPlayedPlaylists()}
      {renderRamadhanPlaylists()}
      {renderResults()}
    </div>
  );
};

export default PlaylistsSection;
