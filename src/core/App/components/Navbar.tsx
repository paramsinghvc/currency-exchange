import React, { FC } from "react";
import styled from "@emotion/styled";

import theme from "shared/theme";
import Anime from "shared/components/Anime";
import animejs from "animejs";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
`;

const Hamburger = styled.section`
  display: flex;
  flex-direction: column;
  width: 40px;
  margin: 20px;
  > span {
    width: 100%;
    height: 4px;
    background: ${theme.primaryColor};
    margin-bottom: 4px;
    border-radius: 3px;
    &:nth-of-type(2) {
      width: 50%;
    }
    &:last-of-type {
      width: 70%;
      margin-bottom: 0;
    }
  }
`;

const Navbar: FC = () => {
  return (
    <Header>
      <Hamburger role="button">
        <Anime
          open
          duration={800}
          onEntering={{
            opacity: [0, 1],
            translateX: ["-100%", 0],
            scaleX: [1.2],
            delay: animejs.stagger(50),
            easing: "easeInOutQuart"
          }}
          onEntered={{ scaleX: 1, delay: animejs.stagger(75), duration: 300, easing: "linear" }}
        >
          <span></span>
          <span></span>
          <span></span>
        </Anime>
      </Hamburger>
    </Header>
  );
};

export default Navbar;
