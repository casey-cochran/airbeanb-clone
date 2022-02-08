import { useDispatch, useSelector  } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { loadAllSpots } from "../../store/spotReducer";



const SpotsList = () => {
    const dispatch = useDispatch();
    const allSpots = useSelector((state) => Object.values(state.spotReducer.spot));
    const userId = useSelector((state) => state.session.user)
    console.log(userId, 'id here ')

    useEffect(() => {
        dispatch(loadAllSpots());
    },[dispatch])

    return (
        <div>
            <button type='submit'>
            <Link to={`/api/users/${userId.id}/spots`}>back to spots</Link>
            </button>
            <ul>
                {allSpots?.map((spot,index) => {
                    return <li key={index}>{spot.name}</li>
                })}
            </ul>
        </div>
    )
}





export default SpotsList;
