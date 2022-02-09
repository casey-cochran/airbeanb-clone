import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import {logout} from '../../store/session';
import {NavLink, useParams} from 'react-router-dom';


const ProfileButton = ({ user }) => {
  const dispatch = useDispatch();
  const userId = user.id
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
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
    dispatch(logout());
  };

  return (
    <>
      <button onClick={openMenu}>
       <i className="fas fa-bars"></i>
      </button>
      {showMenu && (
        <div className="profile-dropdown">
          <div className="name-email">
            <div>Welcome {user.username}!</div>

          </div>
          <div  className="menu-btn-div">
              <NavLink className='drp-menu-btn' to='/api/users/spots/new'>
                Host your spot
              </NavLink>
          </div>
          <div className="menu-btn-div">
              <NavLink className='drp-menu-btn' to={`/api/users/${userId}/spots`}>
                Users Spots
              </NavLink>
          </div>
          <div className="menu-btn-div">
              <NavLink className='drp-menu-btn' to='/api/spots'>
                View all spot Listings
              </NavLink>
          </div>
          <div className="menu-btn-div">
              <NavLink className='drp-menu-btn' to='/api/users/bookings'>
                My Bookings
              </NavLink>
          </div>
          <div className="menu-btn-div">
            <button className="btn primary" onClick={logoutUser}>Log Out</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
