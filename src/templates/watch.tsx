import { OutboundLink } from "gatsby-plugin-google-gtag";
import React, { createRef, ReactElement, useEffect, useRef } from "react";
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
  const { childrenVideo } = playlist;

  const videosListRef = createRef<HTMLDivElement>();
  const videosRef = useRef(
    childrenVideo.map(video => createRef<HTMLDivElement>())
  );

  useEffect(() => {
    const currentVideoIndex: number = childrenVideo.findIndex(
      video => video.id === currentVideo.id
    );

    const videosListEl = videosListRef.current;
    const firstVideoEl = videosRef.current[0].current;
    const currentVideoEl = videosRef.current[currentVideoIndex].current;

    if (videosListEl && firstVideoEl && currentVideoEl) {
      const topOfCurrentVideo: number =
        currentVideoEl.offsetTop - firstVideoEl.offsetTop || 0;
      videosListEl.scrollTop = topOfCurrentVideo;
    }
  });

  const renderPlaylistVideos = (): ReactElement[] => {
    return childrenVideo.map((video, index) => {
      return (
        <div ref={videosRef.current[index]} key={video.id}>
          <VideoInPlaylist
            playlistId={playlist.id}
            video={video}
            currentVideo={currentVideo}
          />
        </div>
      );
    });
  };

  return (
    <Layout>
      <SEO
        title={playlist.title}
        description={currentVideo.title}
        image={playlist.thumbnailUrl}
      />
      <div className="grid xl:grid-cols-4 gap-4 m-8 pb-16">
        <div className="xl:col-span-3 mb-8">
          <VideoPlayer playlist={playlist} video={currentVideo} />
          <div className="mt-8">
            <div className="flex flex-wrap">
              <div className="w-full md:w-4/6">
                <h1 className="text-xl text-gray-200 md:text-3xl font-semibold leading-none">
                  {playlist.title}: {currentVideo.title}{" "}
                </h1>
                <p className=" md:text-xl text-gray-500 mt-2 leading-tight">
                  Published at {currentVideo.publishedAt}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="xl:col-span-1 xl:pl-8">
          <h1 className="text-xl md:text-3xl font-semibold mb-4">
            Playlist Videos
            <span className="text-lg md:text-2xl">
              ({childrenVideo.length})
            </span>
          </h1>
          <div className="h-3/4-screen overflow-auto pb-16" ref={videosListRef}>
            {renderPlaylistVideos()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WatchPage;
