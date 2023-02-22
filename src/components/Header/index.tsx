import React from 'react';
import Nav from './Nav';
import BannerCarousel from './BannerCarousel/index';


const Header: React.FC<{}> = () => {
    return (
        <header>
            <Nav/>
            <BannerCarousel/>
        </header>
    )
};

export default Header;
