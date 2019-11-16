import React from "react";
import Shell from "../Shell";
import { createStoreContext } from "@mollycule/redux-hook";
import { IRootState } from "shared/types";
import createStore from "core/utils/createStore";

const store = createStore();
const { Provider } = createStoreContext<IRootState>();
import renderer from "react-test-renderer";

const tree = renderer.create(
  <Provider store={store}>
    <Shell>
      <p>Hola</p>
    </Shell>
  </Provider>
);

it("should render the component", () => {
  expect(tree.toJSON()).toMatchSnapshot();
});
