import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, Link, Redirect } from "react-router-dom";
import { loadAllSpots, loadSingleSpot } from "../../store/spotReducer";
import "./AddSpotImage.css";
import ImageForm from "./ImageForm";

const AddSpotImages = () => {
  const dispatch = useDispatch();
  const { userId, spotId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);

  const spot = useSelector((state) => state.spotReducer.spot[spotId]);
  const images = useSelector((state) => state.spotReducer.images);


  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(loadSingleSpot(userId, spotId));
    dispatch(loadAllSpots());
  }, [dispatch]);

  if(sessionUser && sessionUser?.id !== +userId){
    return <Redirect to='/' />
  }
  if(!sessionUser){
    return <Redirect to='/' />
  }

  return (
    <div>
      <div id="spot-image-container">
        <div id="created-spot-info">
          <div id="spot-info-text">
            <div className="color">{spot?.name}</div>
            <div className="color">{spot?.address}</div>
            <div className="color">{spot?.city}</div>
            <div className="color">{spot?.state}</div>
            </div>
            <p className='color p'>Please add images for your spot to be listed for all to see</p>
            <button className='create-spot-btn pad' onClick={() => (show ? setShow(false) : setShow(true))}>
              Add Images Here
            </button>
            {show ? (
              <div>
                <ImageForm />
              </div>
            ) : (
              <> </>
            )}
          </div>
          {/* <div>
                <i id='add-images-logo-b' className="fab fa-airbnb" />
            </div> */}
        {spot?.Images?.length > 0 ?
        <div id="spot-img-cont">
          {spot?.Images?.map((image, index) => (
            <div className="user-host-spots" key={index}>
              <img id='add-imgs' src={image.url} />
            </div>
          ))}
          </div> : <div id='no-images'></div> }
      </div>
    </div>
  );
};

export default AddSpotImages;
