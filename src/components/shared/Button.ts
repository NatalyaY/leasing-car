import styled, { css } from 'styled-components';
import { ThemeColor } from '../../types';
import { getColor, getPresedColor } from '../../helpers';

interface ButtonProps {
    $variant?: 'outlined' | 'normal';
    $color?: ThemeColor;
    $size?: 'large' | 'normal';
    $font?: string;
}

const outlinedButton = css<ButtonProps>`
    border: ${props => `1px solid ${getColor(props.$color || 'primary.main', props.theme)}`};
    background-color: white;
    color: ${props => `${getColor(props.$color || 'primary.main', props.theme)}`};
    &:hover:not([disabled]) {
        background-color: ${props => `${getColor(props.$color || 'primary.main', props.theme)}`};
        color: white;
    };
    &:active:not([disabled]) {
        background-color: ${props => `${getPresedColor(props.$color || 'primary.pressed', props.theme)}`};
        color: white;
    }
`


const normalButton = css<ButtonProps>`
    background-color: ${props => `${getColor(props.$color || 'primary.main', props.theme)}`};
    border: none;
    color: white;
    &:hover:not([disabled]) {
        background-color: black;
        color: white;
    };
    &:active:not([disabled]) {
        background-color: ${props => `${props.theme.pallete.secondary.main}`};
        color: white;
    }
`

export default styled.button<ButtonProps>`
    border-radius: ${props => props.theme.radius.large};
    transition: .2s;
    padding: ${props => props.$size === 'large' ? '14px 52px 18px' : '12px 24px'};
    font-size: ${props => props.$size === 'large' ? '30px' : '16px'};
    font-family: ${props => props.$font && props.$font + ', sans-serif'};
    line-height: 1.5;
    ${props => props.$size === 'large' && '@media (max-width: 768px) {font-size: 22px}'}
    ${props =>
        props.$variant === 'outlined' ?
            outlinedButton
            :
            normalButton
    };
    &:not([disabled]) {
        cursor: pointer;
    }
    &[disabled] {
        opacity: 0.4;
    }
`