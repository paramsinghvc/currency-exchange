import React from "react";
import ReactDOM, { render } from "react-dom";
import App from "./App";
import renderer, { act as rendererAct } from "react-test-renderer";
import { act } from "react-dom/test-utils";

it("matches the snapshot", () => {
  const tree = renderer.create(<App />);
  expect(tree.toJSON()).toMatchSnapshot();
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  act(() => {
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
