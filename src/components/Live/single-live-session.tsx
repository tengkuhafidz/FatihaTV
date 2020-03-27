import React from 'react'
import 

const SingleLiveSession = () => (
    <div className="max-w-sm w-full lg:max-w-full lg:flex">
        <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div className="mb-8">
                <p className="text-sm text-gray-600 flex items-center">
                    Members only
                </p>
            <div className="text-gray-900 font-bold text-xl mb-2">Can coffee make you a better developer?</div>
            <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
            </p>
            </div>
            <div className="flex items-center">
                <img className="w-10 h-10 rounded-full mr-4" src="/img/jonathan.jpg" alt="Avatar of Jonathan Reinink" />
                <div className="text-sm">
                    <p className="text-gray-900 leading-none">Jonathan Reinink</p>
                    <p className="text-gray-600">Aug 18</p>
                </div>
            </div>
        </div>
    </div>
)

export default SingleLiveSession