import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchSpots } from "../../store/search";
import { NavLink } from "react-router-dom";
import {BsSearch} from 'react-icons/bs';
import { viewOneSpot } from "../../store/spotReducer";
import "./Search.css";

const Search = () => {
  const dispatch = useDispatch();
  const [searchVal, setSearchVal] = useState("");
  const [showMenu, setShowMenu] = useState(false)
  const searchResults = useSelector((state) => Object.values(state.searchReducer.Search))



  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = () => {
      setShowMenu(false);
    };
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);


  useEffect(() => {
    dispatch(searchSpots(searchVal));
  }, [searchVal]);

  return (
    <div>
        <BsSearch  className="search-icon" />
      <input
      onClick={(() => setShowMenu(true))}
    //   onBlur={(() => setOpen(false))}
        className="search-input"
        type="search"
        onChange={(e) => setSearchVal(e.target.value)}
        value={searchVal}
      />
      {showMenu &&
      <div className="search-cont">
          {searchResults.length > 0 ? searchResults?.map((ele, i) => {
              return (
                  <NavLink className="spot-links" to={`/spots/${ele.id}`}>
                  <div onClick={(() => dispatch(viewOneSpot(ele.id)))} className="search-results-list" key={i}>
                  {ele.name}
                      </div>
                     </NavLink>
              )
          }) : <div className="search-results-list">No search results found</div>}

      </div>
    }
    </div>
  );
};

export default Search;
