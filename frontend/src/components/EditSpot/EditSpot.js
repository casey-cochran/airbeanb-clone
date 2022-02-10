import { useParams, Link, useHistory, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { loadSingleSpot } from "../../store/spotReducer";
import { updateSingleSpot } from "../../store/spotReducer";
import './EditForm.css';

const EditSpot = () => {

  const sessionUser = useSelector((state) => state.session.user);
  const { userId, spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const spot = useSelector((state) => state.spotReducer.spot[spotId]);

  useEffect(() => {
     dispatch(loadSingleSpot(userId, spotId))
  },[dispatch])


  const [name, setName] = useState(spot?.name);
  const [address, setAddress] = useState(spot?.address);
  const [city, setCity] = useState(spot?.city);
  const [state, setState] = useState(spot?.state);
  const [zipCode, setZipCode] = useState(spot?.zipCode);
  const [country, setCountry] = useState(spot?.country);
  const [price, setPrice] = useState(spot?.price);
  const [errors, setErrors] = useState([]);


  // if(!sessionUser){
  //   return <Redirect to='/' />
  // }

  if(sessionUser && sessionUser?.id !== +userId){
    return <Redirect to='/' />
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    const spot = {
      userId,
      spotId,
      name,
      address,
      city,
      state,
      zipCode,
      country,
      price,
    };

   const value = await dispatch(updateSingleSpot(spot)).catch(async(err) => {
        const errors = await err.json();
        if(errors) {
            return errors
        }
    });
    if(value.errors) {
            setName(spot.name)
            setAddress(spot.address);
            setCity(spot.city);
            setState(spot.state);
            setZipCode(spot.zipCode);
            setCountry(spot.country);
            setPrice(spot.price);
        return setErrors(value.errors)
    }

    setName("");
    setAddress("");
    setCity("");
    setState("");
    setZipCode("");
    setCountry("");
    setPrice("");
    setErrors([]);
    history.push(`/api/users/${userId}/spots`);
  };

  return (
    <div>
        <form className="create-spot" onSubmit={handleSubmit}>
          <ul>
            {errors?.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
          <div className='sep-text'>
            <label htmlFor="name">Spot Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              type="text"
              id="name"
              className='create-spot-input'
            />
          </div>
          <div className='sep-text'>
            <label htmlFor="address">Address</label>
            <input
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              required
              type="text"
              id="address"
              className='create-spot-input'
            />
          </div>
          <div className='sep-text'>
            <label htmlFor="city">City</label>
            <input
              onChange={(e) => setCity(e.target.value)}
              value={city}
              required
              type="text"
              id="city"
              className='create-spot-input'
            />
          </div>
          <div className='sep-text'>
            <label htmlFor="state">State</label>
            <input
              onChange={(e) => setState(e.target.value)}
              value={state}
              required
              type="text"
              id="state"
              className='create-spot-input'
            />
          </div>
          <div className='sep-text'>
            <label htmlFor="zipcode">Zip Code</label>
            <input
              onChange={(e) => setZipCode(e.target.value)}
              value={zipCode}
              required
              type="text"
              id="zipcode"
              className='create-spot-input'
            />
          </div>
          <div className='sep-text'>
            <label htmlFor="country">Country</label>
            <input
              onChange={(e) => setCountry(e.target.value)}
              value={country}
              required
              type="text"
              id="country"
              className='create-spot-input'
            />
          </div>
          <div className='sep-text'>
            <label htmlFor="price">Price</label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
              type="text"
              id="price"
              className='create-spot-input'
            />
          </div>
          <div className="edit-cancel">
            <button className='create-spot-btn' type="submit">Edit your Spot</button>
            <Link id='cancel-edit' className='create-spot-btn' to={`/api/users/${userId}/spots`}>Cancel</Link>
          </div>
        </form>
    </div>
  );
};

export default EditSpot;
