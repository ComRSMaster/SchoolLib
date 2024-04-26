let toastLiveExample = document.getElementById('liveToast')
let toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
let container = document.getElementById('books-container')

book_card_dom = (id, name, author, year, preview_url, is_liked) => {
    return `<div class="col">
    <div class="card shadow-sm" role="link" onclick="openBook({{book.id}})">
        <img src=${preview_url}
             class="card-img-top" alt="...">
        <div class="card-body">
            <div class="d-flex gap-2 justify-content-between">
                <div>
                    <h5 class="card-title">${name}</h5>
                    <h6 class="card-subtitle text-body-secondary">${author}</h6>
                    <h6 class="card-subtitle text-body-secondary">${year}</h6>
                </div>
                <div onclick="event.stopPropagation();">
                    <input type="checkbox" id="heart${id}" class="btn-check" autocomplete="off"
                           ${is_liked? 'checked': ''}
                           onchange="sendLike(this)" data-book-id=${id}>
                    <label class="btn heart" for="heart${id}">
                        <svg fill="currentColor" width="20" height="20">
                            <use xlink:href="#heart"></use>
                        </svg>
                    </label>
                </div>
            </div>
        </div>
    </div>
</div>`
}

window.onload = () => {
    let books = await loadBooks()
    console.log(books)
    let books_dom = ''
    for (let book of books) {
        books_dom += book_card_dom(
            book.id, book.name, book.author, book.year,
            book.preview_url, book.is_liked)
    }
    container.innerHTML += books_dom
}

async function loadBooks() {
    fetch('/get_books').then(r => {
        console.log(r)
        if (r.ok) {
            return r.json()
        } else {
            toastBootstrap.show()
        }
    }).catch(e => {
        console.log(e)
        toastBootstrap.show()
    });
}

likeExpanded = (btn) => {
    let label_el = document.getElementById("label_" + btn.id)
    let url
    if (btn.checked) {
        label_el.innerText = "Из избранного"
    } else {
        label_el.innerText = "В избранное"
    }
    sendLike(btn)
}

sendLike = (btn) => {
    fetch(`/${!btn.checked? 'un' : ''}like/` + btn.dataset.bookId, {
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

openBook = (bookId) => {
    window.open('/book/' + bookId, '_blank').focus()
}
