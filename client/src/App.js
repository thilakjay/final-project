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
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
