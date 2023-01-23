import './video.css'
import {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import Settings from "./settings/settings";
import {COLORS} from "../../constants";
import Contextmenu from "../contextmenu/contextmenu";
import {ICONS} from "../../icons";
import Text from "../text/text";
import Loading from "../animations/loading/loading";

// props: src, font, bg, settingsFont, settingsBg, progress

let hide_timer
let icon_timer

function Video(props) {
    const videoRef = useRef()
    const rangeRef = useRef()
    const rootRef = useRef()
    const centerButtonRef = useRef()
    const toolsRef = useRef()
    const [toolsShow, setToolsShow] = useState(true)
    const [play, setPlay] = useState(true)
    const [time, setTime] = useState(0)
    const [mute, setMute] = useState(false)
    const [subtitles, setSubtitles] = useState(false)
    const [settingsOn, setSettingsOn] = useState(false)
    const [duration, setDuration] = useState(0)
    const [timeString, setTimeString] = useState("0:00 / 0:00")
    const [fullscreen, setFullscreen] = useState(false)
    const [actionIcon, setActionIcon] = useState("")
    const [subtitlesLang, setSubtitlesLang] = useState("")
    const [loading, setLoading] = useState(true)

    const actionIconRef = useRef()

    useEffect(()=>{
        setDuration(0)
        setPlay(true)
        setTime(0)
        setToolsShow(true)
    }, [props.src])

    useEffect(() => {
        actionIconRef.current.classList.remove("action-icon-anim")
        void actionIconRef.current.offsetWidth;
        actionIconRef.current.classList.add("action-icon-anim")
        clearTimeout(icon_timer)
        icon_timer = setTimeout(()=>{
            setActionIcon("")
        }, 400)


    }, [actionIcon])

    useEffect(() => {
        document.addEventListener("fullscreenchange", () => {
            if (document.fullscreenElement !== null) {
                setFullscreen(true)
            } else {
                setFullscreen(false)
            }
        })
    }, [])


    function playPause(e) {
        e.preventDefault()
        if (play) {
            videoRef.current.pause();
            setActionIcon(ICONS.PLAY)

        } else {
            videoRef.current.play();
            setActionIcon(ICONS.PAUSE)
        }
        setPlay(!play)
    }

    function toggleFullscreen() {
        videoRef.current.controls = false
        if (fullscreen) {
            document.exitFullscreen()
            setActionIcon(ICONS.EXPAND)
        } else {
            rootRef.current.requestFullscreen()
            setActionIcon(ICONS.COMPRESS)

        }
        setFullscreen(!fullscreen)
    }

    function toggleSettingsOn() {
        setSettingsOn(!settingsOn)
        setActionIcon(ICONS.GEAR)
    }


    useEffect(() => {
        let seconds = time
        let minutes = 0
        let duration_m = 0
        let duration_s = duration
        while (seconds >= 60) {
            minutes += 1
            seconds -= 60
        }
        while (duration_s >= 60) {
            duration_m += 1
            duration_s -= 60
        }
        seconds = Math.floor(seconds)
        if (seconds < 10) {
            seconds = `0${seconds}`
        }
        if (duration_s < 10) {
            duration_s = `0${duration_s}`
        }
        setTimeString(`${minutes}:${seconds} / ${duration_m}:${duration_s}`)
    }, [time])

    function toggleMute() {
        if (mute) {
            videoRef.current.muted = false
            setActionIcon(ICONS.VOLUME.HIGH)
        } else {
            videoRef.current.muted = true
            setActionIcon(ICONS.VOLUME.XMARK)
        }
        setMute(!mute)
    }

    function toggleSubtitles() {
        setActionIcon(!subtitles ? ICONS.CAPTIONING.ON:ICONS.CAPTIONING.OFF)
        setSubtitles(!subtitles)

    }

    function timeUpdate() {
        setTime(videoRef.current.currentTime)
    }

    function handleRangeClick(evt) {
        let range_x, bcr, mouse_x, mod, per
        if (!fullscreen) {
            bcr = rangeRef.current.getBoundingClientRect()
            range_x = bcr.x
            mouse_x = evt.clientX
            mod = mouse_x - range_x
            per = mod / bcr.width
        } else {
            mod = evt.clientX
            per = mod / rootRef.current.getBoundingClientRect().width

        }
        setTime(duration * per)
        videoRef.current.currentTime = duration * per

    }

    function hideTools() {
        if (!settingsOn && play) {
            setToolsShow(false)
        }
    }

    function showTools() {
        setToolsShow(true)
    }

    function handleMouseMove() {
        clearTimeout(hide_timer)
        showTools()
        hide_timer = setTimeout(function () {
            hideTools()
        }, 5000);
    }

    function MoveLeft(s) {

        if (time < s) {
            setTime(0)
            videoRef.current.currentTime = time - s
        } else {
            videoRef.current.currentTime = time - s
            setTime(time - s)
        }
        setActionIcon(ICONS.ARROW.LEFT)
    }

    function MoveRight(s) {
        if (time < duration - s) {
            setTime(time + s)
            videoRef.current.currentTime = time + s
        } else {
            setTime(duration)
            videoRef.current.currentTime = duration
        }
        setActionIcon(ICONS.ARROW.RIGHT)
    }

    function keyDown(e){
        if(e.code === 'Space'){
            e.preventDefault()
        }
    }

    function keyUp(e) {
        if (e.code === 'Space') {
            e.preventDefault()
            playPause(e)
        } else if (e.code === 'KeyM') {
            e.preventDefault()
            toggleMute()
        } else if (e.code === 'KeyF') {
            e.preventDefault()
            toggleFullscreen()
        } else if (e.code === 'KeyS') {
            e.preventDefault()
            toggleSettingsOn()
        } else if (e.code === 'KeyC') {
            e.preventDefault()
            toggleSubtitles()
        } else if (e.code === 'ArrowLeft') {
            e.preventDefault()
            MoveLeft(10)
        } else if (e.code === 'ArrowRight') {
            e.preventDefault()
            MoveRight(10)
        }
    }

    return (
        <Contextmenu
            options={[
                [play ? 'Pause' : 'Play', playPause, play ? ICONS.PAUSE : ICONS.PLAY],
                [mute ? 'Unmute' : 'Mute', toggleMute, !mute ? ICONS.VOLUME.HIGH : ICONS.VOLUME.XMARK],
                ['Settings', toggleSettingsOn, ICONS.GEAR],
                ['Fullscreen', toggleFullscreen, fullscreen ? ICONS.COMPRESS:ICONS.EXPAND],
                ['Subtitles', toggleSubtitles, subtitles ? ICONS.CAPTIONING.ON : ICONS.CAPTIONING.OFF],
                ['10s', () => {MoveLeft(10)}, ICONS.ARROW.LEFT],
                ['10s', () => {MoveRight(10)}, ICONS.ARROW.RIGHT],
            ]}
        >
            <div style={{
                "--font-color": props.font ? props.font : COLORS.video.font,
                "--bg-color": props.bg ? props.bg : COLORS.video.bg,
                "--progress-color": props.progress ? props.progress : COLORS.video.progress,
                "--settings-font": props.settingsFont ? props.settingsFont : COLORS.video.settings.font,
                "--settings-bg": props.settingsBg ? props.settingsBg : COLORS.video.settings.bg,
                cursor: !toolsShow ? "none" : "auto"
            }}

                 onMouseMove={handleMouseMove}
                 className={"video-component"}
                 ref={rootRef}
                 onMouseLeave={hideTools}
                 onMouseEnter={showTools}
            >

                <video
                    resolution={"480"}
                    onClick={playPause}
                    autoPlay={true}
                    onPlay={()=>{setPlay(true)}}
                    onPause={()=>{setPlay(false)}}
                    onLoadStart={()=>{setLoading(true)}}
                    onKeyUp={keyUp}
                    onKeyDown={keyDown}
                    onLoadedMetadata={() => {
                        setDuration(Math.floor(videoRef.current.duration))
                        setLoading(false)
                    }}
                    onTimeUpdate={timeUpdate}
                    onEnded={() => {
                        setPlay(false)
                    }}
                    src={props.src ? props.src : ""}
                    ref={videoRef}
                ></video>
                <div className={"center action-icon"} onClick={playPause} ref={actionIconRef}>
                    {actionIcon !== "" ? actionIcon : ""}
                </div>
                <div className={"center"} onClick={playPause}>
                    {loading ? <Loading/> : ""}
                </div>
                <div className="subtitle" style={{
                    "--bottom": toolsShow ? "100px" : "10px"
                }}>
                    {subtitles ? props.subtitle : ""} {subtitlesLang}
                </div>
                <Settings
                    on={settingsOn}
                    videoRef={videoRef}
                    subtitlesOptions={[{id:0, name:"Polish"}, {id:1, name:"English"}]}
                    setSubtitles={setSubtitlesLang}
                />
                <div onMouseMove={() => {
                    clearTimeout(hide_timer)
                }} className={fullscreen ? "tools-bottom fullscreen" : "tools-bottom"} ref={toolsRef} style={{
                    transform: !toolsShow ? "translate(0, 110%)" : "translate(0, 0)",

                }}>
                    <div ref={rangeRef} onClick={handleRangeClick} className={"range"} style={{
                        "--bar-width": time / duration * 100 + "%"
                    }}>
                        <div className={"bar"}></div>
                        <div className="circle"></div>
                    </div>
                    <div className={"buttons"}>
                        <div>
                            <button onClick={playPause}>{
                                !play ? ICONS.PLAY : ICONS.PAUSE
                            }</button>
                            <button>{ICONS.FORWARD}</button>
                            <button onClick={toggleMute}>{!mute ? ICONS.VOLUME.HIGH : ICONS.VOLUME.XMARK}</button>
                            <Text whiteSpace={"nowrap"}>{timeString}</Text>
                        </div>
                        <div>

                            <Link download to={props.src} target={"_blank"}>
                                <button>{ICONS.DOWNLOAD}</button>
                            </Link>
                            <button onClick={toggleSubtitles}>{subtitles ? ICONS.CAPTIONING.ON : ICONS.CAPTIONING.OFF}</button>
                            <button onClick={toggleSettingsOn}>{ICONS.GEAR}</button>
                            <button onClick={toggleFullscreen}>{fullscreen ? ICONS.COMPRESS : ICONS.EXPAND}</button>
                        </div>
                    </div>

                </div>
            </div>
        </Contextmenu>

    )
}

export default Video