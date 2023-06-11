import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./features/Home";
import AuthPage from "./features/AuthPage";
import Cart from "./features/Cart";
import ProductPage from "./features/ProductPage";
import Orders from "./features/Orders";
import OrderConfirmation from "./features/OrderConfirmation"

const routes = (props) => (
  <Switch>
    <Route exact path="/" render={() => <Home />} />
    <Route path="/signin" component={AuthPage} />
    <Route path="/cart" component={Cart} />
    <Route path="/checkout" component={OrderConfirmation} />
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

export default routes;