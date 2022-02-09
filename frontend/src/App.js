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


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
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
          <Route path="/signup">
            {/* <SignupFormPage /> */}
          </Route>
          <Route path='/api/users/spots/new'>
            <CreateUserSpots />
          </Route>
          <Route exact path={`/api/users/:userId/spots`}>
            <UserSpots />
          </Route>
          <Route path={'/api/users/:userId/spots/:spotId/edit'}>
            <EditSpot />
          </Route>
          <Route exact path='/api/spots'>
            <SpotsList />
          </Route>
          <Route path='/api/users/:userId/spots/:spotId'>
            <AddSpotImages />
          </Route>
          <Route path='api/spots/:spotId'>
            <ViewOneSpot />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
