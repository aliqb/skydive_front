import { Button, ButtonProps, DeepPartial, FlowbiteButtonTheme } from "flowbite-react";
interface SDButtonProps extends ButtonProps{
    children?: React.ReactNode;
}

const customTheme : DeepPartial<FlowbiteButtonTheme> = {
  color:{
    ...Button.defaultProps?.theme?.color,
    primary: 'bg-primary-500 hover:bg-primary-600 text-white',
    primary2: 'bg-blue-800 hover:bg-blue-900 text-white',
  },
  pill:{
    off: 'rounded-sm'
  }
}

const SDButton: React.FC<SDButtonProps> = (props) => {
  
  return (
    <Button theme={customTheme} {...props} className={`${props.className || ''}`}>
        {props.children}
    </Button>
  );
};

export default SDButton;
