import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { loadAllSpots } from "../../store/spotReducer";
import "./SpotsList.css";
import { Modal } from "../../context/Modal";
import LoginForm from "../LoginFormModal/LoginForm";

import SignupFormPage from "../SignUpFormModal/SignupForm";

const SpotsList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const allSpots = useSelector((state) =>
    Object.values(state.spotReducer.spot)
  );
  const userId = useSelector((state) => state.session.user);
  const newspots = allSpots.filter((spot) => spot.Images.length > 0);

  useEffect(() => {
    dispatch(loadAllSpots());
  }, [dispatch]);

  const closeModal = () => {
    setShowModal(false)
  }

  const closeSignup = () => {
    setSignupModal(false)
  }



  return (
    <>
      <div id="spots-list-cont">
        <div className="spots-list-header">
          <div>
            {userId ? (
              <h2 id="spots-list-title">Your Dream Vacation Awaits</h2>
            ) : (
              <h1>Please <button onClick={(() => setShowModal(true))} className="login-su">Login</button>
              or
              <button onClick={(() => setSignupModal(true))} className="login-su">Sign Up</button> to experience these Spots</h1>
            )}
            {showModal && (
              <Modal onClose={closeModal}>
                <LoginForm />
              </Modal>
            )}
            {signupModal && <Modal onClose={closeSignup}>
                <SignupFormPage />
              </Modal>
              }
          </div>
        </div>
        <div className="all-spots-container">
          {newspots?.map((spot, index) => {
            return (
              <div className=".img-description" key={index}>
                <Link to={`/spots/${spot.id}`}>
                  <img className="all-spots-imgs" src={spot.Images[0].url} />
                </Link>
                <div className="spots-list-text" >
                  <p className="spots-list-text name">
                    {spot.city}, {spot.state}
                  </p>
                  <p className="spots-list-text price">${spot.price} / night</p>
                </div>
                <div>
                  <p className="spots-list-text push list">
                    Rooms {spot?.room} Beds {spot?.bed}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div id="spots-list-footer">
          <div>
            <Link
              to={{ pathname: "https://github.com/casey-cochran" }}
              target="_blank"
              className="footer-text"
            >
              Github
            </Link>
          </div>
          <div>
            <Link
              to={{
                pathname: "https://linkedin.com/in/casey-cochran-488420219/",
              }}
              target="_blank"
              className="footer-text"
            >
              Linkedin
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpotsList;
