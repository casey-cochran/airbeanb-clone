import "./AllSpotReviews.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadSpotReviews, deleteOneReview } from "../../store/reviewsReducer";
import AddReview from "../AddReview/AddReview";
import Modal from "react-modal";
import {BsTrash} from 'react-icons/bs'
import {FiEdit2} from 'react-icons/fi'
import EditReview from "../EditReview/EditReview";

const AllSpotReviews = ({ spotId, userId }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const spotReviewsArr = useSelector((state) =>
    Object.values(state.reviewsReducer?.Reviews)
  );
  const spotReviews = spotReviewsArr?.reverse()
  const userReview = spotReviewsArr.find((review) => userId === review.userId)
  const [modalIsOpen, setIsOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [modalReview, setModalReview] = useState(null);
  let rate = 0;
  spotReviewsArr?.forEach((rev) => rate += rev.rating)

  const customStyles = {
    content: {
      top: "56%",
      left: "50%",
      height: '500px',
      width: '500px',
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const openEditModal = (e) => {
    e.stopPropagation()
    setModalReview(userReview)
      setOpenEdit(true)
  }
  const closeEditModal = () => {
      setOpenEdit(false)
  }

  useEffect(() => {
    dispatch(loadSpotReviews(spotId));
  }, [dispatch]);




  return (
    <div className="all-spot-reviews">
      <div>
        <div className="add-review-title">
          <p className="rating">Reviews by guests </p>
          <p className="rating num">
          {spotReviewsArr?.length > 0 ? (rate / spotReviewsArr?.length).toFixed(1) : 0} stars

          </p>
          {user &&
          <button className="review-btn wid" onClick={userReview ? openEditModal : openModal}>{userReview ? 'Edit Review' : 'Add Review'}</button>
          }
        </div>
        <div className="reviews-list-cont">
          {spotReviews.map((review, i) => {
            return (
              <div key={i} className='reviews-list'>
                <div className="user-review">{review?.User?.username}</div>
                <div >
                  {review.review}

                </div>
                {user?.id === review.userId && (
                  <div className="edit-delete-icons">
                    <BsTrash className="react-icons" onClick={() => dispatch(deleteOneReview(review))}/>
                    {/* <FiEdit2 className="react-icons" onClick={(() =>{
                        openEditModal()
                        setModalReview(review)})
                    }
                        /> */}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <AddReview spotId={spotId} userId={userId} openModal={openModal} closeModal={closeModal} />
        </Modal>
        <Modal
            isOpen={openEdit}
            onRequestClose={closeEditModal}
            style={customStyles}

            >
                <EditReview modalReview={modalReview} closeEditModal={closeEditModal} spotId={spotId} userId={userId}  />
            </Modal>
      </div>
    </div>
  );
};

export default AllSpotReviews;
