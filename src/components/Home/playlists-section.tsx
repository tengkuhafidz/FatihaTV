import { graphql, useStaticQuery } from "gatsby";
import React, { ReactElement, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import GeneralYoutubeChannelsData from "../../yt-channel-data/general-channels.json";
import KidsYoutubeChannelsData from "../../yt-channel-data/kids-channels.json";

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

interface Props {
  audience: string;
}

const PlaylistsSection: React.FC<Props> = ({ audience }): ReactElement => {
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
          title
          childrenVideo {
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

  const isForKids: boolean = audience === "kids";
  const ytChannelData: YoutubeChannelModel[] = isForKids
    ? KidsYoutubeChannelsData
    : GeneralYoutubeChannelsData;

  const playlistsToDisplay: PlaylistModel[] = getFilteredPlaylists().filter(
    playlist => ytChannelData.some(channel => playlist.channelId === channel.id)
  );

  const getRamadanPlaylists = (): PlaylistModel[] => {
    const filterByKeys = ["title", "childrenVideo.title"];
    const filterTerm = "ramadan";
    const fuseFilterResults: object[] = getFuseFilterResult(
      playlistsToDisplay,
      filterByKeys,
      filterTerm
    );
    const ramadanPlaylists = fuseFilterResults.map(result => result.item);
    return ramadanPlaylists.sort(
      (a, b) => moment(b.updatedAt) - moment(a.updatedAt)
    );
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
    return ytChannelData.map((channel, index) => {
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
