import { useEffect, useState } from "react";
import { banners } from "../utils/constants";

// this component changing the banner for home page in every 2seconds!
const Banner = () => {
  const [bannerIndex, setBannerIndex] = useState(0);

  // this effect setting a time interval which taking a callback and time interval, and then clearing the created interval 'i'
  useEffect(() => {
    const i = setInterval(() => {
      setBannerIndex((bannerIndex + 1) % banners.length);
    }, 2000);

    return () => clearInterval(i); // clearing the created interval created
  }, [bannerIndex]);

  return (
    <div className="relative w-full h-96">
      <img src={banners[bannerIndex]} className="h-full md:w-full object-fill" />
      <p className="absolute bottom-0 right-0 text-white font-bold text-xs p-1">Image by freepik</p>
    </div>
  );
};

export default Banner;
