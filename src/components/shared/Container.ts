import styled from 'styled-components';

export default styled.section`
    max-width: 1345px;
    padding: ${props => `0 ${props.theme.margin.xl}`};
    margin: 0 auto;
    @media (max-width: 1023px) {
        padding: ${props => `0 ${props.theme.margin.m}`};
    };
    @media (max-width: 767px) {
        padding: ${props => `0 ${props.theme.margin.s}`};
    };
`