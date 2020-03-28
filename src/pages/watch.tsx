import React from 'react'
import { navigate } from 'gatsby'

import Header from '../components/header'
import VideoPlayer from '../components/Watch/player'
import Footer from '../components/footer'


export default ({ pageContext }) => {
    const { playlist, currentVideo } = pageContext
    const renderPlaylistVideos = () => {

        return playlist.videos.map((video, index) => {
            const videoNumber = index + 1;
            const isCurrentlyPlaying = video.id === currentVideo.id
            return (
                <div className={`w-full rounded-lg border-2 mb-4 shadow-sm hover:shadow-lg cursor-pointer w-full shadow-sm hover:shadow-lg ${isCurrentlyPlaying && "border-teal-500"}`} onClick={() => navigate(`/watch/${playlist.id}/${videoNumber}`)}>
                    <div className="px-6 py-2">
                        {   
                            isCurrentlyPlaying && (
                                <p className="text-teal-500 font-semibold uppercase text-sm">
                                    Currently Playing
                                </p>
                            )
                        }
                        <div className="font-bold text-lg">{video.title}</div>
                        <p className="text-gray-700 text-base">
                            Ustaz Tamliikhaa
                        </p>
                    </div>
                </div>
            )
        }
    )}

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="grid xl:grid-cols-4 gap-4 m-8 pb-16">
                <div className="xl:col-span-3 mb-8">
                    <VideoPlayer platform={playlist.platform} url={currentVideo.videoUrl} />
                    <div className="mt-4">
                        <h1 className="text-3xl">{currentVideo.title}</h1>
                        <h1 className="text-xl">Source: <a href={playlist.pageUrl} target="_blank" className="text-teal-500">{playlist.organisation} {playlist.platform}</a></h1>
                    </div>
                </div>
                <div className="xl:col-span-1 xl:pl-8">
                    <h1 className="text-3xl font-semibold mb-4">Playlist Videos <span className="text-2xl">({playlist.videos.length})</span></h1>
                    <div className="h-3/4-screen overflow-auto pb-16">
                        {renderPlaylistVideos()}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}