import React from "react";
import styled from "@emotion/styled";

import Navbar from "./Navbar";
import Home from "scenes/Home";

const AppHolder = styled.main`
  background: #fff;
  height: 100%;
  min-height: 100vh;
`;

const App: React.FC = () => {
  return (
    <AppHolder>
      <Navbar />
      <Home />
    </AppHolder>
  );
};

export default App;
