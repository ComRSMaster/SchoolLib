let button_like_1 = document.getElementsByClassName('btn-check')

likeExpanded = (btn) => {
    let label_el = document.getElementById("label_" + btn.id)
    if (btn.checked) {
        label_el.innerText = "Из избранного"
    } else {
        label_el.innerText = "В избранное"
    }
    sendLike(btn)
}

sendLike = (btn) => {
    let resp = await fetch('/apifavor', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'btn': btn}),
      }).then(r => {
        if (r.redirected) {
                window.location.href = r.url;
            }
        else if (!r.ok) {
            toastBootstrap.show()
        }
    }).catch(e => {
        toastBootstrap.show()
    });
}
