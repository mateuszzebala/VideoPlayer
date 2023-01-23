import {useState} from "react";
import {ICONS} from "../../../icons";

function SettingsElement(props){
    const [show, setShow] = useState(false)

    function toggleShow(){
        setShow(!show)
    }

    return (
        <>

                <button onClick={toggleShow}>{props.name}</button>
                <div className="settings-elem" style={{transform: show ? "translate(0, 0)" : "translate(100%, 0)"}}>
                    <div className="menu">
                        {props.children}
                    </div>
                    <button onClick={toggleShow} className={"exit"}>{ICONS.XMARK}</button>
                </div>
        </>
    )
}

export default SettingsElement