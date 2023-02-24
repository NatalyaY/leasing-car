import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import Container from '../../shared/Container';

import car from '../../../assets/car.jpg';
import car2 from '../../../assets/car2.png';
import cars from '../../../assets/cars.png';
import arrow from '../../../assets/arrow.png';
import Banner from './Banner/index';



const BannerContainer = styled(Container)`
    padding-top: 93px;
    user-select: none;
    @media (max-width: 1439px) {padding-top: 90px;};
    @media (max-width: 1023px) {padding-top: 80px;};
    @media (max-width: 767px) {
        padding: 0;
    };
`

const BannerCarouselContainer = styled.div`
    --pb: 44px;
    overflow: hidden;
    border-radius: ${props => props.theme.radius.medium};
    height: 473px;
    position: relative;
    @media (max-width: 1023px) {--pb: 24px;};
    @media (max-width: 767px) {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        height: 550px;
    };
`

const BannerCarouselStyled = styled.div<{ activeBanner: number }>`
    height: 100%;
    display: flex;
    transition: transform .5s;
    transform: translateX(${props => props.activeBanner * -100}%);
    will-change: transform;
    touch-action: none;
`

const DotContainer = styled.div`
    position: absolute;
    left: 50%;
    bottom: var(--pb);
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
`

const ArrowsContainer = styled.div`
    position: absolute;
    right: 44px;
    bottom: 44px;
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
    @media (max-width: 768px) {
        display: none;
    }
`

const Arrow = styled.button<{ disabled: boolean, prev?: boolean }>`
    width: 48px;
    height: 48px;
    border: 2px solid #ffffff7f;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    position: relative;
    transition: background-color .2s;
    cursor: ${props => props.disabled ? '' : 'pointer'};
    ${props => props.prev && !props.disabled && `
        transform: scale(-1, 1);
    `};
    ${props => !props.disabled && `
        &:hover {
            background-color: rgba(255, 255, 255, 0.18);
        };
        &:active {
            background-color: rgba(255, 255, 255, 0.3);
            border-color: transparent;
        };
    `}
    ${props => props.disabled && `
        transform: scale(0.5) ${props.prev ? 'scale(-1, 1)' : ''};
        opacity: .4;
        && ${ArrowProgress} {
            opacity: 0;
        };
    `}
`

const ArrowProgress = styled.div`
    position: absolute;
    right: -2px;
    top: -2px;
    width: 50%;
    height: 100%;
    overflow: hidden;
    &:before {
        content: '';
        position: absolute;
        right: 0;
        top: 0;
        display: block;
        width: 200%;
        height: 100%;
        border: 2px solid transparent;
        border-right-color: white;
        border-top-color: white;
        border-radius: 50%;
    }
`

const Dot = styled.div<{ active: boolean }>`
    width: 22px;
    height: 22px;
    position: relative;
    opacity: ${props => props.active ? '1' : '.4'};
    cursor: ${props => props.active ? '' : 'pointer'};
    ${props => !props.active && `
        &:hover:after {
            transform: translate(-50%, -50%) scale(0.8);
        };
    `};
    &:after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        border-radius: 50%;
        background-color: white;
        width: 12px;
        height: 12px;
        transform: translate(-50%, -50%) scale(${props => props.active ? '1' : '0.5'});
        transition: transform .2s;
        will-change: transform;
    }
`

const banners: {
    background: string;
    title: string;
    subtitle?: string;
    buttonText: string;
    img?: string;
    textPosition?: string;
}[] = [
        {
            background: 'black',
            title: 'Авто в лизинг для физических лиц',
            subtitle: 'Получите машину за 5 дней',
            buttonText: 'Оставить заявку',
            img: car
        },
        {
            background: 'radial-gradient(circle at center right, #eba22d 35%, #c6c6c7 15%)',
            title: 'Лизинг для юридических лиц',
            buttonText: 'Получить предложение',
            img: car2,
        },
        {
            background: 'radial-gradient(circle at 20% top, #c9c8c8 0%, #b1aca7 30%, #eba22d)',
            title: 'Удобный калькулятор для быстрого расчета',
            buttonText: 'Рассчитать стоимость',
            textPosition: 'center',
        },
        {
            background: 'linear-gradient(to top, #606060 calc(33% + 8px), white calc(33% + 8px), white calc(33% + 10px), black calc(33% + 10px))',
            title: 'Большой выбор \nв каталоге',
            subtitle: 'Авто для любой задачи',
            buttonText: 'Выбрать в каталоге',
            img: cars,
        },
    ];

const BannerCarousel: React.FC<{}> = () => {
    const [activeBanner, setActiveBanner] = useState(0);

    const goPrev = activeBanner !== 0 ?
        () => setActiveBanner(current => current - 1)
        : undefined;

    const goNext = activeBanner !== banners.length - 1 ?
        () => setActiveBanner(current => current + 1)
        : undefined;

    let X: number | undefined;
    let dragged = false;
    let movementX: number | undefined;
    let timer = useRef<number | undefined>();

    const onPointerDown: React.MouseEventHandler<HTMLElement> = (e) => {
        document.addEventListener('pointermove', onPointerMove);
        document.addEventListener('pointerup', onPointerUp);
        X = (e.pageX);
    };

    const onPointerMove: EventListener = (e) => {
        dragged = true;
        movementX = (e as MouseEvent).pageX - (X || 0);
    };

    const onPointerUp: EventListener = (e) => {
        if (movementX !== undefined) {
            if (movementX > 0) {
                goPrev && goPrev();
            } else if (movementX < 0) {
                goNext && goNext();
            };
        };
        X = undefined;
        movementX = undefined;
        dragged = false;
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', onPointerUp);
    };

    const autoScroll = useMemo(() => () => {
        if (dragged) {
            clearTimeout(timer.current);
            return;
        };
        setActiveBanner(current => current !== banners.length - 1 ? current + 1 : 0);
        timer.current = window.setTimeout(autoScroll, 2500);
    }, [dragged]);


    useEffect(() => {
        if (timer.current) return;
        timer.current = window.setTimeout(autoScroll, 2500);
    }, [autoScroll])

    return (
        <BannerContainer>
            <BannerCarouselContainer>
                <BannerCarouselStyled activeBanner={activeBanner} onPointerDown={onPointerDown} onDragStart={(e) => e.preventDefault()}>
                    {
                        banners.map(banner =>
                            <Banner key={banner.title} banner={banner} />
                        )
                    }
                </BannerCarouselStyled>
                <DotContainer>
                    {
                        banners.map((_, i) =>
                            <Dot key={i} active={i === activeBanner} onClick={() => setActiveBanner(i)} />
                        )
                    }
                </DotContainer>
                <ArrowsContainer>
                    <Arrow disabled={activeBanner === 0} prev={true} onClick={goPrev}>
                        <ArrowProgress />
                        <img src={arrow} alt="Назад" />
                    </Arrow>
                    <Arrow disabled={activeBanner === banners.length - 1} onClick={goNext} >
                        <ArrowProgress />
                        <img src={arrow} alt="Вперед" />
                    </Arrow>
                </ArrowsContainer>
            </BannerCarouselContainer>
        </BannerContainer>
    );
};

export default BannerCarousel;
