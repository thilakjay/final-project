import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Test from "./components/Test";


const App = () => {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Test />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
