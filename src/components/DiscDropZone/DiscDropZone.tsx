import { useGameContext } from "../../context/GameContext"
import styles from './DiscDropZone.module.css'
import ColoredDisc from "../ColoredDisc/ColoredDisc"
import { COLOR_DICT } from "../../theme/theme"

type Props = {
    animate:boolean
    resolveAnimation: (column:number) => void
    selectedColumn:number
    [rest:string]:any
}

export default function DiscDropZone(props:Props) {
    const {selectedColumn, animate, resolveAnimation, ...rest} = props
    const {board, currentPlayer} = useGameContext()

    return (
        <div 
            {...rest}
            style ={{
                display:'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                paddingLeft:'2%',
                paddingRight:'2%',
                width:'100%',
                transform:'translateY(50%)',
            }}
        >
            {
                board.map((_, index) => {
                    return (
                        <div 
                            // id={'drop-disc-' + index} 
                            style={{
                                visibility: (selectedColumn === index) ? 'visible':'hidden',
                            }}
                        >
                            <div 
                                className={`
                                    ${styles['dropping-disc']} 
                                    ${(animate && selectedColumn === index) 
                                        && styles['start-drop-animation']}
                                `}
                                onAnimationEnd={()=>resolveAnimation(index)}
                            >
                                <ColoredDisc color={COLOR_DICT[currentPlayer]} size={100}/>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}