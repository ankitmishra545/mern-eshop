import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

// this component searches in mongoDB and display
const Searchbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState(""); // state variable to recieve the search value

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`); // navigating to new routing with search query
  };

  return (
    <form className="flex items-center" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search product here..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-72 border-2 border-gray-200 border-e-0 py-1 px-3 rounded-s-2xl focus:outline-none bg-bg-secondary"
      />
      <button className="bg-bg-primary h-[35px] px-4 rounded-e-xl">
        <FaSearch color="white" />
      </button>
    </form>
  );
};

export default Searchbar;
