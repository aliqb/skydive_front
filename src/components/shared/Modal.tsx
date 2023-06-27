import React, { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import SDCard from "./Card";


interface ModalProps{
    children: ReactNode;
    onClose:()=>void;
    show:boolean;
    closeOnBackDrop?: boolean;
    containerClass?: string;
}

interface ModalBodyProps{
    containerClass?: string;
    children: ReactNode;
}

interface BackDropProps{
    onClick:()=>void
}

const BackDrop : React.FC<BackDropProps> = (props) => {
    function handleClick(){
        props.onClick();
    }
  return <div className="fixed top-0 left-0 w-full h-screen z-40 bg-black opacity-75" onClick={handleClick} />;
};

const ModalBody : React.FC<ModalBodyProps> = (props) => {
  return (
    <SDCard className={` ${props.containerClass} z-50 fixed  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-4/5 xs:w-auto max-w-[95vw]`}>
        {props.children}
    </SDCard>
  );
};
const SDModal : React.FC<ModalProps> = ({children,show:propsShow,closeOnBackDrop=true,onClose, containerClass}) => {
    const [show, setShow] = useState<boolean>(propsShow);
    function onBackDropClick(){
        if(closeOnBackDrop){
            if(onClose){
                onClose()
            }
            setShow(false);
        }
    }
    useEffect(()=>{
        setShow(propsShow)
    },[propsShow])
  return (
    <>
      {show && createPortal(<BackDrop onClick={onBackDropClick}  ></BackDrop>, document.getElementById("backdrop")!)}
      {show && createPortal(
        <ModalBody containerClass={containerClass}  
        >
            {children}
        </ModalBody>,
        document.getElementById("overlay")!
      )}
    </>
  );
};

export default SDModal;
