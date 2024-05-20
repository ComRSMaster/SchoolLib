//let button_like = document.getElementsByClassName('btn-check')

likeExpanded = (btn) => {
    let label_el = document.getElementById("label_" + btn.id)
//    console.log(bookid)
    console.log(btn)
    if (btn.checked) {
        sendLike(btn)
        label_el.innerText = "Из избранного"
    } else {
        label_el.innerText = "В избранное"
        delLike(btn)
    }
}

delLike = async (btn) => {
    console.log(3)
    console.log(btn)
    console.log(3)
    console.log(btn.id, btn.databookid)
    let resp = await fetch('/apifavor', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'id': btn.id, 'del': '1'}),
      })
    console.log(resp)
    if (resp.ok) {
        console.log(btn)
    } else
        console.log('123')
        console.log('123')
}



sendLike = async (btn) => {
    console.log(3)
    console.log(btn)
    console.log(3)
    console.log(btn.id, btn.databookid)
    let resp = await fetch('/apifavor', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'id': btn.id, 'del': '0'}),
      }).then(r => {
        if (r.redirected) {
                window.location.href = r.url;
            }
        else if (!r.ok) {
            toastBootstrap.show()
        }
    })
}

openBook = (bookId) => {
    window.open('/book/' + bookId, '_blank').focus()
}