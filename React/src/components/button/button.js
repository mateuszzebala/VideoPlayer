import './button.css'
import {COLORS} from "../../constants";

function Button(props){

    return (
        <div
            className={props.className ? props.className + ' button-component' : 'button-component'}
            style={{
                "--border-color": props.borderColor ? props.borderColor : COLORS.button.border,
                "--border-width": props.borderWidth ? props.borderWidth : 3+"px",
                "--bg-color": props.bgColor ? props.bgColor : COLORS.button.bg,
                "--font-color": props.fontColor ? props.fontColor : COLORS.button.font,
            }}
        >
            <button
                onClick={props.onClick}
                type= {props.type ? props.type : "button"}
            >
                {props.children}
            </button>
        </div>

    )

}


export default Button