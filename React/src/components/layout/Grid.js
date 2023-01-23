import './layout.css'
function Grid(props){
    return (
        <div
            className='grid-component'
            style={{
               display: "grid",
                gridTemplateColumns: `repeat(${props.columns}, 1fr)`,
                gap: props.gap,
                padding: props.padding
            }}
        >
            {props.children}
        </div>
    )
}

export default Grid