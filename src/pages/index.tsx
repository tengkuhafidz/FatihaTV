import { Link } from 'gatsby'
import React from 'react'
import BottomCta from '../components/bottom-cta'
import Hero from '../components/hero'
import Playlists from '../components/Home/playlists'
import Layout from '../components/layout'
import SEO from '../components/seo'

export default () => (
    <Layout>
        <SEO title="Local Islamic Videos" />
        <Hero 
            title="Watch local Islamic content"
            subtext="Our local asatizah have been hard at work in producing online contents to ensure that we can continue to seek religious knowledge in this uncertain time. We curate them here to support their efforts."
        />
        <div className="max-w-xs md:max-w-sm mx-auto">
            <ul className="flex">
                <li className="flex-1 mr-4">
                    <a 
                        className="text-center block border border-teal-500 rounded py-2 px-4 bg-teal-500 hover:bg-teal-500 text-white cursor-pointer" 
                        href="#playlists"
                    >
                        Video Playlists
                    </a>
                </li>
                <li className="flex-1">
                    <Link
                        to={'/live'}
                        className="text-center block border border-teal-500 rounded hover:border-gray-200 text-teal-500 hover:bg-teal-500 hover:text-white py-2 px-4 cursor-pointer" 
                    >
                        Upcoming Lives
                    </Link>
                </li>
            </ul>
        </div>
        <p className="text-gray-600 text-center mt-8 font-light text-sm">Last Updated: 2nd April 2020</p>
        <Playlists />
        <BottomCta />
    </Layout>
)
