const ff = document.querySelectorAll('a.ff')
const tail_info = document.createElement('div')
tail_info.classList.add('tail_info')
document.body.appendChild(tail_info)

ff.forEach(elem => {
    elem.addEventListener("mousemove", (e)=>{
        tail_info.innerHTML=elem.querySelector('span.filename').innerHTML
        tail_info.style.display = "inline-block"
        tail_info.style.left = (e.clientX + 20) + "px"
        tail_info.style.top = (e.clientY + document.body.scrollTop) + "px"
    })
    elem.addEventListener("mouseleave", (e)=>{
        tail_info.style.display = "none"
    })
})

ff.forEach(elem => {
    const i = elem.querySelector('i')

    if(i.classList.contains('icon-dir')){
        i.classList.add('fa-solid')
        i.classList.add('fa-folder')
    }
    if(i.classList.contains('icon-file')){
        i.classList.add('fa-solid')
        i.classList.add('fa-file')
    }
    if(i.classList.contains('icon-music')){
        i.classList.add('fa-solid')
        i.classList.add('fa-music')
    }
    if(i.classList.contains('icon-image')){
        i.classList.add('fa-solid')
        i.classList.add('fa-image')
    }
    if(i.classList.contains('icon-video')){
        i.classList.add('fa-solid')
        i.classList.add('fa-video')
    }
    if(i.classList.contains('icon-code')){
        i.classList.add('fa-solid')
        i.classList.add('fa-code')
    }
    if(i.classList.contains('icon-run')){
        i.classList.add('fa-solid')
        i.classList.add('fa-person-running')
    }
    if(i.classList.contains('icon-database')){
        i.classList.add('fa-solid')
        i.classList.add('fa-database')
    }
})


const window_form = document.createElement("form")
window_form.setAttribute("enctype", 'multipart/form-data')
window_form.method = "POST"
window_form.classList.add("window_form")
let new_window = null

const topbar_btns = document.querySelectorAll('.editor-tools button')
topbar_btns.forEach(btn => {
    btn.addEventListener("click", e => {
        if(new_window !== null)
            new_window.remove()
        new_window = window_form.cloneNode()
        const input_type = btn.getAttribute("input-type")
        new_window.innerHTML = btn.innerHTML
        const input = document.createElement('input')
        input.type = input_type

        input.name = btn.getAttribute("name")
        if (btn.getAttribute("args") !== null)
        btn.getAttribute('args').split(";").forEach(arg=>{
            input.setAttribute(arg, "")
        })
        new_window.appendChild(input)
        const button = document.createElement("button")
        button.type = "submit"
        button.innerHTML = "<i class=\"fa-solid fa-paper-plane\"></i>"
        new_window.appendChild(button)
        const exit_btn = document.createElement('button')
        exit_btn.setAttribute("type", "button")
        exit_btn.innerHTML = "<i class=\"fa-solid fa-xmark\"></i>"
        exit_btn.classList.add("x-btn")

        new_window.appendChild(exit_btn)
        new_window.innerHTML += `<input type="hidden" name="csrfmiddlewaretoken" value="${csrf_token}">`
        document.body.appendChild(new_window)
        document.querySelector('.window_form i.fa-xmark').addEventListener("click", (e)=>{
            new_window.remove()
        })
    })
})



