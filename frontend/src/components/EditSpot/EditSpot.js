import { useParams, Link, useHistory, Redirect, } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { loadSingleSpot } from "../../store/spotReducer";
import { updateSingleSpot } from "../../store/spotReducer";
import { fetchUserSpots } from "../../store/spotReducer";

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



  const handleSubmit = (e) => {
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

    dispatch(updateSingleSpot(spot)).catch(async(res) => {
        const data = await res.json();
        console.log(data, ' this is the errors data being recieved frontend?')
        if(data && data.errors) {
            return setErrors(data.errors)
        }
    });
    setName("");
    setAddress("");
    setCity("");
    setState("");
    setZipCode("");
    setCountry("");
    setPrice("");
    if(!errors) history.push(`/api/users/${userId}/spots`);
    //return <Redirect to={`/api/users/${userId}/spots`} />
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, index) => (
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
            <button type="submit">Host your Spot</button>
          </div>
        </form>
    </div>
  );
};

export default EditSpot;
