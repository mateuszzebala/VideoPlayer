document.addEventListener('keydown', e => {
  if (e.ctrlKey && e.key === 's') {

    e.preventDefault();

    document.querySelector("form button[type=submit]").click()
  }
  else if(e.ctrlKey && e.key === 'a'){
      e.preventDefault()
      document.querySelector("form textarea").select()
  }
})

const window_form = document.createElement("form")
window_form.method = "POST"
window_form.classList.add("window_form")
let new_window = null

const editor_file_buttons = document.querySelectorAll("div.editor-file-tools button")

editor_file_buttons.forEach(btn => {
    btn.addEventListener("click", e => {
        if(new_window !== null)
            new_window.remove()
        new_window = window_form.cloneNode()
        const input_type = btn.getAttribute("input-type")
        let input
        if(input_type === "a"){
            input = document.createElement('a')
            input.href = btn.getAttribute("href")
            input.innerHTML = btn.getAttribute("text")
            if(btn.getAttribute("download") == "true"){
                input.setAttribute("download", "true")
            }
            new_window.appendChild(input)
        }
        else{

            new_window.innerHTML = btn.innerHTML
            input = document.createElement('input')
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
        }


        const exit_btn = document.createElement('button')
        exit_btn.setAttribute("type", "button")
        exit_btn.innerHTML = "<i class=\"fa-solid fa-circle-xmark\"></i>"
        exit_btn.classList.add("x-btn")

        new_window.appendChild(exit_btn)
        new_window.innerHTML += `<input type="hidden" name="csrfmiddlewaretoken" value="${csrf_token}">`
        document.body.appendChild(new_window)
        document.querySelector('.window_form i.fa-circle-xmark').addEventListener("click", (e)=>{
            new_window.remove()
        })
    })
})
