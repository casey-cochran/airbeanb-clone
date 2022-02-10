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
  console.log(sessionUser.id, spots[0]?.userId);

  useEffect(() => {
    dispatch(fetchUserSpots(userId));
  }, [dispatch]);
  let data;
  if(!sessionUser) {
  return <Redirect to='/' />}
  if (sessionUser && sessionUser.id === spots[0]?.userId) {
    data = (
      <div className="user-spots-container1">
        <div>
            <h2>Your spot listings below</h2>
        </div>
        <div className="spots-test">
          {spots?.map((spot, index) => {
            return (
              <div className="user-spots-returned" key={index}>
                  <div className="user-spot-blocks">
                <h3>{spot.name}</h3>
                <Link to={`/api/users/${userId}/spots/${spot.id}/edit`}>
                  <h4 id='h4test'>Edit Spot here </h4>
                </Link>
                <Link to={`/api/users/${userId}/spots/${spot.id}`}>
                  Add Images
                </Link>
                <div>
                <button onClick={() => dispatch(removeSpot(userId, spot.id))}>
                  Delete
                </button>
                </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return <>{data ? data : <h3>working?</h3>}</>;
};

export default UserSpots;
