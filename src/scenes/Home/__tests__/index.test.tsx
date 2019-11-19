import React from "react";
import Home from "../index";
import renderer from "react-test-renderer";
import { createStoreContext } from "@mollycule/redux-hook";
import { IRootState } from "shared/types";
import createStore from "core/utils/createStore";
import { BrowserRouter as Router } from "react-router-dom";

const store = createStore();
const { Provider } = createStoreContext<IRootState>();

describe("Should render Home properly", () => {
  it("should match the home snapshot", () => {
    const home = renderer.create(
      <Provider store={store}>
        <Router>
          <Home />
        </Router>
      </Provider>
    );
    expect(home.toJSON()).toMatchSnapshot();
  });
});
