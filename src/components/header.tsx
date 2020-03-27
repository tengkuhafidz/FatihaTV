import React from 'react'
import { FaVideo } from 'react-icons/fa';
import { navigate } from 'gatsby';


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
                    <a href="#" className="inline-block text-sm px-4 py-2 leading-none border rounded border-gray-300 text-gray-300 hover:border-teal-500 hover:text-white hover:bg-teal-500 lg:mt-0">Submit Playlist</a>
                </div>
            </div>
         </nav>
    )
}

export default Header