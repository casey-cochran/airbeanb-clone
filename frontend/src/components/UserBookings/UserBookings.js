import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link, Redirect, useParams } from "react-router-dom";
import { loadBooking, cancelBooking } from "../../store/bookingsReducer";
import { fetchUserSpots } from "../../store/spotReducer";
import "./UserBookings.css";

const UserBookings = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const bookings = useSelector((state) =>
    Object.values(state.bookingsReducer.booking)
  );
  const userBookings = bookings?.filter(
    (booking) => +userId === booking.userId
  );

  useEffect(() => {
    dispatch(loadBooking(userId));
  }, [dispatch]);

  if (sessionUser && sessionUser?.id !== +userId) {
    return <Redirect to="/" />;
  }

  if (!sessionUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="spots-empty-cont booking">
      {userBookings?.length > 0 ? (
        <div className="top-booking-cont">
          <div id='testing-book' >
            <div>
                <h2 id='book-heading'>Your Adventures </h2>
              {userBookings?.map((booking, i) => (
                  <div className="user-booking-container" key={i}>
                  <div><img id='booking-images' src={booking?.Spot?.Images[0].url}></img></div>
                  <div className="booking-det-txt">{booking?.Spot?.name}</div>
                  <div className="booking-det-txt">{booking?.Spot?.address}, {booking?.Spot?.state}</div>
                  <div className="booking-det-txt">{booking?.startDate}, {booking?.endDate}</div>
                  <div className="booking-det-txt">${booking?.Spot?.price}</div>
                  <div className="booking-det-txt">Rooms: {booking?.Spot?.room}, Beds: {booking?.Spot?.bed}</div>
                  <div>
                  <Link className="bookings-btn link" to="/spots">Return to Spots List</Link>
                  <button className="bookings-btn"
                    onClick={() => dispatch(cancelBooking(booking?.id, userId))}
                  >
                    Cancel Booking
                  </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div >
          <div className="spots-empty booking">
            <h2 className="empty-spot-text">Your next adventure awaits </h2>
            <Link to="/spots" className="create-spot-btn empty booking">
              Book your next Vacation here !
            </Link>{" "}
          </div>{" "}
        </div>
      )}
    </div>
  );
};

export default UserBookings;

{
  /* <h1>hello from here </h1>
            <ul>
                {userBookings?.map((booking,i) => <li key={i}>{booking.startDate}{booking?.Spot?.name}
                <button onClick={(() => dispatch(cancelBooking(booking.id, userId)))}>Cancel Booking</button></li>)}

            </ul>
            <Link to='/'>Return Home</Link> */
}
