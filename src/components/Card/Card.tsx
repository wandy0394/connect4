import ColoredDisc from '../ColoredDisc/ColoredDisc'
import styles from './Card.module.css'
type Props = {
    title:string
    score:number
    color:string
    children?:any
    [rest:string]:any
}
export default function Card(props:Props) {
    const {title, score, color, children, ...rest} = props
    
    return (
        
        <div className={styles.card} {...rest}>
            <div className={styles.discContainer}>
                <ColoredDisc color={color} size={30} />
            </div>
            <label className={styles.title}>{title}</label>
            <label className={styles.score}>{score}</label>
        </div>
       
    )
}