import './layout.css'
function Padding (props){
    return (
        <div
            className='padding-component'
            style={{
               padding: props.px.constructor.name === 'Array' ? `${props.px[0]}px ${props.px[1]}px ${props.px[2]}px ${props.px[3]}px` : props.px + "px" ,

            }}
        >
            {props.children}
        </div>
    )
}

export default Padding