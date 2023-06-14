type Props = {
    color:string,
    size:number,
    children?:any,
    [rest:string]:any
}

export default function ColoredDisc(props:Props) {
    const {color, size, children, ...rest} = props

    const discStyle = {
        backgroundColor:color,
        aspectRatio:'1/1',
        borderRadius:'100%',
        border: '0.3rem solid black',
        boxShadow:'0px 0.2rem black',
        width:size+'%'
    }
    return(
        <div style={discStyle} {...rest}>
            {children}
        </div>
    )
}