import React from 'react';
import styled from 'styled-components';

import Container from '../shared/Container';
import Nav from './Nav';

const BannerContainer = styled(Container)`
    padding-top: 93px;
    @media (max-width: 1439px) {padding-top: 90px;};
    @media (max-width: 1023px) {padding-top: 80px;};
    @media (max-width: 767px) {
        padding: 0;
    }
`
const Banner = styled.div`
    background-color: black;
    border-radius: ${props => props.theme.radius.medium};
    height: 473px;
    @media (max-width: 767px) {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        height: 550px;
    };
`

const Header: React.FC<{}> = () => {

    return (
        <header>
        <Nav/>
            <BannerContainer>
                <Banner />
            </BannerContainer>
        </header>
    )
};

export default Header;
