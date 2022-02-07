import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserSpots, removeSpot } from "../../store/spotReducer";
import { useEffect } from "react";
import EditSpot from "../EditSpot/EditSpot";





const UserSpots = () => {
    const dispatch = useDispatch();
    const {userId} = useParams();
    const spots = useSelector((state) =>  Object.values(state.spotReducer.spot))


    useEffect(() => {
        dispatch(fetchUserSpots(userId))
    }, [dispatch])


    return (
        <div>
            <h1>hellop from specific users spot listings</h1>
            <ul>
                {spots?.map((spot, index) => {
                    return <li key={index}>{spot.name}
                    <button onClick={(() => dispatch(removeSpot(userId, spot.id)))}>Delete</button>
                    <Link to={`/api/users/${userId}/spots/${spot.id}/edit`}>
                        <h4>Edit Spot here  </h4>
                        </Link>
                    </li>
                })}
            </ul>
        </div>
    )
}






export default UserSpots;
