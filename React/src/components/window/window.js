import './window.css'
import {useEffect, useRef} from "react";
import {ICONS} from "../../icons";

function Window(props){
    const rootRef = useRef()
    function exit(){
        props.setShow(false)
    }
    useEffect(()=>{
        if(props.show){
            document.body.style.overflow = "hidden"
        }
        else{
            document.body.style.overflow = "auto"
        }
    }, [props.show])
    if(props.show) {
        return (
            <div className={"window-component"} ref={rootRef}>
                <button className="xmark" onClick={exit}>
                    {ICONS.XMARK}
                </button>
                <div className="window">
                    {props.children}
                </div>
            </div>
        )
    }
    else{
        return <></>
    }
}

export default Window