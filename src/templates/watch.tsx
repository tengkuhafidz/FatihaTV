import React, { useState } from 'react'
import Layout from '../components/layout'
import VideoPlayer from '../components/Watch/video-player'
import VideoInPlaylist from '../components/Watch/video-in-playlist'
import { OutboundLink } from "gatsby-plugin-google-gtag"
import SEO from '../components/seo'
import { FaMapPin } from 'react-icons/fa'
import { addToLocalPinnedPlaylist, removeFromLocalPinnedPlaylist, isPlaylistPinnedOnLocalStorage } from '../utils'
import { gtagEventClick } from '../utils/gtag'
import { PlaylistModel, VideoModel } from '../models'

interface Props {
    pageContext: {
        playlist: PlaylistModel,
        currentVideo: VideoModel,
    }
}

const WatchPage: React.FC<Props> = ({ pageContext }) => {
    const { playlist, currentVideo } = pageContext
    const { videos, donationMethod } = playlist

    const isPlaylistPinnedLocally: boolean = isPlaylistPinnedOnLocalStorage(playlist.id)
    const [isPlaylistPinned, setIsPlaylistPinned] = useState(isPlaylistPinnedLocally)

    const handlePinPlaylist = () => {
        setIsPlaylistPinned(true)
        addToLocalPinnedPlaylist(playlist.id)
        gtagEventClick({
            action: "pin_playlist",
            playlist
        })
    }

    const handleUnpinPlaylist = () => {
        setIsPlaylistPinned(false)
        removeFromLocalPinnedPlaylist(playlist.id)
        gtagEventClick({
            action: "unpin_playlist",
            playlist
        })
    }

    const renderPlaylistVideos = () => {
        return videos.map((video, index) => (
            <VideoInPlaylist 
                playlistId={playlist.id} 
                video={video} 
                videoIndex={index} 
                currentVideo={currentVideo} 
                key={video.id} 
            />
        )
    )}

    const renderDonationMethod = () => {
        if (donationMethod) {
            return (
                <p className="text-xl flex flex-wrap">
                    <span className="font-semibold">
                        To donate: 
                    </span> 
                    <span className="text-gray-700 ml-1"> 
                        {playlist.donationMethod}
                    </span>
                </p>
            )
        }
        return <></>
    }

    return (
        <Layout>
            <SEO 
                title={playlist.title} 
                description={`${currentVideo.title} by ${currentVideo.asatizah}`} 
                image={playlist.thumbnailUrl}
            />
            <div className="grid xl:grid-cols-4 gap-4 m-8 pb-16">
                <div className="xl:col-span-3 mb-8">
                    <VideoPlayer playlist={playlist} video={currentVideo} />
                    <div className="mt-4">
                        <div className="flex flex-wrap">
                            <div className="w-full md:w-4/5">
                                <h1 className="text-3xl leading-none">
                                    {playlist.title}: {currentVideo.title} <span className="text-xl">by {currentVideo.asatizah}</span>
                                </h1>
                                <p className="text-xl">
                                    <span className="font-semibold">
                                        Source:&nbsp;
                                    </span>
                                    <OutboundLink 
                                        href={playlist.pageUrl} 
                                        target="_blank" 
                                        className="text-gray-700 underline"
                                    >
                                        {playlist.organisation} {playlist.platform}
                                    </OutboundLink>
                                </p>
                                { renderDonationMethod() }
                            </div>
                            <div className="w-full md:w-1/5">
                                <button 
                                    className={`bg-teal-500 hover:bg-teal-400 text-white py-2 px-4 rounded md:float-right mt-4 md:mt-auto md:w-auto uppercase inline border-b-4 border-teal-700 ${ isPlaylistPinned ? "hidden" : "block" }`} 
                                    onClick={handlePinPlaylist}
                                >
                                    <FaMapPin className="inline -mt-1 mr-2"/>
                                    Pin Playlist 
                                </button>
                                <button 
                                    className={`bg-gray-500 hover:bg-gray-400 text-white py-2 px-4 rounded md:float-right mt-4 md:mt-auto md:w-auto uppercase inline border-b-4 border-gray-700 ${ isPlaylistPinned ? "block" : "hidden" }`} 
                                    onClick={handleUnpinPlaylist}
                                >
                                    <FaMapPin className="inline -mt-1 mr-2"/>
                                    Unpin Playlist 
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-1 xl:pl-8">
                    <h1 className="text-3xl font-semibold mb-4">
                        Playlist Videos 
                        <span className="text-2xl">({ videos.length })</span>
                    </h1>
                    <div className="h-3/4-screen overflow-auto pb-16">
                        {renderPlaylistVideos()}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default WatchPage