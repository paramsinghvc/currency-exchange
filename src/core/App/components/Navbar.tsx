import React, { FC, useMemo, useCallback } from "react";
import styled from "@emotion/styled";

import theme from "shared/theme";
import Anime from "shared/components/Anime";
import animejs from "animejs";
import { useHistory } from "react-router";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
`;

const Hamburger = styled.section`
  display: flex;
  cursor: pointer;
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

const Navbar: FC<{ showBackButton?: boolean }> = ({ showBackButton }) => {
  const history = useHistory();

  const handleBack = useCallback(() => {
    showBackButton && history.goBack();
  }, [showBackButton]);

  return (
    <Header>
      <Hamburger role="button" onClick={handleBack}>
        {showBackButton ? (
          <>
            <Anime
              open
              appear
              duration={200}
              onEntering={{
                rotate: { value: -45, duration: 0 },
                translateX: -2,
                translateY: "0%",
                width: "50%",
                easing: "linear"
              }}
            >
              <span></span>
            </Anime>
            <Anime
              open
              appear
              duration={400}
              onEntering={{ width: "90%", translateX: ["100px", 0], opacity: [0, 1], easing: "linear" }}
            >
              <span></span>
            </Anime>
            <Anime
              open
              appear
              duration={400}
              onEntering={{ width: "50%", rotate: { value: 45, duration: 0 }, translateX: -2, easing: "linear" }}
            >
              <span></span>
            </Anime>
          </>
        ) : (
          <Anime
            open
            appear
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
        )}
      </Hamburger>
    </Header>
  );
};

export default Navbar;
