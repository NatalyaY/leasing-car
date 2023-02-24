import React, { useState } from 'react';
import styled from 'styled-components';
import Container from '../shared/Container';
import Heading from '../shared/Heading';
import { RangedInput } from '../shared/Input';
import Button from '../shared/Button';
import Checkout from './../Checkout/index';


const MainContainer = styled(Container)`
    padding-top: 100px;
    padding-bottom: 100px;
    @media (max-width:1439px) {
        padding-top: 80px;
        padding-bottom: 80px;
    };
    @media (max-width:767px) {
        padding-top: 64px;
        padding-bottom: 64px;
    };
`

const StyledForm = styled.form.attrs({ novalidate: true })`
    display: flex;
    gap: 32px;
    margin-top: 32px;
    @media (max-width: 1439px) {
        margin-top: 44px;
        flex-wrap: wrap;
    };
    @media (max-width: 767px) {
        gap: 25px;
        margin-top: 32px;
    };
`;

const StyledFormSummary = styled.div`
    display: flex;
    gap: 32px;
    margin-top: 44px;
    @media (max-width: 1439px) {
        margin-top: 37px;
        flex-wrap: wrap;
    };
    @media (max-width: 767px) {
        gap: 29px;
        margin-top: 25px;
    };
`;

const StyledField = styled.div<{ gap: number, growOnMobile?: boolean }>`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: ${props => props.gap}px;
    color: ${props => props.theme.pallete.secondary.main};
    @media (max-width: ${props => props.growOnMobile ? '767px' : '1439px'}) {
        flex-basis: 100%;
    };
    @media (max-width: 767px) {
        gap: 8px;
    };
`;

const ButtonWrapper = styled.div`
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    @media (max-width: 1439px) {
        flex: 1 100%;
        margin-top: 12px;
    };
    @media (max-width: 767px) {
        margin-top: 3px;
    };
`;

const SubmitBtn = styled(Button)`
    flex: 1;
    @media (max-width: 1439px) {
        flex: 0 0 auto;
    };
`;


const Form: React.FC<{}> = () => {
    const [step, setStep] = useState(1);
    const [cost, setCost] = useState(3300000);
    const [deposit, setDeposit] = useState(420000);
    const [period, setPeriod] = useState(60);

    const costOptions = {
        min: 10000,
        max: 4000000,
        step: 10000,
        label: '₽'
    };
    const depositOptions = {
        ...costOptions,
        max: cost * 0.99,
        step: costOptions.step * 0.5,
        min: costOptions.min * 0.5,
        label: Math.round(deposit / cost * 100) + '%',
        valueLabel: ' ₽',
        smallLabel: true,
        labelBackground: true
    };
    const periodOptions = {
        min: 6,
        max: 70,
        step: 1,
        label: 'мес.'
    };

    type Context = (typeof costOptions | typeof depositOptions | typeof periodOptions) & {
        changeValue: React.Dispatch<React.SetStateAction<number>>;
        changeDepositValue?: React.Dispatch<React.SetStateAction<number>>
    };

    function changeValue(this: Context, e: React.ChangeEvent) {
        let value: number | string = (e.target as HTMLInputElement).value;
        if (typeof value === 'string') {
            value = value.replace(/\D+/g, "");
        };
        value = Math.min(this.max, Math.max(this.min, +value));
        this.changeValue(value);
        if (this.changeDepositValue) {
            const newDepositValue = Math.max(Math.min(deposit, value * 0.99), depositOptions.min);
            this.changeDepositValue(newDepositValue)
        };
    };

    const changeCost = changeValue.bind({ ...costOptions, changeValue: setCost, changeDepositValue: setDeposit });
    const changeDeposit = changeValue.bind({ ...depositOptions, changeValue: setDeposit });
    const changePeriod = changeValue.bind({ ...periodOptions, changeValue: setPeriod });

    const percent = (41.5 / 12) / 100;
    const ratio = Math.pow(1 + percent, period);

    const annual = (cost - deposit) * (percent * ratio / (ratio - 1));
    const calculatedTotal = Math.round(annual * period).toLocaleString();
    const calculatedAnnual = Math.round(annual).toLocaleString();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(2);
    };

    const handleClose = () => {
        setStep(1);
    };

    return (
        <main>
            <MainContainer>
                <Heading as={'h1'}>{'Рассчитайте стоимость \nавтомобиля в лизинг'}</Heading>
                <StyledForm id={'getLeasing'} onSubmit={handleSubmit}>
                    <StyledField gap={24}>
                        <span>Стоимость автомобиля</span>
                        <RangedInput  {...{ ...costOptions, value: cost, onChange: changeCost }} />
                    </StyledField>
                    <StyledField gap={24}>
                        <span>Первоначальный взнос</span>
                        <RangedInput  {...{ ...depositOptions, value: deposit, onChange: changeDeposit }} />
                    </StyledField>
                    <StyledField gap={24}>
                        <span>Срок лизинга</span>
                        <RangedInput  {...{ ...periodOptions, value: period, onChange: changePeriod }} />
                    </StyledField>
                </StyledForm>
                <StyledFormSummary>
                    <StyledField gap={8} growOnMobile>
                        <span>Сумма договора лизинга</span>
                        <Heading>{calculatedTotal}</Heading>
                    </StyledField>
                    <StyledField gap={8} growOnMobile>
                        <span>Ежемесячный платеж от</span>
                        <Heading>{calculatedAnnual}</Heading>
                    </StyledField>
                    <ButtonWrapper>
                        <SubmitBtn type={'submit'} form={'getLeasing'} $size='large' $font='Nekst'>Оставить заявку</SubmitBtn>
                    </ButtonWrapper>
                </StyledFormSummary>
            </MainContainer>
            {
                step === 2 &&
                <Checkout {...{ cost, deposit, period, calculatedTotal, calculatedAnnual, handleClose }} />
            }
        </main>
    );
};

export default Form;
