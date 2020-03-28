import React from 'react'
import { FaVideo } from 'react-icons/fa';
import { navigate } from 'gatsby';
import {FaShare} from 'react-icons/fa'


const Header = () => {
    return (
        <nav className="flex items-center justify-between flex-wrap p-6 bg-gray-800 w-full">
            <div className="flex items-center flex-shrink-0 mr-6 cursor-pointer" onClick={() => navigate('/')}>
                <FaVideo size="2em" className="text-teal-500"/>
                <span className="font-medium text-2xl tracking-tight ml-2 text-gray-300">FatihaTV</span>
            </div>
            <div className="flex-grow"></div>
            <div className="block">
                <div>
                    <a href="#" className="inline-block text-sm px-4 py-3 leading-none border rounded border-gray-300 text-gray-300 hover:border-teal-500 hover:text-white hover:bg-teal-500 lg:mt-0 uppercase">Share this page<FaShare className="-mt-1 ml-2 inline align-middle"/></a>
                </div>
            </div>
         </nav>
    )
}

export default Header