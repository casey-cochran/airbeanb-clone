import { useParams, Link, useHistory, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { loadSingleSpot } from "../../store/spotReducer";
import { updateSingleSpot } from "../../store/spotReducer";
import "./EditForm.css";

const EditSpot = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const { userId, spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const spot = useSelector((state) => state.spotReducer.spot[spotId]);

  useEffect(() => {
    dispatch(loadSingleSpot(userId, spotId));
  }, [dispatch]);

  const [name, setName] = useState(spot?.name);
  const [address, setAddress] = useState(spot?.address);
  const [city, setCity] = useState(spot?.city);
  const [state, setState] = useState(spot?.state);
  const [zipCode, setZipCode] = useState(spot?.zipCode);
  const [country, setCountry] = useState(spot?.country);
  const [price, setPrice] = useState(spot?.price);
  const [bed, setBed] = useState('');
  const [room, setRoom] = useState('')
  const [errors, setErrors] = useState([]);

  if (sessionUser && sessionUser?.id !== +userId) {
    return <Redirect to="/" />;
  }

  if (!sessionUser) {
    return <Redirect to="/" />;
  }

  const handleSubmit = async (e) => {
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
      room,
      bed
    };

    const value = await dispatch(updateSingleSpot(spot)).catch(async (err) => {
      const errors = await err.json();
      if (errors) {
        return errors;
      }
    });
    if (value.errors) {
      setName(spot.name);
      setAddress(spot.address);
      setCity(spot.city);
      setState(spot.state);
      setZipCode(spot.zipCode);
      setCountry(spot.country);
      setPrice(spot.price);
      setRoom(spot.room)
      setBed(spot.bed)
      return setErrors(value.errors);
    }

    setName("");
    setAddress("");
    setCity("");
    setState("");
    setZipCode("");
    setCountry("");
    setPrice("");
    setBed('')
    setRoom('')
    setErrors([]);
    history.push(`/users/${userId}/spots`);
  };

  return (
    <div id="top-container">
      <div id="edit-spot-cont">
        {/* <div>
        <h2 id='edit-spot-title'>Edit your spot listing</h2>
        </div> */}
        <fieldset id="form-fieldset">
          <form className="create-spot edit" onSubmit={handleSubmit}>
            <ul>
              {errors?.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
            <div className="sep-text edit">
              <label className="edit-text-color" htmlFor="name">
                Spot Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
                type="text"
                id="name"
                className="create-spot-input edit"
              />
            </div>
            <div className="sep-text edit">
              <label className="edit-text-color" htmlFor="address">
                Address
              </label>
              <input
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                required
                type="text"
                id="address"
                className="create-spot-input edit"
              />
            </div>
            <div className="sep-text edit">
              <label className="edit-text-color" htmlFor="city">
                City
              </label>
              <input
                onChange={(e) => setCity(e.target.value)}
                value={city}
                required
                type="text"
                id="city"
                className="create-spot-input edit"
              />
            </div>
            <div className="sep-text edit">
              <label className="edit-text-color" htmlFor="state">
                State
              </label>
              <input
                onChange={(e) => setState(e.target.value)}
                value={state}
                required
                type="text"
                id="state"
                className="create-spot-input edit"
              />
            </div>
            <div className="sep-text edit">
              <label className="edit-text-color" htmlFor="zipcode">
                Zip Code
              </label>
              <input
                onChange={(e) => setZipCode(e.target.value)}
                value={zipCode}
                required
                type="text"
                id="zipcode"
                className="create-spot-input edit"
              />
            </div>
            <div className="sep-text edit">
              <label className="edit-text-color" htmlFor="country">
                Country
              </label>
              <input
                onChange={(e) => setCountry(e.target.value)}
                value={country}
                required
                type="text"
                id="country"
                className="create-spot-input edit"
              />
            </div>
            <div className="sep-text edit">
              <label className="edit-text-color" htmlFor="price">
                Price
              </label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                required
                type="text"
                id="price"
                className="create-spot-input edit"
              />
            </div>
            <div className="sep-text bedroom">
              <input
                onChange={(e) => setRoom(e.target.value)}
                value={room}
                placeholder="Rooms"
                type="number"
                required
                className="create-spot-input bedroom"
              />
              <input
                onChange={(e) => setBed(e.target.value)}
                value={bed}
                placeholder="Beds"
                type="number"
                required
                className="create-spot-input bedroom"
              />
            </div>
            <div className="edit-cancel">
              <button className="create-spot-btn sub" type="submit">
                Submit
              </button>
              <Link
                id="cancel-edit"
                className="create-spot-btn sub"
                to={`/users/${userId}/spots`}
              >
                Cancel
              </Link>
            </div>
          </form>
        </fieldset>
      </div>
      <div id="second-child">
        <h2>Edit your Spot!</h2>
      </div>
    </div>
  );
};

export default EditSpot;
