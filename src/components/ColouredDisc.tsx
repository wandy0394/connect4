type Props = {
    colour:string,
    size:number
}

export default function ColouredDisc(props:Props) {
    const {colour, size} = props

    const discStyle = {
        backgroundColor:colour,
        aspectRatio:'1/1',
        borderRadius:'100%',
        border: '5px solid black',
        width:size+'%'
    }
    return(
        <div style={discStyle}>
        </div>
    )
}