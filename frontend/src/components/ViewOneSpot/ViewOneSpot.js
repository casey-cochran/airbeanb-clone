import { useParams, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { viewOneSpot } from "../../store/spotReducer";
import { bookOneSpot } from "../../store/bookingsReducer";
import './ViewOneSpot.css';


const ViewOneSpot = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {spotId} = useParams();
    const user = useSelector((state) => state.session.user)
    const spot = useSelector((state) => state.spotReducer.spot[spotId])
    const userId = user?.id
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errors, setErrors] = useState([]);


    useEffect(() => {
        dispatch(viewOneSpot(spotId))
    },[dispatch])

    const handleSubmit = async(e) => {
        e.preventDefault();

        const spot = {
            spotId,
            userId,
            startDate,
            endDate
        }

    const value = await dispatch(bookOneSpot(spot)).catch(async(err) => {
        const errors = await err.json()
        if(errors){
            return errors
        }
    })
    if(value.errors){
        return setErrors(value.errors)
    }

    history.push(`/users/${userId}/bookings`)

    }


    return (
            <div className="view-one-spot">
                <p className='one-spot-name'>{spot?.name}</p>
                <div >
                    <p className='hosted-by'>Hosted by {user?.username}</p>
                </div>
                <div className='resize-img'>
                    {spot?.Images.map((img, i) => <div><img key={i} src={img.url} /> </div>)}
                </div>
                <div className="view-one-text">
                    <div>
                    <p className="spots-list-text">{spot?.city}, {spot?.state}</p>
                    </div>
                    <div>
                    <p className="spots-list-text price tst">${spot?.price} / Night</p>
                    </div>
                </div>
                <div id='center-beds'>
                  <p className="spots-list-text push space">
                    Rooms {spot?.room} Beds {spot?.bed}
                  </p>
                </div>
                {user ?
                <div className="book-spot-container">
                    <h3 id='book-spot-title'>Book this spot !</h3>
                    <form id='book-spot-form' onSubmit={handleSubmit}>
                        <ul>
                            {errors.map((error,index) => <li key={index}>{error}</li>)}
                        </ul>
                        <div className='sep-text'>
                            <label htmlFor='startDate'>Start Date</label>
                            <input
                                onChange={((e) => setStartDate(e.target.value))}
                                type={startDate}
                                type='date'
                                required
                                id={userId}
                                className='create-spot-input reserve'
                            />
                        </div>
                        <div className='sep-text'>
                            <label htmlFor='endDate'>End Date</label>
                            <input
                                onChange={((e) => setEndDate(e.target.value))}
                                type={endDate}
                                type='date'
                                required
                                id='endDate'
                                className='create-spot-input reserve'
                            />
                        </div>
                        <button className='create-spot-btn listing' type='submit'>Reserve</button>
                        <Link className='back-home' to='/spots'>Back to Spot Listings</Link>
                    </form>
                </div>
                : <h3>Log in or Sign up here !</h3> }
            </div>
    )
}




export default ViewOneSpot;
