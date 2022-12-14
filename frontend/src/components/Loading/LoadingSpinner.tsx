/* 
  A Loading indicator for the user
*/

import styled from "styled-components";
import variantToColor from "../../common/styleFunction";

interface LoadingSpinnerProps {
  size: "small" | "medium" | "large";
  variant: "primary" | "danger" | "info" | "warning" | "cancel"; // customise the color for the component
}

interface StyledLoadingSpinnerProps {
  variant: "primary" | "danger" | "info" | "warning" | "cancel";
}

// for the props, i may
const LoadingSpinner = ({ size, variant }: LoadingSpinnerProps) => {
  // I try to use styled-component to perform css
  // noted that if we want to use styled-component in ts, we need to npm install another package called @types/styled-components
  const StyledLoadingSpinner = styled.div<StyledLoadingSpinnerProps>`
    border: 6px solid #f3f3f3;
    border-top: 6px solid ${(props) => variantToColor(props.variant)};
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 1s linear infinite;
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;

  return <StyledLoadingSpinner variant={variant} />;
};

export default LoadingSpinner;
