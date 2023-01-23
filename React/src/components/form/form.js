import './form.css'
import {useRef} from "react";
import {$POST} from "../../utils";
function Form(props){


    const formRef = useRef()
    function handleSubmit(e){
        e.preventDefault()
        const formData = new FormData(formRef.current)

        $POST(props.action, formData).then(res=>{
            let r = res
            if(props.than)props.than(r)
        }).catch((res)=>{
            if(props.catch)props.catch(res)
        })
    }

    return (
        <form
            className={props.className ? props.className + " form-component" : "form-component"}
            ref={formRef}
            encType={"multipart/from-data"}
            action={props.action}
            method={props.method ? props.method : "POST"}
            onSubmit={props.onSubmit ? props.onSubmit : handleSubmit}
        >
            {props.children}
        </form>

    )

}


export default Form