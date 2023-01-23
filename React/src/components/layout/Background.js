import './layout.css'
function Background(props){
    return (
        <div
            className='background-component'
            style={{
               background: props.color,
                display: "inline-block",
            }}
        >
            {props.children}
        </div>
    )
}

export default Background