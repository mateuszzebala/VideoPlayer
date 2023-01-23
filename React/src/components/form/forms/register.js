import Form from "../form";
import {API} from "../../../api";
import Input from "../../input/input";
import {useState} from "react";
import Button from "../../button/button";
import './forms.css'
import Link from "../../link/link";
import {LINKS} from "../../../router";
import Text from "../../text/text";
import Padding from "../../layout/Padding";


function RegisterForm(props){
    const [username, setUsername] = useState("")
    const [firstName, setFirstname] = useState("")
    const [lastName, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")

    return (
        <Form action={API.REGISTER} className={"forms"}>
            <Padding px={20}><Text font={6} fontWeight={700}>REGISTER</Text></Padding>
            <Input name={"username"} value={username} setValue={setUsername} label={"Username"}/>
            <Input name={"firstname"} value={firstName} setValue={setFirstname} label={"First Name"}/>
            <Input name={"lastname"} value={lastName} setValue={setLastname} label={"Last Name"}/>
            <Input name={"email"} value={email} setValue={setEmail} label={"E-mail"}/>
            <Input name={"password1"} value={password1} setValue={setPassword1} label={"Password"} type={"password"}/>
            <Input name={"password2"} value={password2} setValue={setPassword2} label={"Password Again"} type={"password"}/>
            <Button type={"submit"}>REGISTER</Button>
            <Link to={LINKS.LOGIN} line={true}>LOG IN</Link>
        </Form>
    )
}
export default RegisterForm