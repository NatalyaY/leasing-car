import styled from 'styled-components';
import { getColor } from '../../helpers';
import { ThemeColor } from '../../types';

interface TitleProps {
    readonly $size?: number;
    readonly $color?: ThemeColor;
}

export default styled.h2<TitleProps>`
    font-family: Nekst, sans-serif;
    font-size: 54px;
    line-height: 90%;
    color: ${props => props.$color ? getColor(props.$color, props.theme) : 'inherit'};
    white-space: pre-line;
    @media (max-width: 767px) {
        font-size: ${props => props.$size ? `${props.$size}px` : "34px"};
    }
`;