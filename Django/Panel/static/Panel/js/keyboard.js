
document.addEventListener("keyup", e => {
    if(e.ctrlKey && e.key == 'q'){
        document.querySelectorAll('button.burger').forEach(elem=>{
            e.preventDefault()
            elem.click()
        })
    }
    if(e.ctrlKey && e.key == 'u'){

    }
})