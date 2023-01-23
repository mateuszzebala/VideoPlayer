



const topbar = document.querySelector('.topbar')

let topbar_height = 0;
const topbar_toggle = document.querySelector('.topbar_toggle')

if(topbar.getBoundingClientRect().height === 0){
    topbar_toggle.style.display = "none"
}

const toggle_topbar = ()=>{
    if(topbar.getBoundingClientRect().height > 20){
        topbar_height = topbar.getBoundingClientRect().height
        topbar.style.height = topbar_height
        topbar.style.height = "10px"
        topbar_toggle.style.transform = "rotate(-180deg)"
    }
    else{
        topbar.style.height = topbar_height + "px"
        topbar_toggle.style.transform = "rotate(0deg)"
    }
    setTimeout(change_main_size, 100)
}

if(topbar !== null && topbar_toggle !== null)
    topbar_toggle.addEventListener("click", toggle_topbar)




const confirm_window = document.createElement("div")
confirm_window.classList.add("confirm_window")

document.querySelectorAll('a.confirm-a').forEach(a=>{

    a.addEventListener("click", (e)=>{
        const cw = confirm_window.cloneNode()
        const i = document.createElement('i')
        i.classList.add("fa-solid")
        i.classList.add("fa-xmark")
        i.addEventListener("click", ()=>{
            cw.remove()
        })
        cw.appendChild(i)
        const link = document.createElement("a")
        link.addEventListener("click", ()=>{
            cw.remove()
        })
        link.href = e.target.href
        link.innerHTML = e.target.innerHTML
        cw.appendChild(link)
        document.body.appendChild(cw)
        e.preventDefault()
    })
})



function enableTab() {
    var textareas = document.querySelectorAll("textarea")
    textareas.forEach(textarea=>{
        textarea.onkeydown = function(e) {

            if (e.key === 'Tab') {
                e.preventDefault()
                var val = this.value,
                    start = this.selectionStart,
                    end = this.selectionEnd
                this.value = val.substring(0, start) + '\t' + val.substring(end)

                this.selectionStart = this.selectionEnd = start + 1

            }
        }
    })
}

enableTab()


window.addEventListener("keydown", (e)=>{
    if(e.ctrlKey && e.key == 's'){
        const btn_submit = document.querySelector("button.ctrls")
        console.log(btn_submit)
        if(btn_submit !== null){
            e.preventDefault()
            btn_submit.click()
        }
    }
})