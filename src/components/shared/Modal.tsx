import React, { ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import SDCard from "./Card";


interface ModalProps{
    children: ReactNode;
    onClose?:()=>void;
    show:boolean;
    closeOnBackDrop?: boolean;
}

interface ModalBodyProps{
    children: ReactNode;
}

interface BackDropProps{
    onClick:()=>void
}

const BackDrop : React.FC<BackDropProps> = (props) => {
    function handleClick(){
        props.onClick();
    }
  return <div className="fixed top-0 left-0 w-full h-screen z-20 bg-black opacity-75" onClick={handleClick} />;
};

const ModalBody : React.FC<ModalBodyProps> = (props) => {
  return (
    <SDCard className={`z-30 fixed  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-32`}>
        {props.children}
    </SDCard>
  );
};
const SDModal : React.FC<ModalProps> = ({children,show:propsShow,closeOnBackDrop=true,onClose}) => {
    const [show, setShow] = useState<boolean>(propsShow);
    function onBackDropClick(){
        if(closeOnBackDrop){
            if(onClose){
                onClose()
            }
            setShow(false);
        }
    }
  return (
    <>
      {show && createPortal(<BackDrop onClick={onBackDropClick}  ></BackDrop>, document.getElementById("backdrop")!)}
      {show && createPortal(
        <ModalBody    
        >
            {children}
        </ModalBody>,
        document.getElementById("overlay")!
      )}
    </>
  );
};

export default SDModal;
