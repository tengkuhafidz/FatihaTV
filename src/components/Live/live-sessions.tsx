import moment from 'moment'
import React, { useState } from 'react'
import LiveSessionsData from '../../data/live-sessions-data.json'
import SingleLiveSession from './single-live-session'
import Fuse, { IFuseOptions } from 'fuse.js'
import { LiveSessionModel, InputEvent } from '../../models'


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
    }

    const getFuseFilterResult = (upcomingLiveSessions: LiveSessionModel[]) => {
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
            <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-8" 
                id="search" 
                type="text" 
                placeholder="Try this shiny new search feature! ^_^"
                onChange={(e) => (handleSearchFilter(e))} 
            />
            <div className="grid md:grid-cols-2 gap-8">
                {renderLiveSessions()} 
            </div>
        </div>
    )
}

export default LiveSessions