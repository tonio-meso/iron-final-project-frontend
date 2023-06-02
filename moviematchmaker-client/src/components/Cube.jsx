import React from "react";
// swiper/react exports 2 components: Swiper and SwiperSlide:
import { Swiper, SwiperSlide } from "swiper/react";
// swiper.scss - only core Swiper styles
import "swiper/swiper-bundle.css";
// by default Swiper React uses core version of Swiper (without any additional modules)
// that's why we have to import additional modules
import SwiperCore, { EffectCube, Pagination } from "swiper";

SwiperCore.use((EffectCube, Pagination));

const CubeSlider = ({ movies }) => {
  return (
    <Swiper
      effect="cube"
      grabCursor
      cubeEffect={{
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      }}
      pagination={{
        el: ".swiper-pagination",
      }}
      //   navigation={true} // enable the navigation
      //   direction="vertical"
    >
      {movies.map((movie) => (
        <SwiperSlide key={movie._id}>
          <img
            src={movie.poster_path}
            alt={movie.title}
            style={{ maxWidth: "80%", maxHeight: "80%" }}
          />
        </SwiperSlide>
      ))}
      <div className="swiper-pagination"></div>
    </Swiper>
  );
};

export default CubeSlider;
