import './link.css'
import {COLORS} from "../../constants";
import {Link as RouterLink} from 'react-router-dom'

function Link(props){

    return (
        <RouterLink
            className={"link-component"}
            to={props.to}
            style={{
                "--font-color": props.fontColor ? props.fontColor : COLORS.link.font,
                "--line-color": props.lineColor ? props.lineColor : COLORS.link.line,
                "--line": props.line ? "100%" : 0,
                "--hover-font": props.hoverFont ? props.hoverFont : COLORS.link.hoverFont
            }}
        >{props.children}</RouterLink>
    )

}


export default Link