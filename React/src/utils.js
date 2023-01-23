import axios from "axios";
import {API_URL, API} from "./api";

async function $POST(url, data={}, dt=null, args={}){
    let get_arguments = "?"
    Object.keys(args).map(key=>{
        get_arguments += `${key}=${args[key]}&`
    })
    if(get_arguments.at(-1) === "&"){
        get_arguments = get_arguments.slice(0, -1)
    }
    return await axios.post(url + (get_arguments !== "?" ? get_arguments : ""), data, {
        headers: {
            "Content-Type": "multipart/form-data",
            'X-Csrftoken': await $csrf(),
        },
        withCredentials: true,
        dataTransfer: dt !== null ? dt : "",

    })
}

let _csrfToken = null;
async function $csrf() {
    const response = await axios.post(API.CSRF, {}, {
      withCredentials: true,
      responseType: 'json',
    });
    const data = await response.data;
    _csrfToken = data.token;

  return _csrfToken;
}

async function $me() {
  const response = await $POST(API.ME);
  return response.data;
}

async function $AmILoggedIn(){
    let ret
   await $POST(API.ME).then(res=>{
        ret = res.data.login === true
    })
    return ret

}

export {$POST, $csrf, $me, $AmILoggedIn}


