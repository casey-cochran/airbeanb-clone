import { useDispatch, useSelector  } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { loadAllSpots } from "../../store/spotReducer";


const SpotsList = () => {
    const dispatch = useDispatch();
    const allSpots = useSelector((state) => Object.values(state.spotReducer.spot));
    console.log('al the spots on frontend', allSpots)

    useEffect(() => {
        dispatch(loadAllSpots());
    },[dispatch])

    return (
        <div>
            <ul>
                {allSpots?.map((spot,index) => {
                    return <li key={index}>{spot.name}</li>
                })}
            </ul>
        </div>
    )
}





export default SpotsList;
