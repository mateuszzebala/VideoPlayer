import './text.css'

import {COLORS, SIZES} from "../../constants";

function Text(props){

    return (
        <span
            className={"text-component " + ( props.className ? props.className : "")}
            style={{
                "--font-size": SIZES[parseInt(props.font ? props.font : 3)] + "px",
                color: COLORS.text.font,
                fontWeight: props.fontWeight ? props.fontWeight : "",
                whiteSpace: props.whiteSpace ? props.whiteSpace : "normal"
            }}
        >{props.children}</span>
    )
}

export default Text