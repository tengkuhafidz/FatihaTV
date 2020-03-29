import { navigate } from 'gatsby'
import React from 'react'
import BottomCta from '../components/bottom-cta'
import Hero from '../components/hero'
import Layout from '../components/layout'
import LiveSessions from '../components/Live/live-sessions'
import SEO from '../components/seo'

export default () => (
    <Layout>
        <SEO title="Upcoming Lives" description="Check out the list of upcoming live sessions by our asatizah, and save it to you calendar!" />
        <Hero />
        <div className="max-w-sm mx-auto">
            <ul className="flex">
                <li className="flex-1 mr-4">
                    <a className="text-center block border border-teal-500 rounded hover:border-gray-200 text-teal-500 hover:bg-teal-500 hover:text-white py-2 px-4 cursor-pointer" onClick={() => navigate('/')}>
                        Recorded Playlists
                    </a>
                </li>
                <li className="flex-1">
                    <a className="text-center block border border-teal-500 rounded py-2 px-4 bg-teal-500 hover:bg-teal-500 text-white" href="#liveSessions">
                        Upcoming Lives
                    </a>
                </li>
            </ul>
        </div>
        <LiveSessions />
        <BottomCta />
    </Layout>
)
