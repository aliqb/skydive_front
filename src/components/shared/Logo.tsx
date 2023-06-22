const Logo : React.FC<{className?:string}> = ({className})=>{
    return (
        <img src="/skydive-logo.png" alt="" className={className} />
    )
}

export default Logo;