import React, { FC } from "react";
import styled from "@emotion/styled";

import Navbar from "./Navbar";
import useRedux from "@mollycule/redux-hook";
import { IRootState } from "shared/types";

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

const Shell: FC<{ showBackButton?: boolean }> = ({ showBackButton, children }) => {
  const { currencyModalStatus } = useRedux<IRootState, Pick<IRootState["home"], "currencyModalStatus">>(
    state => ({
      currencyModalStatus: state.home.currencyModalStatus
    }),
    {}
  );

  return (
    <AppHolder blur={currencyModalStatus}>
      <Navbar showBackButton={showBackButton} />
      {children}
    </AppHolder>
  );
};

export default Shell;
