import React, { FC } from 'react';
import styled from '@emotion/styled';

import theme from 'shared/theme';

const Header = styled.header`
    display: flex;
    justify-content: space-between;
`;

const Hamburger = styled.section`
    display: flex;
    flex-direction: column;
    width: 40px;
    margin: 20px;
    >span {
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
    return <Header>
        <Hamburger role="button">
            <span></span>
            <span></span>
            <span></span>
        </Hamburger>
    </Header>
}

export default Navbar;