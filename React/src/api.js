import {$POST} from "./utils";

const API_URL = "http://localhost:8000"
const API = {
    CSRF: API_URL + "/account/csrf/",
    ME: API_URL + "/account/me/",
    LOGIN: API_URL + '/account/login/',
    REGISTER: API_URL + '/account/register/',
    VIDEO: API_URL + '/video/',
    SEARCH: API_URL + '/search/',
    IMAGE: API_URL + '/image/',
    BEST: API_URL + '/best/',

    GENRE: API_URL + '/genre/',
    COUNTRY: API_URL + '/country/',
    PRODUCER: API_URL + '/producer/',
    ACTOR: API_URL + '/actor/',
    LIKE: API_URL + '/like/',
    DISLIKE: API_URL + '/dislike/',
}

const ACTIONS = {
    LIKE: (id)=>{
        $POST(API.LIKE + id)
    },
    DISLIKE: (id)=>{
        $POST(API.DISLIKE + id)
    },
}

export {API_URL, API}
