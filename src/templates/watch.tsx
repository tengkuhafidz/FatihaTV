import { OutboundLink } from "gatsby-plugin-google-gtag";
import React, { ReactElement } from "react";
import { FaDonate } from "react-icons/fa";
import Layout from "../components/layout";
import SEO from "../components/seo";
import VideoInPlaylist from "../components/Watch/video-in-playlist";
import VideoPlayer from "../components/Watch/video-player";
import { PlaylistModel, VideoModel } from "../models";

interface Props {
  pageContext: {
    playlist: PlaylistModel;
    currentVideo: VideoModel;
  };
}

const WatchPage: React.FC<Props> = ({ pageContext }) => {
  const { playlist, currentVideo } = pageContext;
  const { videos, donationMethod } = playlist;

  const renderPlaylistVideos = (): ReactElement[] => {
    return videos.map(video => (
      <VideoInPlaylist
        playlistId={playlist.id}
        video={video}
        currentVideo={currentVideo}
        key={video.id}
      />
    ));
  };

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
                  {playlist.title}: {currentVideo.title}{" "}
                </h1>
              </div>
              <div className="w-full md:w-1/5">
                <OutboundLink
                  className={`bg-teal-500 hover:bg-teal-400 text-white py-2 px-4 rounded md:float-right mt-4 md:mt-auto md:w-auto uppercase inline border-b-4 border-teal-600`}
                  href="https://ourmasjid.sg/donate"
                  target="_blank"
                >
                  Donate To Mosque
                  <FaDonate className="inline -mt-1 ml-2" />
                </OutboundLink>
              </div>
            </div>
          </div>
        </div>
        <div className="xl:col-span-1 xl:pl-8">
          <h1 className="text-3xl font-semibold mb-4">
            Playlist Videos
            <span className="text-2xl">({videos.length})</span>
          </h1>
          <div className="h-3/4-screen overflow-auto pb-16">
            {renderPlaylistVideos()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WatchPage;
