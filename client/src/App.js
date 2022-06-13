import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import GlobalStyles from "./components/GlobalStyles";
import Home from "./components/Home";
import Header from "./components/Header";
import IceCreamProfile from "./components/IceCreamProfile";
// import Login from "./components/Login";
// import FindShop from "./components/FindShop";
import ShopLocations from "./components/ShopLocations";

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Header />
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
        {/* <Route exact path="/find-shop">
          <FindShop />
        </Route> */}
        <Route path="/shop-locations">
        <ShopLocations />
        </Route>
        {/* <Route exact path="/signup"> */}
          {/* signup page */}
        {/* </Route> */}
        {/* <Route exact path="/login">
          <Login />
        </Route> */}
      </Switch>
    </Router>
  );
};

export default App;
