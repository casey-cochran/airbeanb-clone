import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadBooking } from "../../store/bookingsReducer";


const UserBookings = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const userId = user?.id
    const bookings = useSelector((state) => state.bookingsReducer)
    console.log(bookings, 'bookings stateselector')

    useEffect(() => {
        dispatch(loadBooking(userId));
    },[])

    return (
        <div>
            <h1>hello from here </h1>
        </div>
    )
}


export default UserBookings;
