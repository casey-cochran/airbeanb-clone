import { useParams, Link, Redirect} from "react-router-dom";
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


  useEffect(() => {
    dispatch(fetchUserSpots(userId));
  }, [dispatch]);
  let data;

  if(sessionUser && sessionUser?.id !== +userId){
    return <Redirect to='/' />
  }

  if(!sessionUser) {
  return <Redirect to='/' />}

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
                <h3 id='spotname'>{spot.name}</h3>
                <div className="menu-btn-div">
                <Link className='drp-menu-btn pad' to={`/users/${userId}/spots/${spot.id}/edit`}>
                  <p id='h4test'>Edit Spot here </p>
                </Link>
                </div>
                <div className="menu-btn-div">
                <Link className='drp-menu-btn pad' to={`/users/${userId}/spots/${spot.id}`}>
                  Add Images
                </Link>
                </div>
                <div>
                <button className="menu-btn-div delete" onClick={() => dispatch(removeSpot(userId, spot.id))}>
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
//   }

  return <>{data ? data : <h3>working?</h3>}</>;
};

export default UserSpots;
