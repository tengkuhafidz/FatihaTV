import React from 'react'
import moment from 'moment'

const SingleLiveSession = ({data}) => {
    const { Time, Mosque, Title, Speaker, Link } = data

    const getCalendarLink = () => {
        const details = `By+${Speaker},+Masjid+${Mosque}`
        const currentYear = moment().get('year')
        const dateTime = `${data.Date} ${currentYear} ${data.Time}`
        const formattedDateTime = moment(dateTime).format('YYYYMMDDTHHmmss')
        return `https://calendar.google.com/calendar/r/eventedit?text=${Title}&dates=${formattedDateTime}/${formattedDateTime}&details=${details}`
    }

    const getFormattedDate = () => {
        const numberOnlyPattern = /\d+/g;
        return {
            numericDay: data.Date.match(numberOnlyPattern),
            month: data.Date.replace(numberOnlyPattern, '')
        }
    }

    return (
        <div className="max-w-sm w-full lg:min-w-full lg:flex">
            <div className="h-48 lg:h-auto lg:w-48 flex-none rounded-t lg:rounded-t-none lg:rounded-l text-center bg-gray-800 text-gray-200 pt-3">
                <span className="text-6xl">{getFormattedDate().numericDay}<span className="text-3xl"> {getFormattedDate().month}</span></span>
                <span className="block text-2xl -mt-4">{Time}</span>
            </div>
            <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal w-full">
                <div className="mb-8">
                    <div className="text-gray-900 font-bold text-xl mb-2">{Title}</div>
                    <p className="text-gray-700 text-base">{Speaker}, {Mosque}</p>
                </div>
                <div className="flex items-center">
                    <a className="bg-transparent hover:bg-gray-800 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded mr-4" target="_blank" href={Link}>
                        View Source
                    </a>
                    <a className="bg-transparent hover:bg-gray-800 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded" target="_blank" href={getCalendarLink()}>
                        Add to Calendar
                    </a>
                </div>
            </div>
        </div>
    )
}

export default SingleLiveSession