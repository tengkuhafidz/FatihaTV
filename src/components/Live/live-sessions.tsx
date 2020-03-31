import moment from 'moment'
import React, { useState } from 'react'
import LiveSessionsData from '../../data/live-sessions-data.json'
import SingleLiveSession from './single-live-session'
import Fuse from 'fuse.js'


const LiveSessions = () => {
    const [searchFilter, setSearchFilter] = useState("");

    const isUpcoming = (dateWithoutYear: string, time: string) => {
        const currentYear = moment().get('year')
        const dateTimeWithYear = `${dateWithoutYear} ${currentYear} ${time}`
        return moment(dateTimeWithYear).isAfter()
    }

    const upcomingLiveSessions = LiveSessionsData.filter((session) => isUpcoming(session.Date, session.Time))

    const handleSearchFilter = (e: any) => {
        e.preventDefault();
        setSearchFilter(e.target.value)
    }

    const getFuseFilterResult = (upcomingLiveSessions) => {
        const options = {
            isCaseSensitive: false,
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
        const fuseFilteredPlaylists: any[] = []
        fuseResults.forEach(result => fuseFilteredPlaylists.push(result.item))
        return fuseFilteredPlaylists
    }

    const filteredSessions = searchFilter ? getFuseFilterResult(upcomingLiveSessions) : upcomingLiveSessions



    const renderLiveSessions = () => {
        return filteredSessions.map((data, index) => <SingleLiveSession data={data} key={index}/>)
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