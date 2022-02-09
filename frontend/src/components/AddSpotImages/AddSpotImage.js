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
            <ul>
                <li>{spot?.name}</li>
                <li>{spot?.address}</li>
                <li>{spot?.city}</li>
                <li>{spot?.state}</li>
                {spot?.Images?.map((image,index) => <li key={index}><img src={image.url} />
                <button>delete Img</button>
                </li>)}
                <button onClick={(() => show ? setShow(false) : setShow(true))}>add image form</button>
                {show ?
                    <div>
                        <ImageForm />
                    </div>
                : <> </>  }
            </ul>
          </div>
      </div>
  )
};

export default AddSpotImages;
