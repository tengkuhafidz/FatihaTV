import { navigate } from 'gatsby'
import React from 'react'
import BottomCta from '../components/bottom-cta'
import Hero from '../components/hero'
import Playlists from '../components/Home/playlists'
import Layout from '../components/layout'
import SEO from '../components/seo'

export default () => (
    <Layout>
        <SEO title="Local Islamic Videos" />
        <Hero />
        <div className="max-w-xs md:max-w-sm mx-auto">
            <ul className="flex">
                <li className="flex-1 mr-4">
                    <a className="text-center block border border-teal-500 rounded py-2 px-4 bg-teal-500 hover:bg-teal-500 text-white cursor-pointer" href="#playlists">Video Playlists</a>
                </li>
                <li className="flex-1">
                    <a className="text-center block border border-teal-500 rounded hover:border-gray-200 text-teal-500 hover:bg-teal-500 hover:text-white py-2 px-4 cursor-pointer" onClick={() => navigate('/live')}>Upcoming Lives</a>
                </li>
            </ul>
        </div>
        <p className="text-gray-600 text-center mt-8 font-light text-sm">Last Updated: 1st April 2020</p>
        <Playlists />
        <BottomCta />
    </Layout>
)
