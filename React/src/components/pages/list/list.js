import './list.css'
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {$POST} from "../../../utils";
import VideoImage from "../../bricks/videoimage/videoimage";
import Switcher from "../../switcher/switcher";

function ListPage(props) {
    let {id} = useParams()
    const [videos, setVideos] = useState({})
    const [page, setPage] = useState(1)
    const [meta, setMeta] = useState({})

    useEffect(() => {
        $POST(props.link + id + "?n=16&p=" + page).then(res => {
            setVideos(res.data.videos)
            setMeta(res.data.meta)
        })
    }, [])

    return (
        <div className={"list-page"}>
            <div className="grid">
                {videos ? Object.keys(videos).map(key => {
                    return <VideoImage key={key} video={videos[key]}/>
                }) : ""}
            </div>
            <Switcher value={page} setValue={setPage}/>
        </div>
    )
}

export default ListPage