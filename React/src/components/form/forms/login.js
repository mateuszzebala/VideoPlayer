import Form from "../form";
import {API} from "../../../api";
import Input from "../../input/input";
import {useEffect, useState} from "react";
import Button from "../../button/button";
import './forms.css'
import Link from "../../link/link";
import {LINKS} from "../../../router";
import Text from "../../text/text";
import Padding from "../../layout/Padding";

function LoginForm(props){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    function handleThan(res){
        console.log(res.data.message)
    }

    function handleCatch(res){
        console.log(res)
    }

    return (
        <Form action={API.LOGIN} className={"forms"} than={handleThan} catch={handleCatch}>
            <Padding px={20}><Text font={6} fontWeight={700}>LOGIN</Text></Padding>
            <Input name={"username"} value={username} setValue={setUsername} label={"Username"}/>
            <Input name={"password"} value={password} setValue={setPassword} label={"Password"} type={"password"}/>
            <Button type={"submit"}>LOG IN</Button>
            <Link to={LINKS.REGISTER} line={true}>REGISTER</Link>
        </Form>
    )
}
export default LoginForm