import ColoredDisc from '../ColoredDisc/ColoredDisc'
import styles from './Card.module.css'
type Props = {
    title:string
    score:number
    color:string
    children?:any
    flipped?:boolean
    [rest:string]:any
}
export default function Card(props:Props) {
    const {title, score, color, children, flipped=false, ...rest} = props
    
    return (
        
        <div className={styles.card} {...rest}>
            {
                !flipped && 
                <div className={styles['disc-container']}>
                    <ColoredDisc color={color} size={60} />
                </div>
            }
            <label className={styles.title}>{title}</label>
            <label className={styles.score}>{score}</label>
            {
                flipped && 
                <div className={`${styles['flipped']}`}>
                    <ColoredDisc color={color} size={60} />
                </div>
            }
        </div>
       
    )
}