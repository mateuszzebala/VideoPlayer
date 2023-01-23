import './layout.css'
function Row (props){
    return (
        <div
            className='row-component'
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: props.gap + "px"
            }}
        >
            {props.children}
        </div>
    )
}

export default Row