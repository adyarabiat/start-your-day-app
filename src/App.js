import "./App.css";
import TodoContainer from "./components/Todo/TodoContainer/TodoContainer";
import Container from "@material-ui/core/Container";

const App = () => {
  return (
    <Container className="App">
      <TodoContainer className="Todo" />
    </Container>
  );
};

export default App;
