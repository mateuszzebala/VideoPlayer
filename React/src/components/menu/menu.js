import './menu.css'
import Icon from "../icon/icon";
import {COLORS} from "../../constants";
import Burger from "../button/burger/burger";
import {useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import {LINKS} from "../../router";
import Link from "../link/link";
import Text from "../text/text";

import Input from "../input/input";
import Button from "../button/button";
import {ICONS} from "../../icons";

function Menu(props){
    const [open, setOpen] = useState(false)
    const [searchInputValue, setSearchInputValue] = useState("")


    const navigate = useNavigate();
    function search(){
        if(searchInputValue !== ''){
            navigate(LINKS.SEARCH + searchInputValue)
        }
        else{
            navigate(LINKS.INDEX)
        }
    }

    return (
        <nav className={"menu-component"} style={{
            "--bg-color": COLORS.menu.bg,
        }}>
           <div className={"top"}>
                <Burger value={open} setValue={setOpen}/>

               <Link to={LINKS.INDEX}><div className="icon" onClick={()=>{setOpen(false)}}><Icon size={5}/> <Text>WATCHSERIES</Text></div></Link>
                <form className="search" onSubmit={(e)=>{
                    e.preventDefault()
                    search()
                }}>
                    <Input borderColor={"transparent"} value={searchInputValue} setValue={setSearchInputValue}/>
                    <Button type={"submit"} onClick={search} borderColor={"transparent"}>{ICONS.MAGNIFYING_GlASS}</Button>
                </form>
                <div className={"links"}>

                    <Link to={LINKS.LOGIN}><button onClick={()=>{setOpen(false)}}>LOGIN</button></Link>
                    <Link to={LINKS.REGISTER}><button onClick={()=>{setOpen(false)}}>REGISTER</button></Link>
                </div>
           </div>
            <div className="dropdown" style={{
                maxHeight: open ? "300px" : "0px"
            }}>

            </div>

        </nav>
    )
}

export default Menu