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
    console.log(startDate, endDate)

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
                {user ?
                <div>
                    <h3>Book this spot !</h3>
                    <form onSubmit={handleSubmit}>
                        <ul>
                            {errors.map((error,index) => <li key={index}>{error}</li>)}
                        </ul>
                        <div>
                            <label htmlFor='startDate'>Start Date</label>
                            <input
                                onChange={((e) => setStartDate(e.target.value))}
                                type={startDate}
                                type='date'
                                required
                                id='startDate'
                            />
                        </div>
                        <div>
                            <label htmlFor='endDate'>End Date</label>
                            <input
                                onChange={((e) => setEndDate(e.target.value))}
                                type={endDate}
                                type='date'
                                required
                                id='endDate'
                            />
                        </div>
                        <button type='submit'>Reserve</button>
                    </form>
                </div>
                : <h3>Log in or Sign up here !</h3> }
            </div>
    )
}




export default ViewOneSpot;
