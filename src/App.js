import "./App.css";
import TodoContainer from "./components/Todo/TodoContainer/TodoContainer";
import Container from "@material-ui/core/Container";
import SignInPage from "./components/Login-page/Sign-In";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Container className="App">
        <Switch>
          <Route path="/main">
            <TodoContainer className="Todo" />
          </Route>
          <Route path="/">
            <SignInPage />
          </Route>
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
