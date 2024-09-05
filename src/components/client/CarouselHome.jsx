"use client";
import React from "react";
import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

const CarouselHome = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const imgStyle = {
    objectFit: "fill",
    width: "100%",
    height: "550px",
  };

  const tabSliders = [
    {
      src: "https://res.cloudinary.com/iset-sfax/image/upload/v1704894330/images/HZ25l2RqRZOCxWENeSe02upWPQeqX65S38EZ1cCi_eziwa4.png",
    },

    {
      src: "https://res.cloudinary.com/iset-sfax/image/upload/v1704815350/images/293655866_10158554434256436_6393822451040543552_n_dpjhvy.png",
    },

    {
      src: "https://res.cloudinary.com/iset-sfax/image/upload/v1704894080/images/Defricheurs-002_fpamub.webp",
    },

    {
      src: "https://res.cloudinary.com/iset-sfax/image/upload/v1704895129/images/Lireka-librairie-en-ligne-expatrie-livraison-monde-gratuite_v15lbx.jpg",
    },
  ];
  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {tabSliders.map((tab, i) => (
        <Carousel.Item key={i}>
          <img src={tab.src} alt="" style={imgStyle} />
        </Carousel.Item>
      ))}
      <Carousel.Item>
        <img
          src="https://res.cloudinary.com/iset-sfax/image/upload/v1704815350/images/293655866_10158554434256436_6393822451040543552_n_dpjhvy.png"
          style={imgStyle}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="https://res.cloudinary.com/iset-sfax/image/upload/v1704894080/images/Defricheurs-002_fpamub.webp"
          style={imgStyle}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="https://res.cloudinary.com/iset-sfax/image/upload/v1704894330/images/HZ25l2RqRZOCxWENeSe02upWPQeqX65S38EZ1cCi_eziwa4.png"
          style={imgStyle}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="https://res.cloudinary.com/iset-sfax/image/upload/v1704895129/images/Lireka-librairie-en-ligne-expatrie-livraison-monde-gratuite_v15lbx.jpg"
          style={imgStyle}
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselHome;
