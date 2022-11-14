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

  export default {variantToColor}