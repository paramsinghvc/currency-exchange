import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "scenes/Home";
import Transactions from "scenes/Transactions";
import createStore from "core/utils/createStore";
import { createStoreContext } from "@mollycule/redux-hook";
import { IRootState } from "shared/types";

const store = createStore();
const { Provider } = createStoreContext<IRootState>();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact component={Transactions} />
          <Route path="/exchange" component={Home} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
