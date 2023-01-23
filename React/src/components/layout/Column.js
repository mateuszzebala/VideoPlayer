import './layout.css'
function Column (props){
    return (
        <div
            className='column-component'
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: props.gap + "px"
            }}
        >
            {props.children}
        </div>
    )
}

export default Column