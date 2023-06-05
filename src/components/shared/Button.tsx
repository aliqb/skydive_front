import { Button, ButtonProps, DeepPartial, FlowbiteButtonTheme } from "flowbite-react";
interface SDButtonProps extends ButtonProps{
    children?: React.ReactNode;
}

const customTheme : DeepPartial<FlowbiteButtonTheme> = {
  color:{
    ...Button.defaultProps?.theme?.color,
    primary: 'bg-primary-500',
  }
}

const SDButton: React.FC<SDButtonProps> = (props) => {
  
  return (
    <Button theme={customTheme} {...props} className={`${props.className || ''} rounded-sm text-white`}>
        {props.children}
    </Button>
  );
};

export default SDButton;
