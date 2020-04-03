import moment from 'moment'
import React, { useState } from 'react'
import LiveSessionsData from '../../data/live-sessions-data.json'
import SingleLiveSession from './single-live-session'
import Fuse, { IFuseOptions } from 'fuse.js'
import { LiveSessionModel, InputEvent, GtagCategories } from '../../models'
import SearchInput from '../search-input'
import { gtagEventClick } from '../../utils/gtag'
import { getFuseFilterResult } from '../../utils'

const LiveSessions = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const isUpcoming = (dateWithoutYear: string, time: string) => {
        const currentYear = moment().get('year')
        const dateTimeWithYear = `${dateWithoutYear} ${currentYear} ${time}`
        return moment(dateTimeWithYear).isAfter()
    }

    const upcomingLiveSessions: LiveSessionModel[] = LiveSessionsData.filter((session) => isUpcoming(session.Date, session.Time))

    const handleSearchFilter = (e: InputEvent) => {
        e.preventDefault();
        setSearchTerm(e.target.value)
        gtagEventClick('search_live_sessions', {
            event_category: GtagCategories.Engagement,
            event_label: e.target.value
        })
    }

    const getSearchFilterResult = (upcomingLiveSessions: LiveSessionModel[]): LiveSessionModel[] => {
        const filterByKeys = [
            "Date",
            "Time",
            "Mosque",
            "Title",
            "Speaker"
          ]
        const fuseFilterResults = getFuseFilterResult(upcomingLiveSessions, filterByKeys, searchTerm)

        const fuseFilteredPlaylists: LiveSessionModel[] = []
        fuseFilterResults.forEach(result => fuseFilteredPlaylists.push(result.item as LiveSessionModel))
        return fuseFilteredPlaylists
    }

    const filteredSessions: LiveSessionModel[] = searchTerm ? getSearchFilterResult(upcomingLiveSessions) : upcomingLiveSessions

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