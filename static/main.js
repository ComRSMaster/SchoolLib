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
}



sendLike = async (btn) => {
    console.log('ABOBUS')
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

borrowBook = async (btn) => {
    let resp = await fetch('/apibook', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'id': btn.id}),
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

todel = async (btn) => {
    console.log(btn.id)
    console.log(btn.id)
    let resp = await fetch('/apitake', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'id': btn.id, 'idx': btn.name}),
    }).then(r => {
        if (r.redirected) {
            console.log('КАРАМБА!!!')
                window.location.href = r.url;
            }
        else if (!r.ok) {
            console.log('КАРАМБ')
            toastBootstrap.show()
        }
    })
}

tobook = async (btn) => {
    console.log(btn.id)
    let resp = await fetch('/apigive', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'id': btn.id, 'idx': btn.name}),
    }).then(r => {
        if (r.redirected) {
                console.log('КАРАМБАффф')
                window.location.href = r.url;
            }
        else if (!r.ok) {
            console.log('КАРАМБА')
            toastBootstrap.show()
        }
    })
}

remove = async (btn) => {
    console.log('FINAL CHAPTER')
    console.log(btn.id)
    let resp = await fetch('/remove', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'id': btn.id, 'idx': btn.name}),
    }).then(r => {
        if (r.redirected) {
                console.log('Заход последний!')
                window.location.href = r.url;
            }
        else if (!r.ok) {
            console.log('КАРАМБА')
            toastBootstrap.show()
        }
    })
}