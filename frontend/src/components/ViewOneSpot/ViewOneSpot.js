import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";


const ViewOneSpot = () => {
    const dispatch = useDispatch();
    const {spotId} = useParams();
    console.log(spotId, ' spot id here ')


    return (
        <>
            <div>
                <h1>hello</h1>
                <h2>not rendering?</h2>
            </div>
        </>
    )
}




export default ViewOneSpot;
