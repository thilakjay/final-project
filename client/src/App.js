import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import GlobalStyles from "./components/GlobalStyles";
import Home from "./components/Home";
import Header from "./components/Header";
import IceCreamProfile from "./components/IceCreamProfile";
import ShopLocations from "./components/ShopLocations";
import Favourites from "./components/Favourites";

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/ice-creams/:_id">
          <IceCreamProfile />
        </Route>
        <Route path="/shop-locations">
          <ShopLocations />
        </Route>s
        <Route exact path="/favourites">
          <Favourites />
        </Route>        
      </Switch>
    </Router>
  );
};

export default App;
