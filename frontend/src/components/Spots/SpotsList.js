import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { loadAllSpots } from "../../store/spotReducer";
import "./SpotsList.css";

const SpotsList = () => {
  const dispatch = useDispatch();
  const allSpots = useSelector((state) =>
    Object.values(state.spotReducer.spot)
  );
  const userId = useSelector((state) => state.session.user);
  const newspots = allSpots.filter((spot) => spot.Images.length > 0);

  useEffect(() => {
    dispatch(loadAllSpots());
  }, [dispatch]);

  return (
    <>
      <div id="spots-list-cont">
        <div className="spots-list-header">
          <div>
            {userId ? (
              <h2 id="spots-list-title">Your Dream Vacation Awaits</h2>
            ) : (
              <h1>log in or sign up here !</h1>
            )}
          </div>
        </div>
        <div className="all-spots-container">
          {newspots?.map((spot, index) => {
            return (
              <div className=".img-description" key={index}>
                <Link to={`/spots/${spot.id}`}>
                  <img className="all-spots-imgs" src={spot.Images[0].url} />
                </Link>
                <div className="spots-list-text" >
                  <p className="spots-list-text">
                    {spot.city}, {spot.state}
                  </p>
                  <p className="spots-list-text price">${spot.price} / night</p>
                </div>
                <div>
                  <p className="spots-list-text push">
                    Rooms {spot.room} Beds {spot.bed}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div id="spots-list-footer">
          <div>
            <Link
              to={{ pathname: "https://github.com/casey-cochran" }}
              target="_blank"
              className="footer-text"
            >
              Github
            </Link>
          </div>
          <div>
            <Link
              to={{
                pathname: "https://linkedin.com/in/casey-cochran-488420219/",
              }}
              target="_blank"
              className="footer-text"
            >
              Linkedin
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpotsList;
