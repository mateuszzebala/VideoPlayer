import './checkbox.css'
import {useRef} from "react";
import {COLORS} from "../../../constants";

function Checkbox(props){

    const inputRef = useRef()
    return (
        <div className={"checkbox-component"} style={{
            "--dot-color": COLORS.checkbox.dot,
            "--on-color": COLORS.checkbox.on,
            "--off-color": COLORS.checkbox.off,
            "--font-color": COLORS.checkbox.off,
        }}>
            <span className={"label"}>{props.label}</span>
            <label className="switch" onClick={e=>{props.setValue(inputRef.current.checked)}}>
                <input name={props.name} type="checkbox" checked={props.value} value={props.value} ref={inputRef} onChange={e=>{props.setValue(inputRef.current.checked)}}/>
                <span className="slider round"></span>
            </label>
        </div>
    )
}

export default Checkbox