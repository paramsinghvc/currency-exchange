import React from "react";
import ReactDOM from "react-dom";
import { css, Global } from "@emotion/core";

import App from "./core/App/App";
import * as serviceWorker from "./serviceWorker";

const Root = (
  <>
    <Global
      styles={css`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        body {
          font-family: "Roboto", "Helvetica Neue", sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background: #f2f2f2;
          max-width: 500px;
          margin: 0 auto;
          width: 100%;
          height: 100%;
          position: relative;
        }
      `}
    />
    <App />
  </>
);

ReactDOM.render(Root, document.getElementById("root"));

serviceWorker.unregister();
