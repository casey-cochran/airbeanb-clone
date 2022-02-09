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
        <div id='loggedout-icons'>
          <NavLink id='place-to-stay' className={`home-text ${show ? 'trans' : false}`} to='/api/spots'>Places to Stay</NavLink>
          <button className="menu-icon" onClick={toggleMenu} >
            <i id='homeMenu' className="fas fa-bars icon"></i>
            <i id='userIcon' className="fa fa-user-circle icon"></i>
          </button>
        </div>
        <div >
          {menu && (
            <div className="profile-dropdown2">
              <div id='anotherone'>
                <div id='textform'>
                  <LoginFormModal />
                </div>
                <div>
                  <SignupFormModal />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`testing ${show && 'navbar'}`}>
        <div id='logo-home'>
          <NavLink id='airbeanb' className={`home-text ${show ? 'trans' : false}`} exact to="/">
          <i className={`fab fa-airbnb ${show && 'trans'}`}></i>
          <p>airbeanb</p>
          </NavLink>
        </div>
        <div id='please-work'>{isLoaded && sessionLinks}</div>
      </div>
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
