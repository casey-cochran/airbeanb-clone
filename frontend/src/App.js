import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useParams } from "react-router-dom";
import { restoreUser } from "./store/session";
import SignupFormPage from "./components/SignUpFormModal";
import Navigation from "./components/Navigation";
import CreateUserSpots from "./components/Spots/CreateUserSpots";
import UserSpots from "./components/UserSpots/UserSpots";
import EditSpot from "./components/EditSpot/EditSpot";


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
        </Switch>
      )}
    </>
  );
}

export default App;
