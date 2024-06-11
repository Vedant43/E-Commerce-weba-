import { IoSearch } from "react-icons/io5";
import { MdShoppingCart } from "react-icons/md";
import { RiAccountBoxFill } from "react-icons/ri";

export const Navbar = () => {

return (
  <nav className="w-full ">
    <div className="flex justify-between h-12">
      <div className="flex items-center justify-center text-xl ml-4 cursor-pointer">
        Home
      </div>
      <div className="flex items-center justify-center ">
        <div className="mr-2">
          <IoSearch size={24}/>
        </div>
        <div className="mr-2">
          <MdShoppingCart size={24}/>
        </div>
        <div className="mr-4">
          <RiAccountBoxFill size={24}/>
        </div>
      </div>
    </div>
  </nav>
)}

