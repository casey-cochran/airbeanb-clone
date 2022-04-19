import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import {logout} from '../../store/session';
import {NavLink, useHistory} from 'react-router-dom';


const ProfileButton = ({ user }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userId = user.id
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
   if (showMenu) return;
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);



  const logoutUser = (e) => {
    e.preventDefault();
    // setShowMenu(false)
    dispatch(logout());
    history.push('/');
  };

  return (
    <div id='icons'>
      <div onClick={openMenu} className="menu-icon">
        <i id='homeMenu' className="fas fa-bars icon"></i>
        <i id='userIcon' className="fa fa-user-circle icon"></i>
      </div>
      {showMenu && (
        <div className="profile-dropdown">
          <div className="name-email">
            <div id='welcome-st'>Welcome {user.username}!</div>

          </div>
          <div  className="menu-btn-div">
              <NavLink className='drp-menu-btn' to='/users/spots/new'>
                Host your spot
              </NavLink>
          </div>
          <div className="menu-btn-div">
              <NavLink className='drp-menu-btn' to={`/users/${userId}/spots`}>
                Users Spots
              </NavLink>
          </div>
          <div className="menu-btn-div">
              <NavLink className='drp-menu-btn' to='/spots'>
                View all spot Listings
              </NavLink>
          </div>
          <div className="menu-btn-div">
              <NavLink className='drp-menu-btn' to={`/users/${userId}/bookings`}>
                My Bookings
              </NavLink>
          </div>
          <div className="menu-btn-div">
            <button className="btn primary logout" onClick={logoutUser}>Log Out</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
