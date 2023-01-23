import './image.css'
import {useState} from "react";
import Window from "../components/window/window";

function Image(props) {
    const [showWindow, setShowWindow] = useState(false)
    return (
        <>
            <img style={{
                width: props.size
            }} src={props.src} alt={props.alt ? props.alt : props.src} onClick={() => {
                if (props.window == true) {
                    setShowWindow(true)
                }
            }
            }/>
            <Window show={showWindow} setShow={setShowWindow}>
                <img style={{height: "100%"}} src={props.src} alt={props.alt ? props.alt : props.src}/>
            </Window>

        </>
    )
}

export default Image