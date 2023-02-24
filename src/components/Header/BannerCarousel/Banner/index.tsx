import React from 'react';
import styled from 'styled-components';
import Button from '../../../shared/Button';
import Heading from '../../../shared/Heading';

const BannerContainer = styled.div<{ background: string, textPosition?: string }>`
    flex: 0 0 100%;
    background: ${props => props.background || 'black'};
    padding: 70px;
    @media (max-width: 1023px) {padding: 44px};
    @media (max-width: 767px) {padding: 20px 20px 86px};
    position: relative;
    color: white;
    overflow: hidden;
    display: flex;
    ${props => props.textPosition && `
        justify-content: ${props.textPosition};
    `};
    ${props => props.textPosition === 'center' && `
        align-items: ${props.textPosition};
    `};
    @media (max-width: 1023px) {
        align-items: ${props => props.textPosition !== 'center' && 'flex-end'};
    };
`

const BannerContent = styled.div<{ textPosition?: string }>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    max-width: min(585px, 90%);
    position: relative;
    z-index: 1;
    ${props => props.textPosition === 'center' && `
        align-items: center;
        text-align: center;
    `};
    @media (max-width: 1023px) {
        gap: 32px;
    };
`;

const Subtitle = styled.h3`
    font-family: 'Nekst', sans-serif;
    font-size: 30px;
    margin-top: 8px;
    @media (max-width: 1023px) {
        display: none;
    };
`;

const BannerImg = styled.img`
    position: absolute;
    right: 0;
    bottom: 0;
    width: 62%;
    height: auto;
    max-height: 100%;
    object-fit: contain;
    object-position: right;
    @media (max-width: 1440px) {
        bottom: 19px;
        width: 72.7%;
        max-height: 80%;
    };
    @media (max-width: 1023px) {
        width: auto;
        max-width: calc(100% - 46px);
        max-height: 67.8%;
        object-position: bottom;
        bottom: unset;
        right: 46px;
        top: 0;
        transform: translateY(-30px);
    };
    @media (max-width: 767px) {
        height: 50%;
        width: 100%;
        top: 30px;
        transform: none;
        object-position: right;
    };
    @media (max-width: 400px) {
        width: 144%;
        max-width: unset;
        max-height: 47.5%;
        object-position: right;
        bottom: unset;
        top: 0;
        right: -5%;
        left: unset;
        transform: none;
    };
`;

interface Props {
    banner: {
        background: string;
        title: string;
        subtitle?: string;
        buttonText: string;
        img?: string;
        textPosition?: string;
    };
};

const Banner: React.FC<Props> = ({ banner }) => {
    return (
        <BannerContainer background={banner.background} textPosition={banner.textPosition}>
            {
                banner.img &&
                <BannerImg src={banner.img} />
            }
            <BannerContent textPosition={banner.textPosition}>
                <Heading $size={32}>{banner.title}</Heading>
                {
                    banner.subtitle &&
                    <Subtitle>{banner.subtitle}</Subtitle>
                }
                <Button $font='Gilroy bold'>{banner.buttonText}</Button>
            </BannerContent>
        </BannerContainer>
    );
};

export default Banner;
