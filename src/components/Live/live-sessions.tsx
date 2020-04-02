import moment from 'moment'
import React, { useState } from 'react'
import LiveSessionsData from '../../data/live-sessions-data.json'
import SingleLiveSession from './single-live-session'
import Fuse, { IFuseOptions } from 'fuse.js'
import { LiveSessionModel, InputEvent, GtagCategories } from '../../models'
import SearchInput from '../search-input'
import { gtagEventClick } from '../../utils/gtag'


const LiveSessions = () => {
    const [searchFilter, setSearchFilter] = useState("");

    const isUpcoming = (dateWithoutYear: string, time: string) => {
        const currentYear = moment().get('year')
        const dateTimeWithYear = `${dateWithoutYear} ${currentYear} ${time}`
        return moment(dateTimeWithYear).isAfter()
    }

    const upcomingLiveSessions: LiveSessionModel[] = LiveSessionsData.filter((session) => isUpcoming(session.Date, session.Time))

    const handleSearchFilter = (e: InputEvent) => {
        e.preventDefault();
        setSearchFilter(e.target.value)
        gtagEventClick('search_live_sessions', {
            event_category: GtagCategories.Engagement,
            event_label: e.target.value
        })
    }

    const getFuseFilterResult = (upcomingLiveSessions: LiveSessionModel[]): LiveSessionModel[] => {
        const options: IFuseOptions<any> = {
            caseSensitive: false,
            findAllMatches: false,
            includeMatches: false,
            includeScore: false,
            useExtendedSearch: false,
            minMatchCharLength: 1,
            shouldSort: true,
            threshold: 0.4,
            location: 0,
            distance: 100,
            keys: [
              "Date",
              "Time",
              "Mosque",
              "Title",
              "Speaker"
            ]
          }
          
        const fuse = new Fuse(upcomingLiveSessions, options)
        const fuseResults = fuse.search(searchFilter)
        const fuseFilteredPlaylists: LiveSessionModel[] = []
        fuseResults.forEach(result => fuseFilteredPlaylists.push(result.item as LiveSessionModel))
        return fuseFilteredPlaylists
    }

    const filteredSessions: LiveSessionModel[] = searchFilter ? getFuseFilterResult(upcomingLiveSessions) : upcomingLiveSessions

    const renderLiveSessions = () => {
        return filteredSessions.map((liveSession: LiveSessionModel, index: number) => <SingleLiveSession liveSession={liveSession} key={index}/>)
    }
    
    return (
        <div className="container mx-auto px-8 pt-8 pb-32" id="liveSessions">
            <SearchInput handleSearchFilter={handleSearchFilter}/>
            <div className="grid md:grid-cols-2 gap-8">
                {renderLiveSessions()} 
            </div>
        </div>
    )
}

export default LiveSessions