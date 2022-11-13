import { useState } from "react";
import {useNavigate} from 'react-router-dom'

import {FiSearch} from 'react-icons/fi'

const Searchbar = () => {

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()

    navigate(`/search/${searchTerm}`)
  }
  //We create function which is going to take in an event, we have to call event.preventDefault, as the default browser behavior is to reload the page once we submit a form (so we prevent it)(*usually this is common in react)
  //And then once we handle the submit, we want to navigate to `/search/${searchTerm}`, and we have to call that function as the onSubmit inside the form
  
  return (
  <form onSubmit={handleSubmit} autoComplete="off" className="p-2 text-gray-400 focus-within:text-gray-600">
    <label htmlFor="search-filed" className="sr-only">
      Search all songs
    </label>
    <div className="flex flex-row justify-start items-center">
      <FiSearch className="w-5 h-5 ml-4"/>
      <input
        name="search-filed"
        autoComplete="off"
        id="search-filed"
        placeholder="Search"
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        //We have to modify the searchTerm, so we change the value, and then onChange we set event to be setSearchTerm(e.target.value) 
        className="flex-1 bg-transparent border-none outline-none placeholder-gray-500 text-white p-4"
      />
    </div>
  </form>
  )
};

export default Searchbar;