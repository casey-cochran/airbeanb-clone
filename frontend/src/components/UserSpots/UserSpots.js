import { useParams, Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserSpots, removeSpot } from "../../store/spotReducer";
import { useEffect } from "react";
import EditSpot from "../EditSpot/EditSpot";
import "./UserSpots.css";

const UserSpots = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const spots = useSelector((state) => Object.values(state.spotReducer.spot));
  const sessionUser = useSelector((state) => state.session.user);
  console.log(spots)

  useEffect(() => {
    dispatch(fetchUserSpots(userId));
  }, [dispatch]);

  if (sessionUser && sessionUser?.id !== +userId) {
    return <Redirect to="/" />;
  }

  if (!sessionUser) {
    return <Redirect to="/" />;
  }

  return (
    <>{ spots.length > 0 ?
    <div className="user-spots-container1">
      <div>
        <h2>Your spot listings below</h2>
      </div>
      <div className="spots-test">
        {spots?.map((spot, index) => {
          return (
            <div className="user-spots-returned" key={index}>
              <div className="user-spot-blocks">
                <h3 id="spotname">{spot.name}</h3>
                <p>{spot.address}</p>
                <p>{spot.city}</p>
                <p>{spot.state}</p>
                <p>{spot.country}</p>
                <p>{spot.zipcode}</p>
                <p>{spot.price}</p>
                <p>Rooms: {spot.room}</p>
                <p>Beds: {spot.bed}</p>
                <div className="menu-btn-div">
                  <Link
                    className="drp-menu-btn pad"
                    to={`/users/${userId}/spots/${spot.id}/edit`}
                  >
                    <p id="h4test">Edit Spot here </p>
                  </Link>
                </div>
                <div className="menu-btn-div">
                  <Link
                    className="drp-menu-btn pad"
                    to={`/users/${userId}/spots/${spot.id}`}
                  >
                    Add Images
                  </Link>
                </div>
                <div>
                  <button
                    className="menu-btn-div delete"
                    onClick={() => dispatch(removeSpot(userId, spot.id))}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div> : <div className='spots-empty-cont'><div className='spots-empty'>
      <h2 className='empty-spot-text booking'>Add a New Spot Listing Here  </h2>
      <Link to='/users/spots/new' className='create-spot-btn empty'>add new spot</Link> </div> </div>}
    </>
  );
};

export default UserSpots;
