import logo from '../../img/logo.png'

function Icon(props){
    return (
        <img src={logo} alt={"logo"} width={props.size * 10} height={props.size * 10}/>
    )
}
export default Icon