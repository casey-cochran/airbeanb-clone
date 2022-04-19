import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchSpots } from "../../store/search";
import "./Search.css";

const Search = () => {
  const dispatch = useDispatch();
  const [searchVal, setSearchVal] = useState("");
  const [open, setOpen] = useState(false)
  const searchResults = useSelector((state) => Object.values(state.searchReducer.Search))


  useEffect(() => {
    dispatch(searchSpots(searchVal));
  }, [searchVal]);

  return (
    <div>
      <input
      onClick={(() => setOpen(true))}
      onBlur={(() => setOpen(false))}
        className="search-input"
        type="search"
        onChange={(e) => setSearchVal(e.target.value)}
        value={searchVal}
      />
      {open &&
      <div className="search-cont">
          {searchResults?.map((ele, i) => {
              return (
                  <div className="search-results-list" key={i}>
                      {ele.name}
                      </div>
              )
          })}

      </div>
    }
    </div>
  );
};

export default Search;
