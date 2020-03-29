import { navigate } from 'gatsby'
import React from 'react'
import BottomCta from '../components/bottom-cta'
import Hero from '../components/hero'
import Layout from '../components/layout'
import LiveSessions from '../components/Live/live-sessions'
import SEO from '../components/seo'
import { OutboundLink } from 'gatsby-plugin-google-gtag'

export default () => (
    <Layout>
        <SEO title="Upcoming Live Sessions" description="Check out the list of upcoming live sessions by our asatizah, and save it to your calendar!" />
        <Hero />
        <div className="max-w-xs md:max-w-sm mx-auto">
            <ul className="flex">
                <li className="flex-1 mr-4">
                    <a className="text-center block border border-teal-500 rounded hover:border-gray-200 text-teal-500 hover:bg-teal-500 hover:text-white py-2 px-4 cursor-pointer" onClick={() => navigate('/')}>
                        Video Playlists
                    </a>
                </li>
                <li className="flex-1">
                    <a className="text-center block border border-teal-500 rounded py-2 px-4 bg-teal-500 hover:bg-teal-500 text-white" href="#liveSessions">
                        Upcoming Lives
                    </a>
                </li>
            </ul>
        </div>
        <p className="text-gray-600 text-center mt-8 font-light text-sm">Last Updated: 29 March 2020  &middot; Source: <OutboundLink target="_blank" className="underline" href="https://docs.google.com/spreadsheets/d/1nO1QgB_1FEp-ilYZmNiA8nUvODp7S0E-_8IJVxeCm64/edit#gid=1909209122">MUIS</OutboundLink></p>
        <LiveSessions />
        <BottomCta />
    </Layout>
)
