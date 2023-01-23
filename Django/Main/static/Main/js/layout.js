const reply_btns = document.querySelectorAll(".reply-btn")
const add_comment_inp = document.querySelector(".add-comment-inp")
const reply_inp = document.querySelector(".reply-inp")
const clear_reply = document.querySelector(".clear-reply")

clear_reply.addEventListener("click", e=>{
    add_comment_inp.setAttribute("placeholder", "Add comment")
    reply_inp.value = ""
    clear_reply.style.display = "none"
})

if (add_comment_inp !== null && reply_inp !== null && clear_reply !== null)
reply_btns.forEach(elem => {
    elem.addEventListener("click", e=>{
        e.preventDefault()
        add_comment_inp.focus()
        clear_reply.style.display = "inline-block"
        reply_inp.value = e.target.getAttribute("comment-id")
        add_comment_inp.setAttribute("placeholder", "Reply to " + e.target.getAttribute("comment-user"))
    })
})