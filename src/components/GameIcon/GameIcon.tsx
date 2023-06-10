import ColouredDisc from "../ColoredDisc/ColoredDisc"

export default function GameIcon() {
    const style = {
        display:'grid',
        gridTemplateRows:'1fr 1fr',
        gridTemplateColumns:'1fr 1fr',
        gap: '20%',
        height:'10vh',
        aspectRatio:'1/1',
        // width:'100%',
    }

    const primaryColor = window.getComputedStyle(document.body).getPropertyValue('--primary-color')
    const secondaryColor = window.getComputedStyle(document.body).getPropertyValue('--secondary-color')
    
    return (
        <div style={style}>
            <ColouredDisc color={primaryColor} size={100} />
            <ColouredDisc color={secondaryColor} size={100} />
            <ColouredDisc color={secondaryColor} size={100} />
            <ColouredDisc color={primaryColor} size={100} />
        </div>
    )
}