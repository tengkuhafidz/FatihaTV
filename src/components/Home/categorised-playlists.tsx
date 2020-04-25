import React, { ReactElement } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { PlaylistModel } from "../../models";
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
  const isMobile = useMediaQuery({ maxWidth: 770 });

  const carouselResponsiveOption = {
    superLargeDesktop: {
      breakpoint: { max: 8000, min: 2048 },
      items: 8,
      slidesToSlide: 8,
    },
    desktop: {
      breakpoint: { max: 2048, min: 1024 },
      items: 5,
      slidesToSlide: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 770 },
      items: 4,
      slidesToSlide: 4,
    },
    mobile: {
      breakpoint: { max: 770, min: 0 },
      items: 2,
      slidesToSlide: 2,
    },
  };

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

  const renderMobileCarousel = (): ReactElement => {
    return (
      <div className="overflow-hidden overflow-x-scroll whitespace-no-wrap">
        {renderPlaylists()}
      </div>
    );
  };

  const renderCarousel = (): ReactElement => {
    return (
      <Carousel
        responsive={carouselResponsiveOption}
        draggable={false}
        showDots={true}
        renderDotsOutside={true}
      >
        {renderPlaylists()}
      </Carousel>
    );
  };

  return (
    <div className="mt-8 md:pb-8 relative">
      <h3 className="text-xl font-semibold mb-4">{categoryName}</h3>
      {isMobile ? renderMobileCarousel() : renderCarousel()}
    </div>
  );
};

export default CategorisedPlaylists;
