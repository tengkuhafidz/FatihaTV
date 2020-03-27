import React from 'react'

const SingleLiveSession = () => (
    <div className="max-w-sm w-full lg:max-w-full lg:flex">
        <div className="h-48 lg:h-auto lg:w-48 flex-none rounded-t lg:rounded-t-none lg:rounded-l text-center bg-gray-800 text-gray-200 pt-3">
            <span className="text-6xl">29<span className="text-3xl"> Mar</span></span>
            <span className="block text-2xl -mt-4">10:00 AM</span>
        </div>
        <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div className="mb-8">
                <div className="text-gray-900 font-bold text-xl mb-2">Kuliah Dhuha - Fiqh Kontemporari</div>
                <p className="text-gray-700 text-base">Ust Md Salam Nasip, Masjid Maarof</p>
            </div>
            <div className="flex items-center">
                <button className="bg-transparent hover:bg-gray-800 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded mr-4">
                    View Source
                </button>
                <button className="bg-transparent hover:bg-gray-800 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded">
                    Add to Calendar
                </button>
            </div>
        </div>
    </div>
)

export default SingleLiveSession