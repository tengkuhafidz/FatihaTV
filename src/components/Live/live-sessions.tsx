import React from 'react'
import moment from 'moment'

import SingleLiveSession from './single-live-session'
import LiveSessionsData from '../../data/live-sessions-data.json'

const LiveSessions = () => {
    const isUpcoming = (dateWithoutYear: string) => {
        const currentYear = moment().get('year')
        const dateWithYear = `${dateWithoutYear} ${currentYear}`
        return moment(dateWithYear).isAfter()
    }
    const renderLiveSessions = () => {
        const upcomingLiveSessionsData = LiveSessionsData.filter((liveSession) => isUpcoming(liveSession.Date))
        return upcomingLiveSessionsData.map((data) => <SingleLiveSession data={data} />)
    }
    return (
        <div className="container mx-auto px-8 pt-16 pb-32" id="liveSessions">
            <div className="grid md:grid-cols-2 gap-8">
                {renderLiveSessions()} 
            </div>
        </div>
    )
}

export default LiveSessions