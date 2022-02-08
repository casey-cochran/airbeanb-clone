import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignUpFormModal";
import "./Navigation.css";

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const [menu, setMenu] = useState(false);

  const [show, setShow] = useState(false)
  const navbar = () => {
    if(window.scrollY>20){
      setShow(true)
    }else {
      setShow(false)
    }
  }


  useEffect(() => {
    window.addEventListener('scroll', navbar)
    return () => {
      window.removeEventListener('scroll', navbar)
    }
  }, [])
console.log(window.scroll)
  const toggleMenu = () => {
      setMenu(!menu)
  }


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <div>
        <button onClick={toggleMenu} >
          <i className="fas fa-user-circle" />
        </button>
        <div className="navbar-menu">
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
    <ul className={`testing ${show && 'navbar'}`}>
      <li>
        <NavLink className={`home-text ${show ? 'trans' : false}`} exact to="/">
          Home
        </NavLink>
      </li>
      <li>{isLoaded && sessionLinks}</li>
    </ul>
  );
};

export default Navigation;
