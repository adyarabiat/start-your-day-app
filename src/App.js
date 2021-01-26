import { useState, useEffect } from "react";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

import "./App.css";
import TodoContainer from "./components/Todo/TodoContainer/TodoContainer";
import Container from "@material-ui/core/Container";
import SignInPage from "./components/Login-page/Sign-In";
import { Redirect, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import SignUp from "./components/Login-page/Sign-Up";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  //When I initialise auth.onAuthStateChanged() I create a listener. If I don't unsubscribe then this listener will continue to listen even after I stop using it. This will waste memory.

  // To prevent this from happening, I unsubscribe from listener when I unmount my app.
  // I used here useEffect instead of componentWillUnMount so I use return to clean up and unMount it.
  useEffect(() => {
    const unSupscripeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // check if it is not null so there is a user
      if (userAuth) {
        // we need to await becouse it is async to get the user data
        const userRef = await createUserProfileDocument(userAuth);

        // to see the data we need to check by .data but it has the data like displayName and email but not the user UID so to get it we can find it on the snapShop it self without .data so we do it like this:
        userRef.onSnapshot((snapShot) =>
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          })
        );
      } else {
        // which is null
        setCurrentUser(userAuth);
      }
    });
    return () => {
      unSupscripeFromAuth();
    };
  });

  if (currentUser) {
    return (
      <div>
        <Redirect to="main" />
        <Header currentUser={currentUser} />
        <Container className="App">
          <Route
            exact
            path="/main"
            render={(props) => (
              <TodoContainer {...props} currentUser={currentUser} />
            )}
          />
        </Container>
      </div>
    );
  } else {
    return (
      <div>
        <Redirect to="/" />
        <Header currentUser={currentUser} />
        <Container className="App">
          <Route exact path="/" component={SignInPage} />
          <Route exact path="/sign-up" component={SignUp} />
        </Container>
      </div>
    );
  }
};

export default App;
