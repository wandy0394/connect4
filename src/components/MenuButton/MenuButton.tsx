import styles from './menuButton.module.css'

type Props = {
    label:string,
    [rest:string]:any
}

export default function MenuButton(props:Props) {
    const {label, ...rest} = props

    
    return (
        <div className={styles.menuButton} {...rest}>
            {label}
        </div>
    )
}