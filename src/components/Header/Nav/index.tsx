import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import Container from '../../shared/Container';
import Button from '../../shared/Button';
import Link from '../../shared/Link';
import Layer from '../../shared/Layer';

import logo from '../../../assets/logo.png';
import logoDesk from '../../../assets/logo_desk.png';
import burger from '../../../assets/burger.png';
import burgerMobile from '../../../assets/burger_mobile.png';
import close from '../../../assets/close.png';


const MenuContainer = styled(Container)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const StyledNav = styled.nav<{ active: boolean }>`
    position: ${props => props.active ? 'fixed' : 'absolute'};
    box-shadow: ${props => props.active ? '0px 4px 44px rgba(0, 0, 0, 0.1)' : 'none'};
    top: 0;
    left: 0;
    width: 100%;
    background-color: ${props => props.active ? 'white' : 'transparent'};
    padding: 21px 0;
    box-shadow: ${props => props.active ? '0px 4px 44px rgba(0, 0, 0, 0.1)' : 'none'};
    z-index: 2;
    transition: padding .2s, box-shadow .2s;
    @media (max-width: 1439px) {
        padding: 24px 0 21px;
    };
    @media (max-width: 1023px) {
        padding: 24px 0;
    };
    @media (max-width: 767px) {
        padding: ${props => props.active ? '19px 0' : '19px 0 8px'};
    };
`;

const Divider = styled.div`
    display: inline-block;
    width: 1px;
    height: 30px;
    background-color: #C4C4C4;
    margin: 0 17px;
    @media (max-width: 1023px) {
        margin-left: 12px;
    };
`;

const Menu = styled.div<{ open?: boolean, isTablet: boolean; }>`
    display: flex;
    align-items: ${props => props.isTablet ? 'left' : 'center'};
    justify-content: ${props => props.isTablet ? 'space-between' : 'flex-end'};
    flex: 1;
    transition: transform .4s;
    max-width: max(260px, 60%);
    z-index: 2;
    ${props => props.isTablet && `
        flex-direction: column;
        height: 100%;
        position: fixed;
        right: 0;
        transform: translateX(${props.open ? '0' : '100%'});
        top: 0;
        background-color: white;
        padding: 24px 32px 44px 44px;
        @media (max-width: 767px) {
            padding: 24px 12px 24px 24px;
        };
    `};
`;

const MenuLinksContainer = styled.div<{ isTablet: boolean }>`
    display: flex;
    flex-direction: ${props => props.isTablet ? 'column' : 'row'};
`;

const MenuLinkWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
`;

const MenuSubLinksContainer = styled.div<{ open: boolean, isTablet: boolean; }>`
    position: absolute;
    left: 0;
    bottom: -8px;
    opacity: ${props => props.open ? 1 : 0};
    transform: ${props => props.open ? 'translateY(100%)' : 'translateY(80%)'};
    visibility: ${props => props.open ? 'visible' : 'hidden'};
    display: flex;
    flex-direction: column;
    border: 1px solid ${props => props.theme.pallete.secondary.light};
    background: #FFFFFF;
    border-radius: 15px;
    padding: ${props => props.open ? '8px 0' : 0};
    box-shadow: 0px 4px 4px rgba(51, 51, 51, 0.04), 0px 14px 24px rgba(51, 51, 51, 0.12);
    z-index: 1;
    transition: .2s;
    ${props => props.isTablet && `
        height: ${props.open ? '' : 0};
        margin-bottom: ${props.open ? '24px' : 0};
        position: relative;
        bottom: 0;
        transform: none;
        transition: .2s;
        max-width: 100%;
    `}
`;

const NavLink = styled(Link) <{ isTablet: boolean }>`
    position: relative;
    font-family: 'Gilroy bold', sans-serif;
    font-size: ${props => props.isTablet ? '24px' : '16px'};
    padding: ${props => props.isTablet ? '0 0 24px' : '6px 16px'};
    border-radius: 8px;
    &:hover {
        opacity: 1;
    };
    @media (min-width: 1024px) {
        &:hover {
            background-color: ${props => props.theme.pallete.secondary.light};
        }
    };
`;

const NavButton = styled(Button) <{ isTablet: boolean }>`
    margin-left: ${props => !props.isTablet ? '24px' : 0};
    @media (min-width: 768px) {
        padding-left: ${props => props.isTablet ? '61.5px' : ''};
        padding-right: ${props => props.isTablet ? '61.5px' : ''};
    };
`;

const NavSubLink = styled(NavLink) <{ isTablet: boolean }>`
    white-space: ${props => !props.isTablet && 'nowrap'};
    font-family: 'Gilroy', sans-serif;
    color: black;
    padding: 8px 16px;
    border-radius: 0;
`;

const Burger = styled.img`
    cursor: pointer;
    transition: .2s;
    &:hover {
        opacity: .8;
    }
`;

const CloseIcon = styled.img`
    width: 32px;
    align-self: flex-end;
    cursor: pointer;
    transition: .8s;
    &:hover {
        transform: rotate(180deg);
    }
`;

const Nav: React.FC<{}> = () => {
    const MQ = useRef(window.matchMedia('(max-width: 767px)')).current;
    const MQTablet = useRef(window.matchMedia('(max-width: 1023px)')).current;

    const [sticky, setSticky] = useState(false);
    const [isMobile, setIsMobile] = useState(MQ.matches);
    const [isTablet, setIsTablet] = useState(MQTablet.matches);
    const [menuOpen, setMenuOpen] = useState(false);
    const [subMenuOpened, setSubMenuOpened] = useState<number | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            let isScrolled = false;
            if (window.scrollY > 0) {
                isScrolled = true;
            };
            if (sticky !== isScrolled) {
                setSticky(isScrolled);
            };
        };
        const handleResize = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        const handleResizeTablet = (e: MediaQueryListEvent) => setIsTablet(e.matches);

        MQ.addEventListener('change', handleResize);
        MQTablet.addEventListener('change', handleResizeTablet);

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            MQ.removeEventListener('change', handleResize);
            MQTablet.removeEventListener('change', handleResizeTablet);
        };
    }, [sticky, MQ, MQTablet]);

    return (
        <StyledNav active={sticky}>
            <MenuContainer>
                <Link href='/' style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={isMobile && !sticky ? logo : logoDesk} alt="Логотип" />
                    {
                        !isMobile && <>
                            <Divider />
                            <span>лизинговая компания</span>
                        </>
                    }
                </Link>
                {
                    isTablet &&
                    <Burger
                        onClick={() => setMenuOpen(true)}
                        src={sticky ? burger : burgerMobile}
                        alt="Открыть меню"
                    />
                }
                {
                    isTablet && menuOpen &&
                    <Layer onClick={() => setMenuOpen(false)} />
                }
                <Menu open={menuOpen} isTablet={isTablet}>
                    <MenuLinksContainer isTablet={isTablet} >
                        {
                            isTablet &&
                            <CloseIcon src={close} alt="Закрыть меню" onClick={() => setMenuOpen(false)} />
                        }
                        <MenuLinkWrapper
                            onClick={() => setSubMenuOpened(1)}
                            onMouseEnter={() => setSubMenuOpened(1)}
                            onMouseLeave={() => setSubMenuOpened(null)}
                        >
                            <NavLink
                                isTablet={isTablet}
                            >
                                Лизинг
                            </NavLink>
                            <MenuSubLinksContainer isTablet={isTablet} open={subMenuOpened === 1}>
                                <NavSubLink href='/' isTablet={isTablet}>
                                    Для личного пользования
                                </NavSubLink>
                                <NavSubLink href='/' isTablet={isTablet}>
                                    Для юридических лиц
                                </NavSubLink>
                                <NavSubLink href='/' isTablet={isTablet}>
                                    Калькулятор
                                </NavSubLink>
                            </MenuSubLinksContainer>
                        </MenuLinkWrapper>
                        <NavLink href='/' isTablet={isTablet}>
                            Каталог
                        </NavLink>
                        <NavLink href='/' isTablet={isTablet}>
                            О нас
                        </NavLink>
                    </MenuLinksContainer>
                    <NavButton
                        isTablet={isTablet}
                        $variant={isTablet ? 'normal' : 'outlined'}
                        $font='Gilroy bold'
                    >
                        Оставить заявку
                    </NavButton>
                </Menu>
            </MenuContainer>
        </StyledNav>
    )
};

export default Nav;