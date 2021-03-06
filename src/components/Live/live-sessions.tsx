import moment from "moment";
import React, { ReactElement, useState } from "react";
import SingleLiveSession from "./single-live-session";
import { GtagCategories, InputEvent, LiveSessionModel } from "../../models";
import SearchInput from "../search-input";
import { gtagEventClick } from "../../utils/gtag";
import { getFuseFilterResult } from "../../utils";
import { useStaticQuery, graphql } from "gatsby";
import NoResults from "../no-results";

const LiveSessions = (): ReactElement => {
  const [searchTerm, setSearchTerm] = useState("");
  const data = useStaticQuery(graphql`
    {
      allLiveSession {
        nodes {
          Date
          Link
          Mosque
          Speaker
          Time
          Title
        }
      }
    }
  `);

  const LiveSessionsData: LiveSessionModel[] = data.allLiveSession.nodes;

  const getSortedLiveSessions = (): LiveSessionModel[] => {
    return LiveSessionsData.sort((a, b) => {
      return moment(a.Date).diff(b.Date);
    });
  };

  const isUpcoming = (date: string, time: string): boolean => {
    const dateTimeWithTime = `${date} ${time}`;
    return moment(dateTimeWithTime, "D MMM YYYY hh:mm A").isAfter();
  };

  const upcomingLiveSessions: LiveSessionModel[] = getSortedLiveSessions().filter(
    session => isUpcoming(session.Date, session.Time)
  );

  const handleSearchFilter = (e: InputEvent): void => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    gtagEventClick("search_live_sessions", {
      event_category: GtagCategories.Engagement,
      event_label: e.target.value,
    });
  };

  const getSearchFilterResult = (
    upcomingLiveSessions: LiveSessionModel[]
  ): LiveSessionModel[] => {
    const filterByKeys = ["Date", "Time", "Mosque", "Title", "Speaker"];
    const fuseFilterResults = getFuseFilterResult(
      upcomingLiveSessions,
      filterByKeys,
      searchTerm
    );

    const fuseFilteredPlaylists: LiveSessionModel[] = [];
    fuseFilterResults.forEach(result =>
      fuseFilteredPlaylists.push(result.item as LiveSessionModel)
    );
    return fuseFilteredPlaylists;
  };

  const filteredSessions: LiveSessionModel[] = searchTerm
    ? getSearchFilterResult(upcomingLiveSessions)
    : upcomingLiveSessions;

  const renderLiveSessions = (): ReactElement[] => {
    return filteredSessions.map(
      (liveSession: LiveSessionModel, index: number) => (
        <SingleLiveSession liveSession={liveSession} key={index} />
      )
    );
  };

  const renderResults = (): ReactElement => {
    if (filteredSessions.length > 0) {
      return (
        <div className="grid md:grid-cols-2 gap-8">{renderLiveSessions()}</div>
      );
    }
    return <NoResults />;
  };

  return (
    <div className="container mx-auto px-8 pt-8 pb-32" id="liveSessions">
      <SearchInput handleSearchFilter={handleSearchFilter} />
      {renderResults()}
    </div>
  );
};

export default LiveSessions;
