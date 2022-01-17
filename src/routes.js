import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import Cart from "./components/Cart";
import ProductPage from "./components/ProductPage";
import SignUp from "./components/SignUp";
import Orders from "./components/Orders";
import OrderPlaced from "./components/OrderPlaced";

export default (props) => (
  <Switch>
    <Route exact path="/" render={() => <Home {...props} />} />
    <Route path="/signin" render={() => <SignIn {...props} />} />
    <Route path="/signup" render={() => <SignUp {...props} />} />
    <Route path="/cart" render={() => <Cart {...props} />} />
    <Route path="/checkout" component={OrderPlaced} />
    <Route path="/orders" render={() => <Orders {...props} />} />
    <Route
      path="/product/:id"
      render={(params) => <ProductPage {...props} {...params} />}
    />
    <Route>
      <Redirect to="/" />
    </Route>
  </Switch>
);
