import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { viewOneSpot } from "../../store/spotReducer";
import './ViewOneSpot.css';


const ViewOneSpot = () => {
    const dispatch = useDispatch();
    const {spotId} = useParams();
    const user = useSelector((state) => state.session.user)
    const spot = useSelector((state) => state.spotReducer.spot[spotId])
    console.log(user)

    useEffect(() => {
        dispatch(viewOneSpot(spotId))
    },[dispatch])


    return (
            <div>
                <div>
                    <p>{spot?.name}</p>
                    <p>{spot?.city},{spot?.state},{spot?.country}</p>
                </div>
                <div className='resize-img'>
                    {spot?.Images.map((img, i) => <img key={i} src={img.url} />)}
                </div>
                <div>
                    <h2>{spot?.name} Hosted by {user?.username}</h2>
                </div>
            </div>
    )
}




export default ViewOneSpot;
