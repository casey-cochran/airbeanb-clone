import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { loadBooking } from "../../store/bookingsReducer";
import { fetchUserSpots } from "../../store/spotReducer";


const UserBookings = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const userId = user?.id
    const bookings = useSelector((state) => Object.values(state.bookingsReducer.booking))
    console.log(bookings, 'bookings stateselector')

    useEffect(() => {
        dispatch(loadBooking(userId));
        dispatch(fetchUserSpots(userId))

    },[])

    return (
        <div>
            <h1>hello from here </h1>
            <ul>
                {bookings?.map((booking,i) => <li key={i}>{booking.startDate}{booking?.Spot?.name}</li>)}

            </ul>
            <Link to='/'>Return Home</Link>
        </div>
    )
}


export default UserBookings;
