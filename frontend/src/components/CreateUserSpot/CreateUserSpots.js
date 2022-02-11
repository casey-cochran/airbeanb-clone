import {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect, Link } from "react-router-dom";
import { restoreUser } from '../../store/session';
import { createUserSpot } from '../../store/spotReducer';
import './CreateUserSpot.css';




const CreateUserSpots = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector((state) => state.session.user)
    const userId = user?.id


    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [country, setCountry] = useState('')
    const [price, setPrice] = useState('')
    const [room, setRoom] = useState('')
    const [bed, setBed] = useState('')
    const [errors, setErrors] = useState([]);

    if(!user) return <Redirect to='/' />;

    const handleSubmit = async(e) => {
        e.preventDefault();

        const spot = {
            userId,
            name,
            address,
            city,
            state,
            zipCode,
            country,
            price,
            room,
            bed
        }

        const value = await dispatch(createUserSpot(spot)).catch(async (err) => {
            const errors = await err.json()
            if(errors){
                return errors
            }
        });
        if(value.errors) {
            return  setErrors(value.errors)
        }

        setName('')
        setAddress('')
        setCity('')
        setState('')
        setZipCode('')
        setCountry('')
        setPrice('')
        setRoom('')
        setBed('')
        setErrors([]);
        history.push(`/users/${userId}/spots/${value.spot.id}`);
    }

    return (
        <div className='create-spot-container'>
                <div className='logo-plus-text'>
                    <p className='create-spot-logo'><i className="fab fa-airbnb" /></p>
                    <p>What kind of space will guests have?</p>
                </div>
                <div className='form test2'>
                    <form onSubmit={handleSubmit} className='create-spot'>
                        <ul>
                            {errors?.map((error, index) => <li key={index}>{error}</li>)}
                        </ul>
                        <div className='sep-text'>
                            <label htmlFor='name'></label>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                className='create-spot-input'
                                required
                                type='text'
                                id='name'
                                placeholder='Spot Name'
                                className='create-spot-input'
                            />
                        </div>
                        <div className='sep-text'>
                            <label htmlFor='address'></label>
                            <input
                                onChange={(e) => setAddress(e.target.value)}
                                value={address}
                                className='create-spot-input'
                                placeholder='Address'
                                required
                                type='text'
                                id='address'
                                className='create-spot-input'
                            />
                        </div>
                        <div className='sep-text'>
                            <label htmlFor='city'></label>
                            <input
                                onChange={(e) => setCity(e.target.value)}
                                value={city}
                                className='create-spot-input'
                                placeholder='City'
                                required
                                type='text'
                                id='city'
                                className='create-spot-input'
                            />
                        </div>
                        <div className='sep-text'>
                            <label htmlFor='state'></label>
                            <input
                                onChange={(e) => setState(e.target.value)}
                                value={state}
                                className='create-spot-input'
                                required
                                placeholder='State'
                                type='text'
                                id='state'
                                className='create-spot-input'
                            />
                        </div>
                        <div className='sep-text'>
                            <label htmlFor='zipcode'></label>
                            <input
                                onChange={(e) => setZipCode(e.target.value)}
                                value={zipCode}
                                className='create-spot-input'
                                required
                                placeholder='Zip Code'
                                type='text'
                                id='zipcode'
                                className='create-spot-input'
                            />
                        </div>
                        <div className='sep-text'>
                            <label htmlFor='country'></label>
                            <input
                                onChange={(e) => setCountry(e.target.value)}
                                value={country}
                                className='create-spot-input'
                                placeholder='Country'
                                required
                                type='text'
                                id='country'
                                className='create-spot-input'
                            />
                        </div>
                        <div className='sep-text'>
                            <label htmlFor='price'></label>
                            <input
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                                className='create-spot-input'
                                placeholder='Price'
                                required
                                type='text'
                                id='price'
                                className='create-spot-input'
                            />
                        </div>
                        <div className='sep-text bedroom'>
                            <input
                                onChange={((e) => setRoom(e.target.value))}
                                value={room}
                                placeholder='Rooms'
                                type='number'
                                required
                                className='create-spot-input bedroom'
                                />
                            <input
                                onChange={((e)=> setBed(e.target.value))}
                                value={bed}
                                placeholder='Beds'
                                type='number'
                                required
                                className='create-spot-input bedroom'
                                />
                        </div>
                        <div  className="edit-cancel">
                            <button className='create-spot-btn' type='submit'>Host your Spot</button>
                            <Link id="cancel-edit" className='create-spot-btn bm' to='/'>Cancel</Link>
                        </div>
                    </form>
                </div>
        </div>
    )
}



export default CreateUserSpots;
