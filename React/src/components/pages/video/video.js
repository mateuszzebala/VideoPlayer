import './video.css'
import Video from "../../video/video";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {$POST} from "../../../utils";
import {API} from "../../../api";
import Text from "../../text/text";
import Image from "../../../image/image";
import Button from "../../button/button";
import Window from "../../window/window";
import Link from "../../link/link";
import {ICONS} from "../../../icons";
import Grid from "../../layout/Grid";
import Padding from "../../layout/Padding";
import Switcher from "../../switcher/switcher";
import {LINKS} from "../../../router";
import Loading from "../../animations/loading/loading";

function VideoPage(props) {
    let {id} = useParams();
    const [video, setVideo] = useState({})
    const [showTrailer, setShowTrailer] = useState(false)
    const [season, setSeason] = useState({})
    const [seasonNr, setSeasonNr] = useState(0)
    const [episode, setEpisode] = useState({})
    const [episodeNr, setEpisodeNr] = useState(0)
    const [url, setUrl] = useState("")
    const [subtitle, setSubtitle] = useState("Bunkrów nie ma, ale też jest zajebiście.")


    useEffect(() => {
        if (video.seasons !== undefined) {
            setSeason(video.seasons[seasonNr + 1])

        }
    }, [seasonNr])

    useEffect(() => {
        setUrl(episode.url)
    }, [episode])

    useEffect(() => {
        if (video.seasons !== undefined) {
            setSeason(video.seasons[seasonNr + 1])
        }

        if (video.series && video.seasons !== undefined) {
            if(season[episodeNr + 1] != undefined){
                setEpisode(season[episodeNr + 1])
            }
        }

    }, [video])

    useEffect(() => {
        $POST(API.VIDEO + id).then(res => {
            setVideo(res.data)
            if (!res.data.series) {
                setUrl(res.data.url)
            }
        })
    }, [id])

    if(video.title === undefined){
        return <Loading/>
    }

    return (
        <div className={"video-page"}>
            <div className="video">
                <Video src={url} subtitle={subtitle}/>
            </div>
            <Window show={showTrailer} setShow={setShowTrailer}>
                <iframe width="1000" height="555" src={video.youtube + "?controls=0"}
                        title={video.title} frameBorder="0"
                        allow=""
                        allowFullScreen></iframe>
            </Window>
            <div className="bottom-info">
                {video.main_image !== undefined ?
                    <Image src={API.IMAGE + video.main_image} size={150} window={true}/> : ""}
                <div className={"column"}>
                    <div className={"column"}>

                        <div className="buttons row">
                            <Button onClick={() => {
                                setShowTrailer(true)
                            }}>Trailer</Button>
                            <Button>{ICONS.LIKE} {video.like}</Button>
                            <Button>{ICONS.DISLIKE} {video.dislike}</Button>
                            <Button>{ICONS.BOOKMARK}</Button>
                        </div>
                        <div className={"column"}>
                            <Text font={5}>{video.series ? video.title + " - " + episode.title : video.title}</Text>
                        </div>
                    </div>
                    <Text font={2}>{video.description}</Text>
                    <div className={"row"}>
                        <div className={"column"}>
                            <Text className={"links"}
                                  font={2}><b>Countries:</b> {video.countries ? Object.keys(video.countries).map(
                                key => <Link line={true} to={LINKS.COUNTRY + key}
                                             key={key}>{video.countries[key]}</Link>
                            ) : ""}</Text>
                            <Text className={"links"}
                                  font={2}><b>Actors:</b> {video.actors ? Object.keys(video.actors).map(
                                key => <Link line={true} to={LINKS.ACTOR + key} key={key}>{video.actors[key]}</Link>
                            ) : ""}</Text>
                        </div>
                        <div className={"column"}>
                            <Text className={"links"}
                                  font={2}><b>Genres:</b> {video.genres ? Object.keys(video.genres).map(
                                key => <Link line={true} to={LINKS.GENRE + key} key={key}>{video.genres[key]}</Link>
                            ) : ""}</Text>
                            <Text className={"links"}
                                  font={2}><b>Producers:</b> {video.producers ? Object.keys(video.producers).map(
                                key => <Link line={true} to={LINKS.PRODUCER + key}
                                             key={key}>{video.producers[key]}</Link>
                            ) : ""}</Text>
                        </div>
                    </div>

                </div>

            </div>
            {
                video.series ?
                    <div className="season">
                        <Switcher value={seasonNr} setValue={setSeasonNr} options={
                            video.seasons ? Object.keys(video.seasons).map(key => {
                                return "Season " + parseInt(key)
                            }) : ""
                        }/>
                        <div className={"episodes"}>{Object.keys(season).map(key => {
                            return <Button onClick={() => {
                                setEpisode(season[key])
                                setEpisodeNr(key)
                            }} key={key}>{season[key].title}</Button>
                        })}</div>
                    </div>
                    : ""
            }
        </div>
    )
}

export default VideoPage