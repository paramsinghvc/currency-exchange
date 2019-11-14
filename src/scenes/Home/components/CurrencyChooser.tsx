import React, { FC, useCallback } from "react";
import styled from "@emotion/styled";

import Modal from "shared/components/Modal";
import theme from "shared/theme";
import { Currency } from "shared/models/Currency";
import { IReduxOperations } from "@mollycule/redux-operation";
import Anime from "shared/components/Anime";

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
  cursor: pointer;
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

const CurrencyChooser: FC<{
  open: boolean;
  onClose: () => void;
  currencyData: IReduxOperations<Currency[]>;
  onChange: (val: Currency) => void;
}> = ({ open, onClose, currencyData, onChange }) => {
  const handleClick = useCallback(
    (currency: Currency) => () => {
      onChange(currency);
      onClose();
    },
    [onChange, onClose]
  );

  return (
    <Modal open={open} onClose={onClose}>
      <Anime open={open} duration={1000}>
        <Holder role="ul">
          {(currencyData.payload || []).map(currency => (
            <ListItem key={currency.code} onClick={handleClick(currency)} role="li">
              <CurrencyCode>{currency.code}</CurrencyCode>
              <CurrencySubText>{currency.name}</CurrencySubText>
            </ListItem>
          ))}
        </Holder>
      </Anime>
    </Modal>
  );
};

export default CurrencyChooser;
