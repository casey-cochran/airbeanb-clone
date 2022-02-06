import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserSpots } from "../../store/spotReducer";
import { useEffect, useState } from "react";



const UserSpots = () => {
    const dispatch = useDispatch();
    const {userId} = useParams();
    const spots = useSelector((state) =>  state.spotReducer.user.spot)
    

    useEffect(() => {
        dispatch(fetchUserSpots(userId))
    }, [dispatch])

    return (
        <div>
            <h1>hellop from specific users spot listings</h1>
            <ul>
                {spots?.map((spot, index) => {
                    return <li key={index}>{spot.name}</li>
                })}
            </ul>
        </div>
    )
}






export default UserSpots;
