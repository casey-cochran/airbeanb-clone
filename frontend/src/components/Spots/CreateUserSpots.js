import {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect, Link } from "react-router-dom";
import { createUserSpot } from '../../store/spotReducer';




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

    if(!user) return <Redirect to='/' />;

    const handleSubmit = (e) => {
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

        dispatch(createUserSpot(spot)).catch(async(res) => {
            const data = await res.json();
            console.log(data, ' this is the errors data being recieved frontend?')
            if(data && data.errors) {
                return setErrors(data.errors)
            }
        });
        setName('')
        setAddress('')
        setCity('')
        setState('')
        setZipCode('')
        setCountry('')
        setPrice('')
        history.push(`/api/users/${userId}/spots`)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, index) => <li key={index}>{error}</li>)}
                </ul>
                <div>
                    <label htmlFor='name'>Spot Name</label>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                        type='text'
                        id='name'
                    />
                </div>
                <div>
                    <label htmlFor='address'>Address</label>
                    <input
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        required
                        type='text'
                        id='address'
                    />
                </div>
                <div>
                    <label htmlFor='city'>City</label>
                    <input
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                        required
                        type='text'
                        id='city'
                    />
                </div>
                <div>
                    <label htmlFor='state'>State</label>
                    <input
                        onChange={(e) => setState(e.target.value)}
                        value={state}
                        required
                        type='text'
                        id='state'
                    />
                </div>
                <div>
                    <label htmlFor='zipcode'>Zip Code</label>
                    <input
                        onChange={(e) => setZipCode(e.target.value)}
                        value={zipCode}
                        required
                        type='text'
                        id='zipcode'
                    />
                </div>
                <div>
                    <label htmlFor='country'>Country</label>
                    <input
                        onChange={(e) => setCountry(e.target.value)}
                        value={country}
                        required
                        type='text'
                        id='country'
                    />
                </div>
                <div>
                    <label htmlFor='price'>Price</label>
                    <input
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        required
                        type='text'
                        id='price'
                    />
                </div>
                <div>
                    <button type='submit'>Host your Spot</button>
                </div>
            </form>
        </div>
    )
}



export default CreateUserSpots;
