import './contextmenu.css'
import {useEffect, useState} from "react";


function ContextMenu(props){
    const [show, setShow] = useState(false)
    const [top, setTop] = useState(0)
    const [left, setLeft] = useState(0)



    useEffect(()=>{
        document.addEventListener("click", ()=>{setShow(false)})
        document.addEventListener("contextmenu", (e)=>{
            let parent = e.target.parentElement
            let contains = false
            while(parent){
                if(parent.classList.contains('contextmenu-component')){
                    contains = true
                }
                parent = parent.parentElement
            }
            if(!contains) setShow(false)

        })
    }, [])

    function handleContextMenu(e){
        e.preventDefault()
        setShow(true)
        setTop(e.pageY)
        setLeft(e.pageX)
    }

    function handleOptionClick(e){
        setShow(false)
        const fnc = props.options[e.target.getAttribute('index')][1]
        fnc(e)
    }

    return (
        <div className={"contextmenu-component"} onContextMenu={handleContextMenu}>
            {props.children}
            {show ? <>
                <div className="contextmenu" style={{"--top":top + "px", "--left":left + "px"}}>
                    {Object.keys(props.options).map(key=>{
                        return <button key={key} index={key} onClick={handleOptionClick}>{props.options[key][2] ? props.options[key][2] : ""} {props.options[key][0]}</button>
                    })}
                </div>
            </> : ""}
        </div>
    )
}

export default ContextMenu