const NumberWithSeperator : React.FC<{value: number}> = ({value})=>{
    const formattedNumber = value.toLocaleString();
    return (
        <>{formattedNumber}</>
    )
}

export default NumberWithSeperator;