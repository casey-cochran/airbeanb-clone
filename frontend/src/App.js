import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useParams } from "react-router-dom";
import { restoreUser } from "./store/session";
import SignupFormPage from "./components/SignUpFormModal";
import Navigation from "./components/Navigation";
import CreateUserSpots from "./components/CreateUserSpot/CreateUserSpots";
import UserSpots from "./components/UserSpots/UserSpots";
import EditSpot from "./components/EditSpot/EditSpot";
import SpotsList from "./components/Spots/SpotsList";
import AddSpotImages from "./components/AddSpotImages/AddSpotImage";
import HomePage from "./components/HomePage/HomePage";
import ViewOneSpot from "./components/ViewOneSpot/ViewOneSpot";
import UserBookings from "./components/UserBookings/UserBookings";
import PageNotFound from "./components/PageNotFound/PageNotFound";





function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true));

  }, [dispatch]);





  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route path='/users/spots/new'>
            <CreateUserSpots />
          </Route>
          <Route exact path={`/users/:userId/spots`}>
            <UserSpots />
          </Route>
          <Route path={'/users/:userId/spots/:spotId/edit'}>
            <EditSpot />
          </Route>
          <Route exact path='/spots'>
            <SpotsList />
          </Route>
          <Route path='/users/:userId/spots/:spotId'>
            <AddSpotImages />
          </Route>
          <Route path='/spots/:spotId'>
            <ViewOneSpot />
          </Route>
          <Route path='/users/:userId/bookings'>
            <UserBookings />
          </Route>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
