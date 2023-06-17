import ColouredDisc from "../ColoredDisc/ColoredDisc"
import styles from './GameIcon.module.css'
export default function GameIcon() {

    const primaryColor = window.getComputedStyle(document.body).getPropertyValue('--primary-color')
    const secondaryColor = window.getComputedStyle(document.body).getPropertyValue('--secondary-color')
    
    return (
        <div className={styles.icon}>
            <ColouredDisc color={primaryColor} size={100} />
            <ColouredDisc color={secondaryColor} size={100} />
            <ColouredDisc color={secondaryColor} size={100} />
            <ColouredDisc color={primaryColor} size={100} />
        </div>
    )
}