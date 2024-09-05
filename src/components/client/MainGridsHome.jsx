import React from "react";

const MainGridsHome = () => {
  const tabGrids = [
    {
      src: "https://res.cloudinary.com/iset-sfax/image/upload/v1715438677/p-996609-621296907912954-1041494822-n_55_660x440_201404250316_w9vzpx.webp",
    },

    {
      src: "https://res.cloudinary.com/iset-sfax/image/upload/v1715438669/boulder-book-store-2022_ichels.webp",
    },

    {
      src: "https://res.cloudinary.com/iset-sfax/image/upload/v1715438688/vintage-book-store-savannah-ga-1024x703_lpx0ko.jpg",
    },
  ];
  const imgStyle = {
    objectFit: "fill",
    width: "100%",
    height: "550px",
  };
  return (
    <div className="container overflow-hidden">
      <div className="row gy-5">
        <div className="col-12">
          {tabGrids.map((tab, i) => {
            return (
              <div className="p-3 border bg-light" key={i}>
                <img src={tab.src} alt="" style={imgStyle} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainGridsHome;
