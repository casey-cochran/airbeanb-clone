import { useParams, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { viewOneSpot } from "../../store/spotReducer";
import { bookOneSpot } from "../../store/bookingsReducer";
import "./ViewOneSpot.css";
import AllSpotReviews from "../AllSpotReviews/AllSpotReviews";


const ViewOneSpot = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { spotId } = useParams();
  const user = useSelector((state) => state.session.user);
  const spot = useSelector((state) => state.spotReducer.spot[spotId]);
  const userId = user?.id;

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errors, setErrors] = useState([]);



  useEffect(() => {
    dispatch(viewOneSpot(spotId));
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const spot = {
      spotId,
      userId,
      startDate,
      endDate,
    };

    const value = await dispatch(bookOneSpot(spot)).catch(async (err) => {
      const errors = await err.json();
      if (errors) {
        return errors;
      }
    });
    if (value.errors) {
      return setErrors(value.errors);
    }

    history.push(`/users/${userId}/bookings`);
  };

  return (
    <div id="view-one-spot-cont-top">
      <div>
        <div className="one-spot-cont">
          <div className="spot-reviews-cont">
            <div className="view-one-spot">
              <p className="one-spot-name title">{spot?.name}</p>
              <div>
                <p className="hosted-by">Hosted by {user?.username}</p>
              </div>

              <div className="resize-img">
                {spot?.Images.map((img, i) => (
                  <div key={i}>
                    <img src={img.url} />{" "}
                  </div>
                ))}
              </div>

              <div className="view-one-text">
                <div>
                  <p className="spots-list-text">
                    {spot?.city}, {spot?.state}
                  </p>
                </div>
                <div>
                  <p className="spots-list-text price tst">
                    ${spot?.price} / Night
                  </p>
                </div>
              </div>
              <div id="center-beds">
                <p className="spots-list-text push space">
                  Rooms {spot?.room} Beds {spot?.bed}
                </p>
              </div>

              {user ? (
                <div className="book-spot-container">
                  <h3 id="book-spot-title">Book this spot !</h3>
                  <form id="book-spot-form" onSubmit={handleSubmit}>
                    <ul>
                      {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                    <div className="sep-text date">
                      <label htmlFor="startDate">Start Date</label>
                      <input
                        onChange={(e) => setStartDate(e.target.value)}
                        value={startDate}
                        type="date"
                        required
                        id={userId}
                        className="create-spot-input reserve"
                      />
                    </div>
                    <div className="sep-text date">
                      <label htmlFor="endDate">End Date</label>
                      <input
                        onChange={(e) => setEndDate(e.target.value)}
                        value={endDate}
                        type="date"
                        required
                        id="endDate"
                        className="create-spot-input reserve"
                      />
                    </div>
                    <button className="review-btn wid res" type="submit">
                      Reserve
                    </button>
                    <Link className="back-home" to="/spots">
                      Back to Spot Listings
                    </Link>
                  </form>
                </div>
              ) : (
                <h3>Please Login or Signup to view further Details</h3>
              )}
            </div>
            <div className="all-reviews">
              <AllSpotReviews spotId={spotId} userId={userId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOneSpot;
