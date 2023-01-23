import './videoimage.css'
import {API} from "../../../api";
import {LINKS} from "../../../router";
import Link from "../../link/link";
import Text from "../../text/text";
import {ICONS} from "../../../icons";

function VideoImage(props) {
    return (
        <div className={"videoimage-component"}>
            <div className="image" style={{
                "--bg-image": `url(${props.video ? API.IMAGE + props.video.main_image : ""})`
            }}>
                <Link to={LINKS.VIDEO + props.video.id}>
                    <button>{ICONS.PLAY}</button>
                </Link>

            </div>
            <Text>{props.video.title}</Text>
        </div>
    )
}

export default VideoImage