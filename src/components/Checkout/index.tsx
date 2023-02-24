import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { LabeledInput, PhoneMaskedInput, ErrorMessage } from './../shared/Input';
import Layer from '../shared/Layer';
import Heading from '../shared/Heading';
import Button from '../shared/Button';
import Link from '../shared/Link';


import socials from '../../assets/socials.svg';


const slideIn = keyframes`
    from {
        transform: translateY(999px);
    }

    to {
        transform: translateY(0px);
    }
`;

const slideOut = keyframes`
    from {
        transform: translateY(0px);
        opacity: 1;
    }

    to {
        transform: translateY(999px);
        opacity: 0;
    }
`;

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`;

const fromTop = keyframes`
    from {
        transform: translateY(-30px);
        opacity: 0.1;
    }

    to {
        transform: translateY(0px);
        opacity: 1;
    }
`;

const Modal = styled.div.attrs({ role: 'modal' }) <{ hide: boolean }>`
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    background: white;
    border-radius: ${props => props.theme.radius.medium} ${props => props.theme.radius.medium} 0 0;
    padding: 160px calc((100% - 655px) / 2);
    animation: ${props => props.hide ? slideOut : slideIn} ${props => props.hide ? '.25s' : '.5s'};
    z-index: 2;
    @media (max-width: 1023px) {
        padding: 120px 36px;
    };
    @media (max-width: 767px) {
        padding: 24px 20px 70px;
    };
`;

const ModalHeading = styled(Heading)`
    margin-bottom: 24px;
    @media (max-width: 767px) {
        margin-bottom: 16px;
    };
`;

const StyledText = styled.p`
    white-space: pre-line;
    color: ${props => props.theme.pallete.secondary.main};
    @media (max-width: 767px) {
        white-space: normal;
    };
`;

const CloseIcon = styled.button`
    position: absolute;
    top: 48px;
    right: 48px;
    width: 48px;
    height: 48px;
    border: none;
    border-radius: 50%;
    background-color: ${props => props.theme.pallete.secondary.light};
    cursor: pointer;
    transition: .2s;
    will-change: transform;
    &:hover {
        transform: rotate(180deg);
    };
    @media (max-width: 1439px) {
        right: 28px;
    };
    @media (max-width: 1023px) {
        top: 36px;
        right: 36px;
    };
    @media (max-width: 767px) {
        top: 24px;
        right: 20px;
        width: 24px;
        height: 24px;
    };
    &:after, &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        background-color: #828282;
        height: 18px;
        width: 1.5px;
        @media (max-width: 767px) {
            height: 9px;
        };
    };
    &:after {
        transform: translate(-50%, -50%) rotate(45deg);
    };
    &:before {
        transform: translate(-50%, -50%) rotate(-45deg);
    };


`;

const Form = styled.form`
    display: flex;
    gap: 32px;
    margin-top: 44px;
    @media (max-width: 767px) {
        gap: 8px;
        margin-top: 32px;
        flex-wrap: wrap;
    };
`;

const InputWrap = styled.div`
    flex: 1;
    @media (max-width: 767px) {
        flex-basis: 100%;
    };
`;

const ButtonContainer = styled.div`
    border: 2px solid ${props => props.theme.pallete.secondary.light};
    border-radius: ${props => props.theme.radius.small};
    padding: 26px 23px 26px 33px;
    margin: 32px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 112px;
    @media (max-width: 767px) {
        border: none;
        margin: 8px 0 24px;
        gap: 16px;
        text-align: center;
        padding: 0;
        flex-wrap: wrap-reverse;
        justify-content: center;
    }
`;

const PolicyText = styled(StyledText)`
    font-size: 14px;
    color: '#11111180';
    @media (max-width: 767px) {
        flex-basis: 100%;
    };
`;

const ButtonWrap = styled.div`
    position: relative;
    flex: 1;
`;

const SocialsContainer = styled.div`
    display: flex;
    gap: 16px;
    justify-content: center;
    align-items: center;
`;

const SocialButton = styled.a.attrs({ target: '_blank' })`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 2px solid #E7E7E7;
    color: ${props => props.theme.pallete.secondary.main};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: .3s;
    cursor: pointer;
    &:hover {
        color: white;
        background-color: ${props => props.theme.pallete.primary.main};
        border-color: ${props => props.theme.pallete.primary.main};
    };
    &:active {
        color: white;
        background-color: ${props => props.theme.pallete.primary.pressed};
        border-color: ${props => props.theme.pallete.primary.pressed};
    };
`;

const Loader = styled.div`
    height: 21px;
    aspect-ratio: 1;
    border-radius: 50%;
    border: 2px solid white;
    border-right-color: transparent;
    position: relative;
    margin: 0 auto;
    animation: ${rotate} .5s infinite linear;
    &:after {
        content: '';
        position: absolute;
        left: -2px;
        top: -2px;
        width: 100%;
        height: 100%;
        border: inherit;
        border-radius: inherit;
        transform: rotate(42deg);
    }
`;

const SucessContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    text-align: center;
`;

const SucessIcon = styled.div`
    position: relative;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin: 0 auto 30px;
    background-color: ${props => props.theme.pallete.success.main};
    will-change: transform;
    animation: ${fromTop} .5s;
    transition: .5s;
    &::after {
        content: '✔';
        position: absolute;
        display: inline-block;
        top: 50%;
        left: 50%;
        font-size: 78px;
        color: white;
        transform: translate(-50%, -50%);
    }
`;

interface Props {
    cost: number;
    deposit: number;
    period: number;
    calculatedTotal: string;
    calculatedAnnual: string;
    handleClose: () => void;
};

const Checkout: React.FC<Props> = ({ handleClose, ...formData }) => {
    const commonPhonePlaceholder = '+7 (921) 123 45 67';


    const chatID = process.env.REACT_APP_CHAT_ID;
    const url = process.env.REACT_APP_BOT_URL;

    const [hide, setHide] = useState(false);
    const [phoneComplete, setPhoneComplete] = useState(false);
    const [phonePlaceholder, setPhonePlaceholder] = useState(commonPhonePlaceholder);

    const hideOnClose = () => {
        setHide(true);
        setTimeout(() => {
            handleClose();
        }, 200)
    };

    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState<string | undefined>('');

    const [name, setName] = useState('');

    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [submitError, setSubmitError] = useState<string | undefined>();
    const [submitting, setSubmitting] = useState(false);
    const [submitSucess, setSubmitSucess] = useState(false);

    const formDataNames = {
        cost: 'Стоимость автомобиля',
        deposit: 'Первоначальный взнос',
        period: 'Срок лизинга',
        calculatedTotal: 'Рассчитанная сумма договора лизинга',
        calculatedAnnual: 'Рассчитанный ежемесячный платеж',
        name: '\n\u{1F464} Имя',
        phone: '\u{1F4F1} Телефон'
    };

    const cleanPhone = phone.replace('+7', '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (submitting) return;

        if (!phoneComplete) {
            setPhoneError('Укажите номер телефона');
            setSubmitDisabled(true);
            return;
        };

        setSubmitting(true);
        setSubmitError(undefined);

        if (!url || !chatID) {
            setSubmitError(`
                Не удалось отправить заявку.
                Ошибка конфигурации
            `);
            return;
        };

        const href = window.location.href;
        const date = new Date().toLocaleString().replaceAll('.', '\\.');

        const allFormData = { ...formData, ...{ name, phone } };
        const formDataText = Object.entries(allFormData).map(([name, value]) => {
            const label = formDataNames[name as keyof typeof formDataNames];
            const normalizedValue = value.toLocaleString().replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
            return `*${label}:* ` +
                `_${normalizedValue || 'не указано'}_\n`
        });

        const text = `*\u{1F525} Заявка с сайта [Leasing Car](${href}) \u{1F525}*\n` +
            `\u{23F0} ${date} ` +
            '\\#lead\n\n' +
            formDataText.join('');


        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: chatID,
                parse_mode: 'MarkdownV2',
                text,
            })
        });

        setSubmitting(false);

        if (res.status === 200) {
            setSubmitSucess(true);
        } else {
            setSubmitError(`Не удалось отправить заявку.\n${res.statusText}`);
        };
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>, complete = undefined, masked = undefined) => {
        setPhoneComplete(complete || false);

        if (complete) {
            setSubmitDisabled(false);
            setPhoneError(undefined);
        };

        setPhone(e.target.value);
        setPhonePlaceholder((masked || '') + commonPhonePlaceholder.slice((masked || '').length));
    };

    const handlePhoneFocus = () => !phone && setPhone(' ');

    const handlePhoneBlur = () => {
        if (cleanPhone && !phoneComplete) {
            setPhoneError('Укажите номер телефона');
            setSubmitDisabled(true);
        } else if (!cleanPhone) {
            setPhone('');
        };
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    };

    return (
        <>
            <Layer onClick={hideOnClose} />
            <Modal hide={hide}>
                <CloseIcon onClick={hideOnClose} />
                {
                    !submitSucess ?
                        <>
                            <ModalHeading $size={22}>Онлайн-заявка</ModalHeading>
                            <StyledText style={{ paddingRight: '28px' }}>
                                {'Заполните форму, и мы вскоре свяжемся с вами, чтобы \nответить на все вопросы'}
                            </StyledText>
                            <Form noValidate id='checkoutForm' onSubmit={handleSubmit}>
                                <InputWrap>
                                    <LabeledInput
                                        errorText={phoneError}
                                        validated={phoneComplete}
                                        label="Телефон *"
                                        placeholder={phonePlaceholder}
                                        component={PhoneMaskedInput}
                                        value={phone}
                                        onChange={handlePhoneChange}
                                        inputProps={{
                                            onFocus: handlePhoneFocus,
                                            onBlur: handlePhoneBlur,
                                            autoComplete: 'phone'
                                        }}
                                    />
                                </InputWrap>
                                <InputWrap>
                                    <LabeledInput value={name} onChange={handleNameChange} label='Имя' inputProps={{ autoComplete: 'given-name' }} />
                                </InputWrap>
                            </Form>
                            <ButtonContainer>
                                <PolicyText>
                                    {'Нажимая на кнопку «Оставить заявку»,  я даю \nсогласие '}
                                    <Link style={{ color: 'black' }} href="/">на обработку персональных данных</Link>
                                </PolicyText>
                                <ButtonWrap>
                                    <Button form='checkoutForm' type='submit' disabled={submitDisabled} $font='Gilroy bold'>
                                        {
                                            submitting ?
                                                <Loader />
                                                :
                                                'Оставить заявку'
                                        }
                                    </Button>
                                    {
                                        submitError &&
                                        <ErrorMessage visible={Boolean(submitError)}>{submitError}</ErrorMessage>
                                    }
                                </ButtonWrap>
                            </ButtonContainer>
                            <SocialsContainer>
                                <SocialButton href='https://wa.me/71111111111'>
                                    <svg width="20" height="20" viewBox="0 0 20 20">
                                        <use xlinkHref={socials + '#wh'} />
                                    </svg>
                                </SocialButton>
                                <SocialButton href='https://t.me/+71111111111'>
                                    <svg width="22" height="17" viewBox="0 0 22 17">
                                        <use xlinkHref={socials + '#tg'} />
                                    </svg>
                                </SocialButton>
                            </SocialsContainer>
                        </>
                        :
                        <SucessContainer>
                            <SucessIcon />
                            <Heading>Заявка успешно отправлена!</Heading>
                            <p>Мы свяжемся с вами в ближайшее время</p>
                        </SucessContainer>
                }
            </Modal>
        </>
    );
};

export default Checkout;
