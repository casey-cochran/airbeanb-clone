import { useParams, Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { loadSingleSpot } from "../../store/spotReducer";
import { updateSingleSpot } from "../../store/spotReducer";
import './EditForm.css';

const EditSpot = () => {


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
    history.push(`/api/users/${userId}/spots`);

  };

  return (
    <div>
        <form className="edit-form" onSubmit={handleSubmit}>
          <ul>
            {errors?.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
          <div>
            <label htmlFor="name">Spot Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              type="text"
              id="name"
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              required
              type="text"
              id="address"
            />
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input
              onChange={(e) => setCity(e.target.value)}
              value={city}
              required
              type="text"
              id="city"
            />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <input
              onChange={(e) => setState(e.target.value)}
              value={state}
              required
              type="text"
              id="state"
            />
          </div>
          <div>
            <label htmlFor="zipcode">Zip Code</label>
            <input
              onChange={(e) => setZipCode(e.target.value)}
              value={zipCode}
              required
              type="text"
              id="zipcode"
            />
          </div>
          <div>
            <label htmlFor="country">Country</label>
            <input
              onChange={(e) => setCountry(e.target.value)}
              value={country}
              required
              type="text"
              id="country"
            />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
              type="text"
              id="price"
            />
          </div>
          <div>
            <button type="submit">Edit your Spot</button>
            <Link to={`/api/users/${userId}/spots`}>Back to Spots</Link>
          </div>
        </form>
    </div>
  );
};

export default EditSpot;
