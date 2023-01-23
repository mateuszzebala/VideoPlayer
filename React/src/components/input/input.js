import './input.css'
import {useEffect, useRef, useState} from "react";
import {COLORS} from "../../constants";
import Text from "../text/text";
import {ICONS} from "../../icons";

//
// Component gets props:
// - bgColor
// - fontColor
// - borderColor
// - value
// - setValue
// # value and setValue should be state and setState
//
// Component is used to input data from keyboard (only text)
//


function Input(props) {
    let [type, setType] = useState(props.type ? props.type : "text")
    let [focus, setFocus] = useState(false)

    const inputRef = useRef()


    useEffect(() => {
        if (props.value !== '' && props.value !== null) {
            setFocus(true)
        } else if (inputRef.current !== document.activeElement) {
            setFocus(false)
        }
    }, [props.value])


    function handleChange(event) {
        if (props.setValue) props.setValue(event.target.value)

        if (props.onChange) props.onChange(event)


    }

    function handleBlur() {
        if ((props.value === "" || props.value == null) && inputRef.current.value === "") {
            setFocus(false)
        }
    }

    function focusInput() {
        inputRef.current.focus()
    }

    function handleFocus() {
        setFocus(true)
    }


    function handlePlaceHolderClick() {
        focusInput()
    }

    function handleEyeClick() {
        if (type === "password") {
            setType("text")
        } else {
            setType("password")
        }
    }


    return (
        <div
            className='input-component'
            onClick={focusInput}
            style={{
                "--border-color": props.borderColor ? props.borderColor : COLORS.input.border,
                "--bg-color": props.bgColor ? props.bgColor : COLORS.input.bg,
                "--font-color": props.fontColor ? props.fontColor : COLORS.input.font,
                "--label-color": props.labelColor ? props.labelColor : COLORS.input.label_font,
            }}
        >
            <input
                type={type}
                name={props.name ? props.name : props.label}
                value={props.value}
                ref={inputRef}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                autoComplete={"off"}
            />
            <label
                className={focus || props.animation === false ? "placeholder focus" : "placeholder"}
                onClick={handlePlaceHolderClick}
            >
                {props.label}
            </label>
            { props.type === "password" ?
                <button className={"eye"} onClick={handleEyeClick}>
                    {props.type === "password" ? (type === "password" ? ICONS.EYE : ICONS.EYE_SLASH) : ""}
                </button> : ""
            }
        </div>

    )

}


export default Input