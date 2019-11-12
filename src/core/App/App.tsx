import React from "react";
import styled from "@emotion/styled";

import Home from "scenes/Home";
import Shell from "./components/Shell";
import createStore from "core/utils/createStore";
import { createStoreContext } from "@mollycule/redux-hook";
import { IRootState } from "shared/types";

const store = createStore();
const { Provider } = createStoreContext<IRootState>();

const AppHolder = styled.main<{ blur?: boolean }>`
  background: #fff;
  height: 100%;
  min-height: 100vh;
  ${({ blur }) =>
    blur &&
    `
  filter: blur(6px);
  -webkit-filter: blur(6px);
  `}
`;

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Shell>
        <Home />
      </Shell>
    </Provider>
  );
};

export default App;
