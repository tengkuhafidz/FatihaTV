import React from 'react'

import Header from '../components/header'
import Hero from '../components/Home/hero'
import Playlists from '../components/Home/playlists'
import Footer from '../components/footer'
import { navigate } from 'gatsby'
import BottomCta from '../components/bottom-cta'

export default () => (
    <div className="min-h-screen bg-gray-100">
        <Header />
        <Hero />
        <div className="max-w-sm mx-auto">
            <ul className="flex">
                <li className="flex-1 mr-4">
                    <a className="text-center block border border-teal-500 rounded py-2 px-4 bg-teal-500 hover:bg-teal-500 text-white cursor-pointer" href="#playlists">Recorded Playlists</a>
                </li>
                <li className="flex-1">
                    <a className="text-center block border border-teal-500 rounded hover:border-gray-200 text-teal-500 hover:bg-teal-500 hover:text-white py-2 px-4 cursor-pointer" onClick={() => navigate('/live')}>Upcoming Lives</a>
                </li>
            </ul>
        </div>
        <Playlists />
        <BottomCta />
        <Footer />
    </div>
)
