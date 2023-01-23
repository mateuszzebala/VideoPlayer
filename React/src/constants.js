const special = "#fff"
const COLORS = {
    special: special,
    input: {
        border: special,
        font: "#fff",
        bg: "#212529",
        label_font: "#bbbbbb"
    },
    button: {
        border: special,
        font: "#fff",
        bg: "#212529"
    },
    link: {
        line: special,
        font: "#fff",
        hoverFont: "#000"
    },
    text:{
        font:"#fff"
    },
    select:{
        top:{
            border:special,
            font:"#000",
            bg:"#fff",
        },
        dropdown:{
            font:"#000",
            bg:"#fff",
            border:special,
            hover:{
                bg:"#00000033",
                font:"#000"
            }
        }
    },
    checkbox:{
        on: special,
        off: "#c0c0c0",
        dot: "#fff"
    },
    video:{
        progress: "#212529",
        font: "#fff",
        bg: "#000",
        settings:{
            bg:"#fff",
            font:"#000",
        }
    },
    loading: special,
    menu:{
        bg:'#0c0c0c',
        font:'#fff',
    },
    burger:{
        bg:"transparent",
        span:"#dedede",
    },
    switcher: "#fff"
};

const SIZES = [
    8,
    12,
    16,
    20,
    24,
    28,
    32,
    36,
    42,
    48,
    58,
];

export {COLORS, SIZES}