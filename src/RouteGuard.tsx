import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface RouteGuardProps{
    component: React.ComponentType;
    canActivate: boolean;
    navigateTo: string
}
const RouteGuard : React.FC<RouteGuardProps> = (props)=>{
    console.log('guard',props.canActivate)
    // return props.canActivate ? (<>{<props.component />}</>) : <Navigate to={props.navigateTo}></Navigate>
    return (
        <>
        {
            props.canActivate ? (<props.component></props.component>) : <Navigate to={props.navigateTo}></Navigate>
        }
        </>
    )
}

export default RouteGuard;