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

  const toggleMenu = () => {
      setMenu(!menu)
  }


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <div>
        <NavLink className={`home-text ${show ? 'trans' : false}`} to='/api/spots'>Places to Stay</NavLink>
        <button onClick={toggleMenu} >
          <i className="fas fa-bars"></i>
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
    <>
      <ul className={`testing ${show && 'navbar'}`}>
        <li>
          <i className="fab fa-airbnb"></i>
          <NavLink className={`home-text ${show ? 'trans' : false}`} exact to="/">
            Home
          </NavLink>
        </li>
        <li>{isLoaded && sessionLinks}</li>
      </ul>
      {/* <div className="home-page-container">
        <div className="container-children one">
          <div className="where-to-go">
            <h2>Not sure where to go? Perfect.</h2>
            <button className="flexible">I'm flexible</button>
          </div>
        </div>
        <div className="container-children two">
          <h2>test</h2>
        </div>
        <div className="container-children"><h1>test</h1></div>
        <div className="container-children three">
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1></h1>
          </div>
        <div className="container-children"><h1>test</h1></div>
      </div> */}
    </>

  );
};

export default Navigation;
