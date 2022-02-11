import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link, Redirect, useParams } from "react-router-dom";
import { loadBooking, cancelBooking } from "../../store/bookingsReducer";
import { fetchUserSpots } from "../../store/spotReducer";


const UserBookings = () => {
    const {userId} = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const bookings = useSelector((state) => Object.values(state.bookingsReducer.booking))
    const userBookings = bookings?.filter(booking =>  +userId === booking.userId)
    console.log(userBookings[0])
    useEffect(() => {
        dispatch(loadBooking(userId));
        dispatch(fetchUserSpots(userId))
    },[dispatch])


  if (sessionUser && sessionUser?.id !== +userId) {
    return <Redirect to="/" />;
  }

  if (!sessionUser) {
    return <Redirect to="/" />;
  }


    return (
        <div>
            {/* <div>
            <h2>Book your next vacation here</h2>
            <div>
                {userBookings?.map((booking,i) => <li key={i}>{booking.startDate}{booking?.Spot?.name}
                <button onClick={(() => dispatch(cancelBooking(booking.id, userId)))}>Cancel Booking</button></li>)}

            </div>
            <Link to='/'>Return Home</Link>
            </div> */}
            {userBookings.length > 0 ? <div>
            <h2>Book your next vacation here</h2>
            <div>
                {userBookings?.map((booking,i) => <li key={i}>{booking?.startDate}, {booking?.endDate}{booking?.Spot?.name}
                <button onClick={(() => dispatch(cancelBooking(booking?.id, userId)))}>Cancel Booking</button></li>)}

            </div>
            <Link to='/'>Return Home</Link>
            </div>: <div id='spots-empty-cont'><div id='spots-empty'>
      <h2 id='empty-spot-text'>Your next adventure awaits </h2>
      <Link to='/spots' className='create-spot-btn empty'>Book your next Vacation here !</Link> </div> </div>}
        </div>
    )
}


export default UserBookings;

 {/* <h1>hello from here </h1>
            <ul>
                {userBookings?.map((booking,i) => <li key={i}>{booking.startDate}{booking?.Spot?.name}
                <button onClick={(() => dispatch(cancelBooking(booking.id, userId)))}>Cancel Booking</button></li>)}

            </ul>
            <Link to='/'>Return Home</Link> */}
