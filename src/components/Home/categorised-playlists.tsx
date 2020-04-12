import React, { ReactElement } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { PlaylistModel } from "../../models";
import { isPlaylistPinnedOnLocalStorage } from "../../utils";
import SinglePlaylist from "./single-playlist";

interface Props {
  playlists: PlaylistModel[];
}

const CategorisedPlaylists: React.FC<Props> = ({ playlists }) => {
  const carouselResponsiveOption = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
      slidesToSlide: 8,
      partialVisibilityGutter: 45,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      slidesToSlide: 6,
      partialVisibilityGutter: 10,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
      slidesToSlide: 4,
      partialVisibilityGutter: 10,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 2,
      partialVisibilityGutter: 10,
    },
  };

  const renderPlaylists = (): ReactElement[] => {
    return playlists.map(playlist => (
      <SinglePlaylist
        playlist={playlist}
        key={playlist.id}
        isPlaylistPinnedLocally={isPlaylistPinnedOnLocalStorage(playlist.id)}
      />
    ));
  };

  return (
    <div className="pb-8 mb-8 relative">
      <h3 className="text-xl font-semibold mb-2">Category Title</h3>
      <Carousel
        responsive={carouselResponsiveOption}
        ssr={true}
        itemClass="pr-1"
        partialVisible
        draggable={false}
        showDots={true}
        renderDotsOutside={true}
        removeArrowOnDeviceType="mobile"
      >
        {renderPlaylists()}
      </Carousel>
    </div>
  );
};

export default CategorisedPlaylists;
