
if(getCookie('theme') === null){
    setCookie('theme', 1, 365)
}

class Config{
    theme = null
    theme_code = null
    themes = null
}

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/;SameSite=Lax";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
Config.themes = [{},
    {
        "--bg-color": 'white',
        "--font-color": '#1c1a1a',
        "--bg-special": '#7E4DFB',
        "--font-special": 'white',
        "--color-1": '#0efa79',
        "--color-2": '#fa0ea7',
        "--color-3": '#cffa0e',
    },
    {
        "--bg-color": "#453d5e",
        "--font-color": "#ffffff",
        "--bg-special": "#302749",
        "--font-special": 'white',
        "--color-1": '#0efa79',
        "--color-2": '#fa0ea7',
        "--color-3": '#cffa0e',
    },
    {
        "--bg-color": "#ffffff",
        "--font-color": "#252525",
        "--bg-special": "#3FA981",
        "--font-special": '#ffffff',
        "--color-1": '#000000',
        "--color-2": '#fa0ea7',
        "--color-3": '#cffa0e',
    },
    {
        "--bg-color": "#ffffff",
        "--font-color": "#000000",
        "--bg-special": "#e1e1e1",
        "--font-special": '#000000',
        "--color-1": '#0efa79',
        "--color-2": '#fa0ea7',
        "--color-3": '#cffa0e',
    },
]

Config.theme_code = getCookie('theme')
if (Config.theme_code.length <= 0 || Config.theme_code === null){
    Config.theme = change_theme(0)
    Config.theme_code = 0
}

Config.theme = change_theme(Config.theme_code)

const chartColors =  [
  'rgb(255, 99, 132, 0.9)',
  'rgb(54, 162, 235, 0.9)',
  'rgb(255, 205, 86, 0.9)',
  'rgb(117,255,86, 0.9)',
  'rgba(162,86,255,0.9)',
  'rgba(229,118,46,0.9)',
  'rgba(107,248,222,0.9)',
  'rgba(255,0,0,0.9)',
]

function change_theme(number){
    Config.theme = {}
    Config.theme_code = number
    for(const [variable, value] of Object.entries(Config.themes[number])){
        document.documentElement.style.setProperty(variable, value)
        Config.theme[variable] = value
    }
    setCookie('theme', number, 365)
}