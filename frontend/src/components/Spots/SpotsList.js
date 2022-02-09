import { useDispatch, useSelector  } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { loadAllSpots } from "../../store/spotReducer";
import './SpotsList.css';



const SpotsList = () => {
    const dispatch = useDispatch();
    const allSpots = useSelector((state) => Object.values(state.spotReducer.spot));
    //const images = allSpots.map(images => images.Images)
    //console.log(images)
    const userId = useSelector((state) => state.session.user)
    //console.log(allSpots, 'id here ')

    // console.log(allSpots.filter(spot => spot.Images.length > 0))
    const newspots = allSpots.filter(spot => spot.Images.length > 0)
    console.log(newspots, ' new spots here ')


    useEffect(() => {
        dispatch(loadAllSpots());
    },[dispatch])

    return (
        <div>
            <button type='submit'>
            <Link to={`/api/users/${userId.id}/spots`}>back to spots</Link>
            </button>
            <div className="all-spots-container">
                    {newspots?.map((spot,index) => {
                        return (
                            <div className=".img-description" key={index}>
                                <Link to={`/api/spots/${spot.id}`}><img className="all-spots-imgs" src={spot.Images[0].url} /></Link>
                                    <div>
                                        <p>{spot.city}, {spot.state}</p>
                                        <p>${spot.price} / night</p>
                                    </div>

                            </div>
                    )})}
            </div>

        </div>
    )
}





export default SpotsList;
