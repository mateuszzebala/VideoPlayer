import './loading.css'
import {COLORS} from "../../../constants";

function Loading(props){
    return (
        <div className={"loading-component"} style={{"--dot-color": props.color ? props.color : COLORS.loading}}>
            <div className="spin"></div>
        </div>
    )
}

export default Loading