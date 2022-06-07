import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./components/Home";
import IceCreamProfile from "./components/IceCreamProfile";


const App = () => {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {/* landing page/main page */}
          <Home /> 
        </Route>
        <Route exact path="/ice-creams">
          {/* listing of all ice creams & filters */}
        </Route>
        <Route exact path="/ice-creams/:_id">
          <IceCreamProfile />
        </Route>
        <Route exact path="/user/">
          {/* landing page/main page */}
        </Route> 
        <Route exact path="/locator">
          {/* shows location of shops in map */}
        </Route>  
        <Route exact path="/shop/:shopId">
          {/* shop page*/}
        </Route>  
        <Route exact path="/signup">
          {/* signup page */}
        </Route>  
        <Route exact path="/login">
          {/* login page */}
        </Route>                                 
      </Switch>
    </Router>
  );
}

export default App;
