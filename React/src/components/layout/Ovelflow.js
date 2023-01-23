import './layout.css'
function Overflow(props){
    return (
        <div
            className='overflow-component'
            style={{
               overflow: props.type ? props.type : "hidden",
                "--scrollbar-display": props.scroll ? "block" : "none",

            }}
        >
            {props.children}
        </div>
    )
}

export default Overflow