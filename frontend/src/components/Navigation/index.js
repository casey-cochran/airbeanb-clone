import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignUpFormModal";
import "./Navigation.css";

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const [menu, setMenu] = useState(false);


  const toggleMenu = () => {
      setMenu(!menu)
  }



  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      // <div className='signup-btn'>
      //     <LoginFormModal />
      //     <SignupFormModal />
      // </div>
      <div>
        <button onClick={toggleMenu} >
          <i className="fas fa-user-circle" />
        </button>
        <div>
          {menu && (
            <ul className="profile-dropdown">
              <li>
                <LoginFormModal />
              </li>
              <li>
                <SignupFormModal />
              </li>
            </ul>
          )}
        </div>
      </div>
    );
  }

  return (
    <ul className="testing">
      <li>
        <NavLink exact to="/">
          Home
        </NavLink>
      </li>
      <li>{isLoaded && sessionLinks}</li>
    </ul>
  );
};

export default Navigation;
