import React, { FC } from "react";
import styled from "@emotion/styled";

import Modal from "shared/components/Modal";
import theme from "shared/theme";
import { Currency } from "shared/models/Currency";
import { IReduxOperations } from "@mollycule/redux-operation";

const Holder = styled.main`
  padding: 20px;
  height: calc(100% - 79px);
  overflow-y: auto;
`;

const ListItem = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const CurrencyCode = styled.p`
  font-size: 24px;
  color: ${theme.primaryColor};
`;

const CurrencySubText = styled.p`
  font-size: 24px;
  color: ${theme.subTextColor};
  font-size: 9px;
  font-weight: 500;
  margin-top: 7px;
`;

const CurrencyChooser: FC<{ open: boolean; onClose: () => void; currencyData: IReduxOperations<Currency[]> }> = ({
  open,
  onClose,
  currencyData
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Holder>
        {(currencyData.payload || []).map(({ code, name }) => (
          <ListItem key={code}>
            <CurrencyCode>{code}</CurrencyCode>
            <CurrencySubText>{name}</CurrencySubText>
          </ListItem>
        ))}
      </Holder>
    </Modal>
  );
};

export default CurrencyChooser;
