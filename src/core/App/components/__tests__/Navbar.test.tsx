import React from "react";
import Navbar from "../Navbar";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";

const tree = renderer.create(
  <Router>
    <Navbar />
  </Router>
);

it("should render the component", () => {
  expect(tree.toJSON()).toMatchSnapshot();
});
