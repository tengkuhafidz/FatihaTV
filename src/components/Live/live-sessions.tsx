import moment from 'moment'
import React from 'react'
import LiveSessionsData from '../../data/live-sessions-data.json'
import SingleLiveSession from './single-live-session'


const LiveSessions = () => {
    const isUpcoming = (dateWithoutYear: string, time: string) => {
        const currentYear = moment().get('year')
        const dateTimeWithYear = `${dateWithoutYear} ${currentYear} ${time}`
        return moment(dateTimeWithYear).isAfter()
    }
    const renderLiveSessions = () => {
        const upcomingLiveSessionsData = LiveSessionsData.filter((session) => isUpcoming(session.Date, session.Time))
        return upcomingLiveSessionsData.map((data, index) => <SingleLiveSession data={data} key={index}/>)
    }
    return (
        <div className="container mx-auto px-8 pt-8 pb-32" id="liveSessions">
            <div className="grid md:grid-cols-2 gap-8">
                {renderLiveSessions()} 
            </div>
        </div>
    )
}

export default LiveSessions