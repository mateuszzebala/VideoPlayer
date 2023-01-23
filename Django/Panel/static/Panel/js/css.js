

// Burger menu script
const burgers = document.querySelectorAll('button.burger')
const left_panel = document.querySelector('aside.left-panel')

if(burgers !== null && left_panel !== null){
    burgers.forEach(burger => {
        burger.addEventListener("click", ()=>{
            let burger_on = left_panel.getBoundingClientRect().left > -10
            if(burger_on){
                left_panel.style.transform = "translate(-100%, 0)"
            }
            else{
                left_panel.style.transform = "translate(0, 0)"
            }
            burger_on = !burger_on
        })
    })
}

const pth_a = document.querySelectorAll('.path .pth a')

for (let i = 0; i < pth_a.length; i++){
    if(i + 1 < pth_a.length){
        pth_a[i].innerHTML = pth_a[i].innerHTML + '<i class="fa-solid fa-chevron-right next-path"></i>'
    }
}

function change_main_size(){
    const main = document.querySelector('main')
    const topbar  = document.querySelector('.topbar')
    const toppanel = document.querySelector('.top-panel')
    main.style.height = window.innerHeight - topbar.clientHeight - toppanel.clientHeight + "px"
}

window.addEventListener("resize", change_main_size)
window.addEventListener("load", change_main_size)
change_main_size()
const change_theme_btn = document.querySelector('.change-theme')


change_theme_btn.addEventListener("click", function (){
    let current_theme = Config.theme_code
    if(parseInt(current_theme) + 1 < Config.themes.length){
        current_theme ++
    }
    else{
        current_theme = 1
    }
    change_theme(current_theme)
    charts.forEach(chart.update())
})

