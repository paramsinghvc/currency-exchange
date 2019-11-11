import React, { FC } from "react";
import ReactDOM from "react-dom";
import styled from "@emotion/styled";

import CrossIcon from "assets/Cross.svg";

const Backdrop = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  width: inherit;
  max-width: inherit;
  height: inherit;
  background: rgba(255, 255, 255, 0.7);
  /* -webkit-filter: blur(12px);
  filter: blur(12px); */
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  align-items: center;
`;

const CloseButton = styled.img``;

const Modal: FC<{
  open: boolean;
  headerText?: string;
  onClose: () => void;
}> = ({ children, open, headerText, onClose }) => {
  return open
    ? ReactDOM.createPortal(
        <Backdrop>
          <Header>
            <h3>{headerText}</h3>
            <CloseButton src={CrossIcon} role="button" onClick={onClose} />
          </Header>
          {children}
        </Backdrop>,
        document.body
      )
    : null;
};

export default Modal;
