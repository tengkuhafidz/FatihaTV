import { navigate } from "gatsby";
import Img from "gatsby-image";
import React, { ReactElement } from "react";
import { GtagCategories, PlaylistModel } from "../../models";
import { gtagEventClick } from "../../utils/gtag";
import moment from "moment";

interface Props {
  playlist: PlaylistModel;
  videoId?: string;
}

const SinglePlaylist: React.FC<Props> = ({ playlist, videoId }) => {
  const { id, title, updatedAt, channelTitle, childrenVideo } = playlist;

  const trackPlaylistClick = (): void => {
    gtagEventClick("playlist_click", {
      event_category: GtagCategories.Engagement,
      event_label: playlist.title
    });
  };

  const handleClick = (): void => {
    const pagePath = videoId
      ? `/watch/${id}/${videoId}`
      : `/watch/${id}/${childrenVideo[childrenVideo.length - 1].id}`;

    trackPlaylistClick();

    navigate(pagePath);
  };

  const relevantVideo = videoId
    ? childrenVideo.find(video => video.id === videoId)
    : childrenVideo[childrenVideo.length - 1];

  const renderThumbnail = (): ReactElement => {
    const hasLocalImage =
      relevantVideo &&
      relevantVideo.localImage &&
      relevantVideo.localImage.childImageSharp &&
      relevantVideo.localImage.childImageSharp.fluid;

    if (hasLocalImage) {
      const thumbnailFluid = relevantVideo?.localImage?.childImageSharp?.fluid;
      return (
        <Img
          className="w-full z-10 thumbnail"
          fluid={thumbnailFluid}
          alt={title}
        />
      );
    } else {
      const thumbnailUrl = relevantVideo?.thumbnailUrl;
      return <img className="w-full z-10 thumbnail" src={thumbnailUrl} />;
    }
  };

  return (
    <div
      data-cy="playlist-card"
      className={`overflow-hidden align-center cursor-pointer inline-block thumbnail md:w-full`}
      onClick={handleClick}
    >
      {renderThumbnail()}
      <div>
        <div className="mt-2 text-gray-200 font-semibold w-48 md:w-full leading-tight truncate capitalize">
          {title.toLowerCase()}
        </div>
        <p className="text-gray-600 text-sm truncate capitalize">
          {channelTitle}
        </p>
        <p className="text-gray-600 text-sm truncate -mt-1">
          {moment(updatedAt).fromNow()} &middot; {childrenVideo.length}{" "}
          {childrenVideo.length === 1 ? "video " : "videos"}
        </p>
      </div>
    </div>
  );
};

export default SinglePlaylist;
