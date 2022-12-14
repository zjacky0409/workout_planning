// a function to transfer the variant to some color code
// useful for customizing a component's color
// for example, if we want to change/customise a color for a CustomButton(A Button Component that created by myself)
const variantToColor = (variant: string): string => {
  let buttonColor = '#ea4c89'
  switch (variant) {
    case 'primary':
      buttonColor = '#ea4c89'
      break;
    case 'danger':
      buttonColor = "#d9534f";
      break;
    case 'info':
      buttonColor = "#5bc0de"
      break;
    case "warning":
      buttonColor = "#f0ad4e"
      break;
    case "cancel":
      buttonColor = '#c2c2c2';
      break;
    default:
      buttonColor = "#ea4c89";
  }
  return buttonColor
}

export default variantToColor