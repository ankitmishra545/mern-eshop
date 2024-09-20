import { useEffect, useState } from "react";
import { banners } from "../utils/constants";

const Banner = () => {
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    const i = setInterval(() => {
      setBannerIndex((bannerIndex + 1) % banners.length);
    }, 2000);

    return () => clearInterval(i);
  }, [bannerIndex]);

  return (
    <div className="relative w-full h-96">
      <img src={banners[bannerIndex]} className="h-full w-full object-fill" />
      <p className="absolute bottom-0 right-0 text-white font-bold text-sm p-1">Image by freepik</p>
    </div>
  );
};

export default Banner;
