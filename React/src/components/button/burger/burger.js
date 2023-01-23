
import './burger.css'
import {useRef} from "react";
import {COLORS} from "../../../constants";

//
// Component gets value and setValue props, it should be state
//


function Burger(props){



    function on_click(e){
        props.setValue(!props.value)
        if(props.onClick) props.onClick()
    }

    return (
        <button className={"burger"} onClick={on_click} style={{
            "--span-color": COLORS.burger.span,
            "--bg-color": COLORS.burger.bg,
        }}>
            <span></span>
            <span></span>
            <span></span>
        </button>
    )
}


export default Burger