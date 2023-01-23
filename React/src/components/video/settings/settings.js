import SettingsElement from "./settings-element";

function Settings(props){

    function setSpeed(speed){
        props.videoRef.current.playbackRate = speed
    }

    function setSubtitles(i){
        props.setSubtitles(i)
    }

    return (
        <div className={"settings-video-component"} style={{transform: props.on ? "translate(-20px, 0)" : "translate(150%, 0)"}}>
            <SettingsElement name={"SPEED"}>
                <button onClick={()=>{setSpeed(0.25)}}>0.25</button>
                <button onClick={()=>{setSpeed(0.50)}}>0.50</button>
                <button onClick={()=>{setSpeed(0.75)}}>0.75</button>
                <button onClick={()=>{setSpeed(1)}}>NORMAL</button>
                <button onClick={()=>{setSpeed(1.25)}}>1.25</button>
                <button onClick={()=>{setSpeed(1.50)}}>1.50</button>
                <button onClick={()=>{setSpeed(1.75)}}>1.75</button>
                <button onClick={()=>{setSpeed(2)}}>2.00</button>
            </SettingsElement>
            <SettingsElement name={"QUALITY"}>
                <button>Auto</button>
                <button>1080p</button>
                <button>720p</button>
                <button>480p</button>
                <button>360p</button>
                <button>240p</button>
                <button>144p</button>
            </SettingsElement>
            <SettingsElement name={"SUBTITLES"}>
                {props.subtitlesOptions ? Object.keys(props.subtitlesOptions).map(key => {
                    return <button key={key} onClick={()=>{setSubtitles(props.subtitlesOptions[key].id)}}>
                        {props.subtitlesOptions[key].name}
                    </button>
                }) : ""}
            </SettingsElement>
        </div>
    )
}

export default Settings