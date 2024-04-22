const toastLiveExample = document.getElementById('liveToast')
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)

function like_expanded(btn) {
    let label_el = document.getElementById("label_" + btn.id);
    let url
    if (btn.checked) {
        label_el.innerText = "Из избранного"
        url = '/like/'
    } else {
        label_el.innerText = "В избранное"
        url = '/unlike/'
    }
    fetch(url + btn.dataset.bookId, {
        method: "POST"
    }).then(r => {
        console.log(r)
        if (!r.ok) {
            toastBootstrap.show()
        }
    }).catch(e => {
        console.log(e)
        toastBootstrap.show()
    });
}