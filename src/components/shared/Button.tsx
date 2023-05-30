import { Button, ButtonProps } from "flowbite-react";
interface SDButtonProps extends ButtonProps{
    children?: React.ReactNode;
}
const SDButton: React.FC<SDButtonProps> = (props) => {
  return (
    <Button {...props} className="rounded-sm">
        {props.children}
    </Button>
  );
};

export default SDButton;
