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

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);

      console.log(currentUser);
    });
  }, [currentUser]);

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
