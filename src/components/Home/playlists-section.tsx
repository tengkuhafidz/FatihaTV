import { graphql, useStaticQuery } from "gatsby";
import React, { ReactElement, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import YoutubeChannelsData from "../../json-data/youtube-channels.json";
import {
  GtagCategories,
  InputEvent,
  PlayedPlaylistsModel,
  PlaylistModel,
  PlaylistsAndVideoIds,
  YoutubeChannelModel
} from "../../models";
import { getFuseFilterResult, getPlayedPlaylists } from "../../utils";
import { gtagEventClick } from "../../utils/gtag";
import NoResults from "../no-results";
import SearchInput from "../search-input";
import CategorisedPlaylists from "./categorised-playlists";
import moment from "moment";

const PlaylistsSection = (): ReactElement => {
  const [searchTerm, setSearchTerm] = useState("");
  const data = useStaticQuery(graphql`
    query AllPlaylistsQuery {
      allPlaylist(sort: { fields: updatedAt, order: DESC }) {
        nodes {
          channelTitle
          channelId
          id
          updatedAt
          publishedAt(fromNow: true)
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
    const filterByKeys = ["channelTitle", "title", "childrenVideo.title"];
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

    return playlistsFilteredBySearch;
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
    const ramadanPlaylists = fuseFilterResults.map(result => result.item);
    return ramadanPlaylists.sort((a, b) => {
      console.log(
        "b.updatedAt - a.updatedAt",
        moment(b.updatedAt) - moment(a.updatedAt),
        a,
        b
      );
      return moment(b.updatedAt) - moment(a.updatedAt);
    });
  };

  const handleSearchFilter = (e: InputEvent): void => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    gtagEventClick("search_playlists", {
      event_category: GtagCategories.Engagement,
      event_label: e.target.value
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
      videoIds
    };
  };

  const renderPlayedPlaylists = (): ReactElement => {
    const playedPlaylists: PlayedPlaylistsModel[] = getPlayedPlaylists();

    if (playedPlaylists.length > 0 && playlistsToDisplay.length > 0) {
      const {
        formattedPlayedPlaylists,
        videoIds
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

  const renderRamadanPlaylists = (): ReactElement => {
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
    const youtubeChannels: YoutubeChannelModel[] = YoutubeChannelsData as YoutubeChannelModel[];

    return youtubeChannels.map((channel, index) => {
      const playlistsInChannel = playlistsToDisplay.filter(
        playlist => playlist.channelId === channel.id
      );
      return (
        <CategorisedPlaylists
          playlists={playlistsInChannel}
          categoryName={channel.title}
          key={index}
        />
      );
    });
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
      <SearchInput handleSearchFilter={handleSearchFilter} />
      {renderPlayedPlaylists()}
      {renderRamadanPlaylists()}
      {renderResults()}
    </div>
  );
};

export default PlaylistsSection;
