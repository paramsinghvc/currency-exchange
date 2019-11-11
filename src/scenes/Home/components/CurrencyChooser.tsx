import React, { FC } from "react";
import styled from "@emotion/styled";

import Modal from "shared/components/Modal";
import theme from "shared/theme";

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

const CurrencyChooser: FC = () => {
  return (
    <Modal open onClose={() => {}}>
      <Holder>
        {[
          { code: "GBP", name: "Pound Sterling" },
          { code: "USD", name: "United States Dollar" },
          { code: "GBP", name: "Pound Sterling" },
          { code: "USD", name: "United States Dollar" },
          { code: "GBP", name: "Pound Sterling" },
          { code: "USD", name: "United States Dollar" },
          { code: "GBP", name: "Pound Sterling" },
          { code: "USD", name: "United States Dollar" },
          { code: "GBP", name: "Pound Sterling" },
          { code: "USD", name: "United States Dollar" },
          { code: "GBP", name: "Pound Sterling" },
          { code: "USD", name: "United States Dollar" },
          { code: "GBP", name: "Pound Sterling" },
          { code: "USD", name: "United States Dollar" },
          { code: "GBP", name: "Pound Sterling" },
          { code: "USD", name: "United States Dollar" },
          { code: "GBP", name: "Pound Sterling" },
          { code: "USD", name: "United States Dollar" },
          { code: "GBP", name: "Pound Sterling" },
          { code: "USD", name: "United States Dollar" },
          { code: "GBP", name: "Pound Sterling" },
          { code: "USD", name: "United States Dollar" },
          { code: "GBP", name: "Pound Sterling" },
          { code: "USD", name: "United States Dollar" }
        ].map(({ code, name }) => (
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
