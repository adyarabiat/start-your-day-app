import { useState, useEffect } from "react";
import { auth } from "./firebase/firebase.utils";

import "./App.css";
import TodoContainer from "./components/Todo/TodoContainer/TodoContainer";
import Container from "@material-ui/core/Container";
import SignInPage from "./components/Login-page/Sign-In";
import { Redirect, Route } from "react-router-dom";
import Header from "./components/Header/Header";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  //When I initialise auth.onAuthStateChanged() I create a listener. If I don't unsubscribe then this listener will continue to listen even after I stop using it. This will waste memory.

  // To prevent this from happening, I unsubscribe from listener when I unmount my app.
  // I used here useEffect instead of componentWillUnMount so I use return to clean up and unMount it.
  useEffect(() => {
    const unSupscripeFromAuth = auth.onAuthStateChanged((user) => {
      user ? setCurrentUser(user) : setCurrentUser(null);
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
        </Container>
      </div>
    );
  }
};

export default App;
