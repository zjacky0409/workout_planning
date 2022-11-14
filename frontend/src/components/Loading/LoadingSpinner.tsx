import styled from "styled-components";
import variantToColor from '../../common/styleFunction'

interface LoadingSpinnerProps {
    size: string;
    thinkness: string;
    variant:string;
}

// for the props, i may
const LoadingSpinner = () => {

    // I try to use styled-component to perform css 
    // noted that if we want to use styled-component in ts, we need to npm install another package called @types/styled-components
    const StyledLoadingSpinner = styled.div`
        border: 6px solid #f3f3f3;
        border-top: 6px solid #3498db;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        animation: spin 1s linear infinite;
        @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
        }
    `;

    return (
        <StyledLoadingSpinner />
    )
}

export default LoadingSpinner;