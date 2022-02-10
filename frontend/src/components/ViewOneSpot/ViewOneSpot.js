import { useParams, useHistory } from "react-router-dom";
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

    history.push(`/users/bookings`)

    }


    return (
            <div className="view-one-spot">
                <p className='one-spot-name'>{spot?.name}</p>
                <div className='resize-img'>
                    {spot?.Images.map((img, i) => <div><img key={i} src={img.url} /> </div>)}
                </div>
                <div className="view-one-text">
                    <p>{spot?.city}</p>
                    <p>{spot?.state}</p>
                    <p>{spot?.country}</p>
                </div>
                <div>
                    <p className='hosted-by'>Hosted by {user?.username}</p>
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
                                id='startDate'
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
                            />
                        </div>
                        <button className='create-spot-btn' type='submit'>Reserve</button>
                    </form>
                </div>
                : <h3>Log in or Sign up here !</h3> }
            </div>
    )
}




export default ViewOneSpot;
