import styled from 'styled-components';
import { getColor } from '../../helpers';
import { ThemeColor } from '../../types';

interface TitleProps {
    readonly $size?: number;
    readonly $color?: ThemeColor;
}

export default styled.h1<TitleProps>`
    font-family: Nekst, sans-serif;
    font-size: 54px;
    line-height: 90%;
    color: ${props => props.$color ? getColor(props.$color, props.theme) : 'black'};
    @media (max-width: 768px) {
        font-size: ${props => props.$size ? `${props.$size}px` : "34px"};
    }
`;