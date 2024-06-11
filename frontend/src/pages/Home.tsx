import { Link, useNavigate } from "react-router-dom";
import { LatestProduct } from "../Components/LatestProducts";
import { Navbar } from "../Components/Navbar";
// import { FilteredProduct } from "../Components/FilteredProduct";
import coverImage from "../assets/cover.jpg";
import { SearchProduct } from "./SearchProduct";

export const Home = () => {

  return (
    <div className="mt-4">
      <Navbar />
      <div className="m-4">
        <img src={coverImage} className="w-full h-72"></img>
      </div>
      <div className="flex justify-between font-custom ml-4 mr-4 mt-8x">
        <div className=" text-xl font-light uppercase tracking-wider ">
          Latest products
        </div>
        <Link to="/search">
          <div className="cursor-pointer font-extralight mr-3">More</div>
        </Link>
      </div>
      <div className="mt-3">
        <LatestProduct />
      </div>
    </div>
  );
};
