import './search.css'
import {useParams} from "react-router-dom";
import Text from "../../text/text";
import {useEffect, useState} from "react";
import {$POST} from "../../../utils";
import {API} from "../../../api";
import VideoImage from "../../bricks/videoimage/videoimage";
import Padding from "../../layout/Padding";
import Grid from "../../layout/Grid";

function SearchPage(props) {
    let {string} = useParams()
    const [videos, setVideos] = useState([])

    useEffect(() => {
        $POST(API.SEARCH + string).then(res=>{
            setVideos(res.data)
        })
    }, [string])

    return (
        <>
            <Padding px={[20, 20, 0, 20]}><Text>Results for: {string}</Text></Padding>
            <Grid columns={"10"} gap={10} padding={20}>
                {Object.keys(videos).map(key => {
                    return <VideoImage key={key} video={videos[key]}/>
                })}
            </Grid>
        </>
    )
}

export default SearchPage