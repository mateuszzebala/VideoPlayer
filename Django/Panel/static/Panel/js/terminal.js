const terminal = document.querySelector("section.terminal")

const termInp = document.createElement('input')
const output = document.createElement('span')
const history = []
let content = []
let history_i = -1
let tab_i = -1
let path = ""
output.classList.add("output")
termInp.classList.add('termInp')
terminal.addEventListener("click", (e)=>{
    if(e.target.classList.contains('output')) return
    const input = Array.from(document.querySelectorAll('.terminal input')).at(-1)
    input.focus()
})


function addNewInp(){
    const newInp = termInp.cloneNode()
    function snd(e){
        if (e.key == "Enter"){
            e.target.disabled = true
            history.push(e.target.value)
            history_i = -1
            tab_i = -1
            if(e.target.value === 'cls' || e.target.value === 'clear'){
                terminal.innerHTML = ""
                addNewInp()
                return
            }
            send({
                "command": e.target.value
            }).then(res => res.json()).then(data => {
                if(data.output.toString().trim() === '\\x0c'){
                    terminal.innerHTML = ""
                    addNewInp()
                    return
                }
                path = data.path
                content = data.content
                const out = output.cloneNode()
                out.innerHTML = data.output
                terminal.appendChild(out)
                addNewInp()
            })

        }
        if(e.key == "ArrowUp"){
            e.preventDefault()
            if(history_i < history.length - 1){
                history_i += 1
            }
            const new_val = history.at(history.length - history_i - 1)
            if(new_val !== 'undefined')
                newInp.value = history.at(history.length - history_i - 1)

        }
        if(e.key == "ArrowDown"){
            e.preventDefault()
            if(history_i > 0){
                history_i -= 1
                const new_val = history.at(history.length - history_i - 1)
                if(new_val !== 'undefined')
                    newInp.value = history.at(history.length - history_i - 1)
            }
            else{
                newInp.value = ""
            }

        }
        if(e.key == "Tab"){
            e.preventDefault()
            let fl = e.target.value.split(" ").at(-1)
            content.forEach(c => {
                if(c.startsWith(fl)){
                    e.target.value = e.target.value.split(" ").slice(0, -1) + " " + c
                }
            })

        }
    }
    newInp.addEventListener("keydown", snd)


    const span = document.createElement('span')
    span.innerHTML = "<br>" + path + "<br>" + "# "
    span.appendChild(newInp)
    span.classList.add("prompt")
    terminal.appendChild(span)
    terminal.appendChild(document.createElement('br'))
    newInp.focus()

}
window.addEventListener("load", ()=>{

    send({
        "command": ""
    }).then(res => res.json()).then(data => {
        const out = output.cloneNode()
        out.innerHTML = data.output
        path = data.path
        addNewInp()
    })

})