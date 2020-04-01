import moment from 'moment'
import React from 'react'
import { OutboundLink } from 'gatsby-plugin-google-gtag'
import { LiveSessionModel } from '../../models'

interface Props {
    liveSession: LiveSessionModel
}

const SingleLiveSession: React.FC<Props> = ({ liveSession }) => {
    const { Time, Mosque, Title, Speaker, Link, Date: date } = liveSession

    const getDateTime = () => {
        const currentYear = moment().get('year')
        const dateTime = `${ date } ${ currentYear } ${ Time }`
        return moment(dateTime).format('YYYYMMDDTHHmmss')
    }

    const getCalendarLink = () => {
        const details = `By+${Speaker},+Masjid+${Mosque}`
        const dateTime = getDateTime()
        return `https://calendar.google.com/calendar/r/eventedit?text=${Title}&dates=${dateTime}/${dateTime}&details=${details}`
    }

    const getFormattedDate = () => {
        const numberOnlyPattern = /\d+/g;
        const displayDate = moment(getDateTime()).calendar(moment(), {
            sameDay: '[Today]',
            nextDay: '[Tomorrow]',
            nextWeek: 'dddd',
            lastDay: '[Yesterday]',
            lastWeek: '[Last] dddd',
            sameElse: 'DD/MM/YYYY'
        });

        return {
            displayDay: displayDate,
            numericDay: date.match(numberOnlyPattern),
            month: date.replace(numberOnlyPattern, '')
        }
    }

    return (
        <div className="max-w-sm w-full lg:min-w-full lg:flex shadow-lg hover:shadow-2xl">
            <div className="lg:w-48 flex-none rounded-t lg:rounded-t-none lg:rounded-l text-center bg-gray-800 text-gray-200 pt-4 pb-8">
                <div className="border-l-4 border-r-4 border-white border text-gray-200 p-1 mx-6 mt-1 rounded">
                    <p className="font-bold">{getFormattedDate().displayDay}</p>
                </div>
                <span className="text-6xl">
                    {getFormattedDate().numericDay}
                    <span className="text-3xl"> {getFormattedDate().month} </span>
                </span>
                <span className="block text-2xl -mt-4">{Time}</span>
            </div>
            <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal w-full">
                <div className="mb-8">
                    <div className="text-gray-900 font-bold text-xl mb-2">{Title}</div>
                    <p className="text-gray-700 text-base">{Speaker}, Masjid {Mosque}</p>
                </div>
                <div className="flex items-center">
                    <OutboundLink 
                        className="bg-transparent hover:bg-gray-800 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded mr-4" 
                        target="_blank" 
                        href={Link}
                    >
                        View Source
                    </OutboundLink>
                    <OutboundLink 
                        className="bg-transparent hover:bg-gray-800 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded"
                        target="_blank" 
                        href={getCalendarLink()}
                    >
                        Add to Calendar
                    </OutboundLink>
                </div>
            </div>
        </div>
    )
}

export default SingleLiveSession