import { FaSearch } from "react-icons/fa";

const Searchbar = () => {
  return (
    <div className="flex items-center">
        <input type="text" placeholder="Search product here..." className="w-72 border-2 border-gray-200 border-e-0 py-1 px-3 rounded-s-2xl focus:outline-none bg-bg-secondary" />
        <button className="bg-bg-primary h-[35px] px-4 rounded-e-xl">
            <FaSearch color="white"/>
        </button>
    </div>
  )
}

export default Searchbar