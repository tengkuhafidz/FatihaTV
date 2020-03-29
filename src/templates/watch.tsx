import React from 'react'
import Layout from '../components/layout'
import VideoPlayer from '../components/Watch/video-player'
import VideoInPlaylist from '../components/Watch/video-in-playlist'
import { OutboundLink } from "gatsby-plugin-google-gtag"
import SEO from '../components/seo'

export default ({ pageContext }) => {
    const { playlist, currentVideo } = pageContext
    const { videos } = playlist

    const renderPlaylistVideos = () => {
        return videos.map((video, index) => (
            <VideoInPlaylist playlistId={playlist.id} video={video} videoIndex={index} currentVideo={currentVideo} key={video.id} />
        )
    )}

    return (
        <Layout>
            <SEO title={currentVideo.title} description={`Video by ${currentVideo.asatizah}`} image={playlist.thumbnailUrl}/>
            <div className="grid xl:grid-cols-4 gap-4 m-8 pb-16">
                <div className="xl:col-span-3 mb-8">
                    <VideoPlayer playlist={playlist} video={currentVideo} />
                    <div className="mt-4">
                        <h1 className="text-3xl leading-none">{currentVideo.title}</h1>
                        <h1 className="text-xl">Source: <OutboundLink href={playlist.pageUrl} target="_blank" className="text-teal-500">{playlist.organisation} {playlist.platform}</OutboundLink></h1>
                    </div>
                </div>
                <div className="xl:col-span-1 xl:pl-8">
                    <h1 className="text-3xl font-semibold mb-4">Playlist Videos <span className="text-2xl">({ videos.length })</span></h1>
                    <div className="h-3/4-screen overflow-auto pb-16">
                        {renderPlaylistVideos()}
                    </div>
                </div>
            </div>
        </Layout>
    )
}