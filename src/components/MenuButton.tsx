import { theme } from "./theme/theme"

type Props = {
    label:string,
    [rest:string]:any
}

export default function MenuButton(props:Props) {
    const {label, ...rest} = props
    const buttonStyle = {
        borderRadius:'0.5rem',
        backgroundColor:theme.primaryColour,
        color:'white',
        hover: {
            backgroundColor:theme.primaryColourHover,
        }
    }
    
    return (
        <div style={buttonStyle} {...rest}>
            {label}
            Button
        </div>
    )
}