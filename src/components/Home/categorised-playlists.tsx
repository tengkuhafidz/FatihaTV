import React, { ReactElement } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { PlaylistModel } from "../../models";
import { isMobileDevice } from "../../utils";
import SinglePlaylist from "./single-playlist";
import { useMediaQuery } from "react-responsive";

interface Props {
  playlists: PlaylistModel[];
  videoIds?: string[];
  categoryName: string;
}

const CategorisedPlaylists: React.FC<Props> = ({
  playlists,
  videoIds,
  categoryName,
}) => {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

  const carouselResponsiveOption = {
    superLargeDesktop: {
      breakpoint: { max: 8000, min: 2048 },
      items: 8,
      slidesToSlide: 8,
      partialVisibilityGutter: 45,
    },
    desktop: {
      breakpoint: { max: 2048, min: 1024 },
      items: 5,
      slidesToSlide: 5,
      partialVisibilityGutter: 0,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 4,
      slidesToSlide: 4,
      partialVisibilityGutter: 10,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 2,
      slidesToSlide: 2,
      partialVisibilityGutter: 10,
    },
  };

  const shouldShowDotNavigation = isMobileDevice() ? false : true;

  const renderPlaylists = (): ReactElement[] => {
    if (videoIds) {
      return playlists.map((playlist, index) => (
        <SinglePlaylist
          playlist={playlist}
          videoId={videoIds[index]}
          key={playlist.id}
        />
      ));
    }
    return playlists.map(playlist => (
      <SinglePlaylist playlist={playlist} key={playlist.id} />
    ));
  };

  return (
    <div className="md:pb-8 md:mb-2 relative">
      <h3 className="text-xl font-semibold mb-2">{categoryName}</h3>
      {isMobile ? (
        <div className="overflow-hidden overflow-x-scroll whitespace-no-wrap">
          {renderPlaylists()}
        </div>
      ) : (
        <Carousel
          responsive={carouselResponsiveOption}
          draggable={false}
          showDots={shouldShowDotNavigation}
          renderDotsOutside={true}
          removeArrowOnDeviceType="mobile"
        >
          {renderPlaylists()}
        </Carousel>
      )}
    </div>
  );
};

export default CategorisedPlaylists;
