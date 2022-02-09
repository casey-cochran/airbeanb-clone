import { useDispatch, useSelector  } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { loadAllSpots } from "../../store/spotReducer";



const SpotsList = () => {
    const dispatch = useDispatch();
    const allSpots = useSelector((state) => Object.values(state.spotReducer.spot));
    //const images = allSpots.map(images => images.Images)
    //console.log(images)
    const userId = useSelector((state) => state.session.user)
    //console.log(allSpots, 'id here ')

    console.log(allSpots.filter(spot => spot.Images.length > 0))
    const newspots = allSpots.filter(spot => spot.Images.length > 0)



    useEffect(() => {
        dispatch(loadAllSpots());
    },[dispatch])

    return (
        <div>
            <button type='submit'>
            <Link to={`/api/users/${userId.id}/spots`}>back to spots</Link>
            </button>
            <ul>
                {newspots?.map((spot,index) => {
                    return (
                    <div key={index}>
                        <img src={spot.Images[0].url} />
                        <div>
                            <p>{spot.name}</p>
                            <p>${spot.price} / night</p>
                        </div>
                        <p>{spot.city},{spot.state}</p>
                    </div>

                )})}
            </ul>
        </div>
    )
}





export default SpotsList;
