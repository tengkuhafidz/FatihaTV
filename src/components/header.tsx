import React, { useState } from 'react'
import { FaVideo } from 'react-icons/fa';
import { navigate } from 'gatsby';
import { FaAngleDown, FaFacebookSquare, FaWhatsapp, FaTwitter, FaTelegramPlane } from 'react-icons/fa'
import { gtagEventClick } from '../utils/gtag';
import { getSocialMediaShareUrls } from '../utils';


const Header = () => {
    const currentUrl = typeof window !== "undefined" ? window.location.href : "https://kuliah.sg"
    const { facebookShareUrl, whatsappShareUrl, telegramShareUrl, twitterShareUrl} = getSocialMediaShareUrls(currentUrl)

    const [isOpen, setIsOpen] = useState(false)

    const handleShareDropdownClick = () => {
        setIsOpen(!isOpen)
        trackOpenShareDropdown()
    }

    const trackOpenShareDropdown = () => {
        if(isOpen) {
            gtagEventClick({
                action: "open_share_dropdown",
                pagePath: currentUrl
            })
        }
    }

    return (
        <nav className="flex items-center justify-between flex-wrap p-6 bg-gray-800 w-full">
            <div className="flex items-center flex-shrink-0 mr-6 cursor-pointer" onClick={() => navigate('/')}>
                <img src="/kuliahsg-logo-long-light.png" className="h-12"/>
            </div>
            <div className="flex-grow"></div>
            <div>
                <button className="block text-sm px-4 py-3 leading-none border rounded border-gray-200 text-gray-200 hover:border-teal-500 hover:text-white hover:bg-teal-500 lg:mt-0 uppercase" onClick={handleShareDropdownClick}>
                    Share page<FaAngleDown className="-mt-1 ml-2 inline align-middle"/>
                </button>
                <div className={`bg-white rounded shadow-xl absolute ${isOpen ? "block" : "hidden"}`} style={{zIndex: 1000}}>
                    <a href={facebookShareUrl} className="block px-4 py-2 text-gray-800 hover:bg-teal-500 hover:text-gray-100"><FaFacebookSquare className="-mt-1 inline align-middle mr-2"/>Facebook</a>
                    <a href={whatsappShareUrl} className="block px-4 py-2 text-gray-800 hover:bg-teal-500 hover:text-gray-100"><FaWhatsapp className="-mt-1 inline align-middle mr-2"/>Whatsapp</a>
                    <a href={telegramShareUrl} className="block px-4 py-2 text-gray-800 hover:bg-teal-500 hover:text-gray-100"><FaTelegramPlane className="-mt-1 inline align-middle mr-2"/>Telegram</a>
                    <a href={twitterShareUrl} className="block px-4 py-2 text-gray-800 hover:bg-teal-500 hover:text-gray-100"><FaTwitter className="-mt-1 inline align-middle mr-2"/>Twitter</a>
                </div>
            </div>
         </nav>
    )
}

export default Header