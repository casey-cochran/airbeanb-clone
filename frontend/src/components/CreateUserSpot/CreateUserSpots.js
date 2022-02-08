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
    const userId = user.id


    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [country, setCountry] = useState('')
    const [price, setPrice] = useState('')
    const [errors, setErrors] = useState([]);

    //if(!user) return <Redirect to='/' />;

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
            price
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
        history.push(`/api/users/${userId}/spots/${value.spot.id}`);
    }

    return (
        <div className='create-spot-container'>
                <div className='test'>
                    <p className='create-spot-logo'>logo up top here </p>
                    <p>What kind of space will guests have?</p>
                </div>
                <div className='test2'>
                    <form onSubmit={handleSubmit} className='create-spot'>
                        <ul>
                            {errors?.map((error, index) => <li key={index}>{error}</li>)}
                        </ul>
                        <div className='sep-text'>
                            <label htmlFor='name'>Spot Name</label>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                required
                                type='text'
                                id='name'
                                className='create-spot-input'
                            />
                        </div>
                        <div className='sep-text'>
                            <label htmlFor='address'>Address</label>
                            <input
                                onChange={(e) => setAddress(e.target.value)}
                                value={address}
                                required
                                type='text'
                                id='address'
                                className='create-spot-input'
                            />
                        </div>
                        <div className='sep-text'>
                            <label htmlFor='city'>City</label>
                            <input
                                onChange={(e) => setCity(e.target.value)}
                                value={city}
                                required
                                type='text'
                                id='city'
                                className='create-spot-input'
                            />
                        </div>
                        <div className='sep-text'>
                            <label htmlFor='state'>State</label>
                            <input
                                onChange={(e) => setState(e.target.value)}
                                value={state}
                                required
                                type='text'
                                id='state'
                                className='create-spot-input'
                            />
                        </div>
                        <div className='sep-text'>
                            <label htmlFor='zipcode'>Zip Code</label>
                            <input
                                onChange={(e) => setZipCode(e.target.value)}
                                value={zipCode}
                                required
                                type='text'
                                id='zipcode'
                                className='create-spot-input'
                            />
                        </div>
                        <div className='sep-text'>
                            <label htmlFor='country'>Country</label>
                            <input
                                onChange={(e) => setCountry(e.target.value)}
                                value={country}
                                required
                                type='text'
                                id='country'
                                className='create-spot-input'
                            />
                        </div>
                        <div className='sep-text'>
                            <label htmlFor='price'>Price</label>
                            <input
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                                required
                                type='text'
                                id='price'
                                className='create-spot-input'
                            />
                        </div>
                        <div>
                            <button type='submit'>Host your Spot</button>
                        </div>
                    </form>
                </div>
        </div>
    )
}



export default CreateUserSpots;
