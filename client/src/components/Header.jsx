import logo from '../assets/eShop.jpg'
import Searchbar from './Searchbar'
import { FcLike } from "react-icons/fc";
import { BsCart4 } from "react-icons/bs";
import { LiaUserSecretSolid } from "react-icons/lia";

const HEADER_ICON = [
  {
    name: "wishlist",
    icon: <FcLike size="24px" />,
  },
  {
    name: "cart",
    icon: <BsCart4 size="24px"/>,
  },
  {
    name: "user",
    icon: <LiaUserSecretSolid size="24px"/>,
  },
]

const Header = () => {
  return (
    <div className='h-20 flex items-center justify-around border-b-2 border-gray-100 shadow-2xl'>
      <img src={logo} className='w-16'  />
      <Searchbar/>
      <ul className='flex w-48 justify-between p-3' >
        {
          HEADER_ICON.map(icon => (
            <li key={icon.name} className="cursor-pointer">
              {icon.icon}
            </li>
          ))
        }
        
      </ul>
    </div>
  )
}

export default Header