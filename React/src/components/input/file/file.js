import {useEffect, useRef, useState} from "react";
import Button from "../../button/button";
import Text from "../../text/text";
import Column from "../../layout/Column";
import Row from "../../layout/Row";
import './file.css'


function FileInput(props){
    let [length, setLength] = useState(0)
    const inputRef = useRef()
    const tempInputRef = useRef()
    const rootRef = useRef()

    useEffect(()=>{
        setLength(props.value.files.length)
        inputRef.current.files = props.value.files
    }, [props.value])

    function clickTempInput(event){
        tempInputRef.current.click()
    }
    function handleChangeTemp(event){
        let dt = props.value
        let files = tempInputRef.current.files
        for (let i = 0; i < files.length; i++) {
            dt.items.add(files[i])
        }
        setLength(dt.files.length)
        props.setValue(dt)
        inputRef.current.files = props.value.files

    }
    function clearInput(){
        props.setValue(new DataTransfer())
        setLength(0)

    }

    function drag(){

    }
    function drop(e){
        e.preventDefault()
        rootRef.current.style.boxShadow = "none"
        alert()
    }

    function dragMouseOn(){
        rootRef.current.style.backgroundColor = "rgba(0, 0, 0, 0.1)"
    }
    function dragMouseOff(){
        rootRef.current.style.backgroundColor = "transparent"
    }

    return (

            <div
                className='file-input-component'
                ref={rootRef}
                onDrop={drop}
                onDragEnter={dragMouseOn}
                onDragLeave={dragMouseOff}
                onDragOver={dragMouseOn}
            >
                <Column>
                    <Text font="2" fontWeight="100">{props.text}</Text>
                    <Row>
                        <input
                            type="file"
                            name={props.name}
                            ref={inputRef}
                            multiple="multiple"
                            style={{
                                display: 'none',
                            }}
                        />
                        <input
                            type="file"
                            onChange={handleChangeTemp}
                            ref={tempInputRef}
                            multiple="multiple"
                            style={{
                                display: 'none',
                            }}
                        />
                        <Button
                            onClick={clickTempInput}
                        >{ICONS.PLUS}</Button>
                        <Text font={2} fontWeight="100">{length} FILES</Text>
                        <Button
                            onClick={clearInput}
                        >{ICONS.TRASH}</Button>
                    </Row>
                </Column>
            </div>

    )
}


export default FileInput