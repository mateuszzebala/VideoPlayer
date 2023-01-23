import './switcher.css'
import {ICONS} from "../../icons";
import {COLORS} from "../../constants";

function Switcher(props){

    function left(){
        if (props.value >= 1){
            props.setValue(props.value - 1)
        }
    }

    function right(){
        if (props.value < props.options.length - 1){
            props.setValue(props.value + 1)
        }
    }

    return (
        <div style={{
            "--color": props.color ? props.color : COLORS.switcher
        }} className={"switcher-component"}>
            <button onClick={left}>{ICONS.ARROW.LEFT}</button>
            <span>{props.options ? props.options[props.value] : "---"}</span>
            <button onClick={right}>{ICONS.ARROW.RIGHT}</button>
        </div>
    )
}

export default Switcher