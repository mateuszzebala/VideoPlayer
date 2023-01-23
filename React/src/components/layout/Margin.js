import './layout.css'
function Margin (props){
    return (
        <div
            className='margin-component'
            style={{
               margin: props.px + "px"
            }}
        >
            {props.children}
        </div>
    )
}

export default Margin