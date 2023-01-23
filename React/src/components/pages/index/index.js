import './index.css'
import {useEffect, useState} from "react";
import {$POST} from "../../../utils";
import {API} from "../../../api";
import VideoImage from "../../bricks/videoimage/videoimage";

function IndexPage(props){
    const [videos, setVideos] = useState({})

    useEffect(()=>{
        $POST(API.BEST, {}, {}, {"n":16}).then(res => {
            setVideos(res.data.videos)

        })
    }, [])

    return (
        <div className={"index-page"}>
            {videos ? Object.keys(videos).map(key => {
                return <VideoImage key={key} video={videos[key]}/>
            }) : ""}
        </div>
    )
}

export default IndexPage