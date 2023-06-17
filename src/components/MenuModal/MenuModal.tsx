import styles from './MenuModal.module.css'

type Props = {
    visible:boolean
    setVisible:React.Dispatch<React.SetStateAction<boolean>>
}

export default function MenuModal(props:Props) {
    const {visible, setVisible} = props

    return (
        <div 
            style={{display: visible?'block':'none'}} 
            className={styles['modal']}
        >
            <div
                style={{display: visible?'block':'none'}}  
                className={`${styles['modal-size']} ${styles['modal-content']}`}
            >
                <div className={styles['buttons']}>
                    <div className={`${styles['modal-button']} ${styles['button-primary']}`}>
                        PLAYER vs PLAYER
                    </div>
                    <div className={`${styles['modal-button']} ${styles['button-secondary']}`}>
                        PLAYER vs CPU (coming soon)
                    </div>
                    <div 
                        className={`${styles['modal-button']} ${styles['button-white']}`}
                        onClick={()=>setVisible(false)}
                    >
                        CLOSE
                    </div>
                </div>
            </div>
        </div>
    )
}