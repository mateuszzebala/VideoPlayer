import './select.css'
import {useRef, useState} from "react";


function Select(props){
    let [value, setValue] = useState("")
    const inputRef = useRef()
    const dropdownRef = useRef()


    function handleInputChange(e){
        setValue(e.target.value)
    }

    const closeDropdown = () => {
      dropdownRef.current.classList.remove('open');
    }

    const openDropdown = () => {
      dropdownRef.current.classList.add('open');
    }

    return (
        <div className={"select-component"}>
            <input
                className={props.name}
                onChange={handleInputChange}
                type="text"
                value={value}
                ref={inputRef}
                placeholder="Type to filter"
            />
            <ul className="options-list" ref={dropdownRef}>
                {props.options ? Object.keys(props.options).map(key=>{
                    return <li>{props.options[key]}</li>
                }) : ""}
            </ul>
        </div>
    )
}


export default Select