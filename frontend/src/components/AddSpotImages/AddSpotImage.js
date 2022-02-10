import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { loadAllSpots, loadSingleSpot } from "../../store/spotReducer";
import './AddSpotImage.css'
import ImageForm from "./ImageForm";

const AddSpotImages = () => {
    const dispatch = useDispatch();
    const {userId, spotId} = useParams();


    const spot = useSelector((state) => state.spotReducer.spot[spotId]);
    const images = useSelector((state) => state.spotReducer.images);
    console.log(spot, 'spot here ')
    console.log(images, 'images here ')

    const [show, setShow] = useState(false)

    useEffect(() => {
        dispatch(loadSingleSpot(userId, spotId));
       dispatch(loadAllSpots())
    },[dispatch])




  return (
      <div>
          <div className="center-spot">
            <div id='spot-image-cont'>
                <div id='created-spot-info'>
                        <div id='spot-info-text'>
                        <div className="idk">{spot?.name}</div>
                        <div>{spot?.address}</div>
                        <div>{spot?.city}</div>
                        <div>{spot?.state}</div>
                        <div>${spot?.price}</div>
                    </div>
                </div>
                <div id='spot-img-cont'>
                    {spot?.Images?.map((image,index) => <div className="user-host-spots" key={index}><img src={image.url} /></div>)}
                </div>
                {/* <button onClick={(() => show ? setShow(false) : setShow(true))}>add image form</button>
                {show ?
                    <div>
                        <ImageForm />
                    </div>
                : <> </>  } */}
            </div>
          </div>
      </div>
  )
};

export default AddSpotImages;
