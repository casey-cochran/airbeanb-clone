import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { restoreUser } from "./store/session";
import SignupFormPage from "./components/SignUpFormModal";
import Navigation from "./components/Navigation";
import CreateUserSpots from "./components/Spots/CreateUserSpots";

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
        </Switch>
      )}
    </>
  );
}

export default App;
