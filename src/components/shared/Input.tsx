import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import check from '../../assets/check.png';

const wrapperBase = css<{ disabled?: boolean }>`
    --px: 24px;
    position: relative;
    ${({ disabled }) => disabled && 'opacity: .4'};
    color: ${({ theme }) => theme.pallete.secondary.main};
    width: fit-content;
    transition: .2s;
`

const InputBase = styled.input`
    padding-left: var(--px);
    padding-right: var(--px);
    outline: none;
    border: 1px solid transparent;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    transition: inherit;
    border-radius: ${({ theme }) => theme.radius.small};
    background-color: ${({ theme }) => theme.pallete.secondary.light};
`;


// COMMON INPUT


const InputWrapper = styled.div<{ disabled?: boolean }>`
    ${wrapperBase};
    font-family: 'Gilroy bold', sans-serif;
    font-size: 16px;
`

const Input = styled(InputBase) <{ error: boolean }>`
    padding-top: 24px;
    padding-bottom: 8px;
    &:hover:not([disabled]) {
        background-color: ${({ theme }) => theme.pallete.secondary.dark};
    };
    &:active:not([disabled]), &:focus:not([disabled]) {
        border-color: ${({ theme }) => theme.pallete.primary.main};
        box-shadow: 0 0 0px 4px ${({ theme }) => theme.pallete.primary.transparent};
        background-color: white;
    };
    ${props => props.error && `border-color: ${props.theme.pallete.error.main}`}
`

const InputLabel = styled.label`
    position: absolute;
    left: var(--px);
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    transition: inherit;
    ${Input}:not([disabled]) + && {
        cursor: text;
    };
    ${Input}:not([disabled]):focus + &&,
    ${Input}:not([disabled]):active + &&,
    ${Input}:not([disabled]):not(:placeholder-shown) + && {
        top: 8px;
        transform: none;
        font-family: 'Gilroy', sans-serif;
        font-size: 12px;
    }
`

const fadeIn = css<{ visible: boolean }>`
    visibility: ${props => props.visible ? 'visible' : 'hidden'};
    opacity: ${props => props.visible ? 1 : 0};
    transition: .3s;
`

const ErrorMessage = styled.span<{ visible: boolean }>`
    position: absolute;
    bottom: -4px;
    left: 0;
    font-family: 'Gilroy', sans-serif;
    color: ${props => props.theme.pallete.error.main};
    transform: ${props => props.visible ? 'translateY(100%)' : 'translateY(70%)'};
    ${fadeIn}
`

const SuccessIcon = styled.div<{ visible: boolean }>`
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    aspect-ratio: 1;
    border-radius: 8px;
    background-color: ${props => props.theme.pallete.success.main};
    color: white;
    ${fadeIn}
`


// RANGE INPUT


const Range = styled.input.attrs(props => ({ type: 'range', ...props })) <RangedInputProps>`
    -webkit-appearance: none;
    width: calc(100% - var(--px) * 2);
    height: 2px;
    position: absolute;
    bottom: 0;
    left: var(--px);
    transform: translateY(-50%);
    z-index: 1;
    background: #E1E1E1;
    background-image: ${props => `linear-gradient(${props.theme.pallete.primary.main}, ${props.theme.pallete.primary.main})`};
    background-size: ${props => `${(props.value - props.min) * 100 / (props.max - props.min)}% 100%`};
    background-repeat: no-repeat;
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background: ${props => props.theme.pallete.primary.main};
        cursor: pointer;
        transform: scale(1);
        will-change: transform;
        transition: .2s;
    }
`

const InputRangeWrapper = styled.div<{ disabled?: boolean }>`
    ${wrapperBase};
    font-family: 'Nekst', sans-serif;
    font-size: 30px;
    color: ${({ theme }) => theme.pallete.secondary.main};
    @media (max-width: 768px) {
        font-size: 22px;
    };
    &:hover ${Range}::-webkit-slider-thumb {
        transform: scale(1.2);
    }
`

const InputRangeOutput = styled(InputBase)`
    padding-top: 16px;
    padding-bottom: 16px;
    border-width: 2px;
    &:active:not([disabled]), &:focus:not([disabled]) {
        border-color: ${({ theme }) => theme.pallete.secondary.light};
        background-color: white;
    };
    @media (max-width: 768px) {
        padding-left: 20px;
        padding-right: 20px;
    };
`
const InputRangeLabel = styled.label
    <{
        labelBackground?: boolean,
        smallLabel?: boolean,
    }>`
    display: block;
    width: fit-content;
    position: absolute;
    right: var(--px);
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    ${props => props.labelBackground &&
        `
        box-shadow: 0 0 0 15px #e0e0e066;
        background-color: #e0e0e066;
        border-radius: 4px;
        `
    };
    font-size: ${props => props.smallLabel ? '20px' : '30px'};
    @media (max-width: 768px) {
        font-size: 22px;
        color: #333E48;
        ${props => props.labelBackground &&
        `
            box-shadow: 0 0 0 14px #e0e0e066;
            border-radius: 12px;
        `
    };
    };
`
const ValueLabel = styled.span<{ valueLabel: string }>`
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    visibility: hidden;
    padding-left: var(--px);
    &:after {
        content: '${props => props.valueLabel}';
        position: relative;
        top: -3px;
        visibility: visible;
        @media (max-width: 768px) {
            top: -1px;
        }
    }
`



// INPUT COMPONENTS



interface LabeledInputProps {
    label?: string;
    disabled?: boolean;
    validated?: boolean;
    errorText?: string;
}

export const LabeledInput: React.FC<LabeledInputProps> = ({ label, disabled, errorText, validated }) => {
    return (
        <InputWrapper disabled={disabled}>
            <Input id={label} error={!validated && errorText?.trim() ? true : false} placeholder=' ' />
            <InputLabel htmlFor={label}>{label}</InputLabel>
            <ErrorMessage visible={!validated && errorText?.trim() ? true : false}>{errorText}</ErrorMessage>
            <SuccessIcon visible={validated || false}>
                <img src={check} alt='Поле заполнено верно' />
            </SuccessIcon>
        </InputWrapper>
    )
}

interface RangedInputProps {
    disabled?: boolean;
    value: number,
    min: number,
    max: number,
    step: number,
    label: string,
    labelBackground?: boolean,
    smallLabel?: boolean,
    valueLabel?: string,
    onChange: (e: React.ChangeEvent) => void
}

export const RangedInput: React.FC<RangedInputProps> = (props) => {

    const [cursor, setCursor] = useState<number | null>(null);
    const [value, setValue] = useState<string>(props.value.toLocaleString());

    const saveCursorPosition = () => {
        const input = ref.current;
        if (!input) return;
        let cursorPos = input.selectionStart;
        const cleanValue = (+(input.value.replace(/\D+/g, ""))).toLocaleString();

        if (cleanValue.length < value.length && cursorPos) {
            cursorPos = cursorPos - (value.length - cleanValue.length - 1);
        };
        if (cleanValue.length > value.length && cursorPos) {
            cursorPos = cursorPos + (cleanValue.length - value.length - 1);
        };

        setCursor(cursorPos);
    };

    const updateNumberValue = () => {
        const input = ref.current;
        if (!input) return;
        saveCursorPosition();
        const newValue = (+(input.value.replace(/\D+/g, ""))).toLocaleString();
        setValue(newValue);
    };

    const ref = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const input = ref.current;
        if (input) {
            setValue(props.value.toLocaleString());
        };
    }, [ref, props.value]);

    useEffect(() => {
        const input = ref.current;
        if (input) {
            input.setSelectionRange(cursor, cursor);
        };
    }, [ref, cursor]);

    const handleChange = (e: React.ChangeEvent) => {
        const currentValue = +((e.target as HTMLInputElement).value.replace(/\D+/g, ""));
        if (currentValue > props.max) {
            setValue(props.max.toLocaleString());
            return;
        };
        if (currentValue < props.min) {
            setValue(props.min.toLocaleString());
            return;
        };
        saveCursorPosition();
        props.onChange(e);
    };

    return (
        <InputRangeWrapper disabled={props.disabled}>
            <InputRangeOutput ref={ref} id={props.label} value={value} onInput={updateNumberValue} onBlur={handleChange} />
            {
                props.valueLabel &&
                <ValueLabel valueLabel={props.valueLabel}>
                    {value}
                </ValueLabel>
            }
            <InputRangeLabel htmlFor={props.label} {...{ labelBackground: props.labelBackground, smallLabel: props.smallLabel }}>
                {props.label}
            </InputRangeLabel>
            <Range {...props} />
        </InputRangeWrapper>
    )
}