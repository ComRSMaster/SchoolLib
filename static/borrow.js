//let toastLiveExample = document.getElementById('liveToast')
//let toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
let container_booked = document.getElementById('booksContainer2-book')
//let orderInput = document.getElementById('orderInput')
let de_booked = document.documentElement

book_card_dom = (id, name, author, year, preview_url, preview_ratio, is_liked) => {
    return `<div class="col">
    <div class="card shadow-sm" role="link" onclick="openBook(${id})">
        <img src=${preview_url}
             class="card-img-top" alt="..." style="aspect-ratio: ${preview_ratio}">
        <div class="card-body">
            <div class="d-flex gap-2 justify-content-between">
                <div>
                    <h5 class="card-title">${name}</h5>
                    <h6 class="card-subtitle text-body-secondary">${author}</h6>
                    <h6 class="card-subtitle text-body-secondary">${year}</h6>
                </div>

            </div>
        </div>
    </div>
</div>`
}
let lastBook_booked = 0,
    all_loaded_booked = false

async function loadBooks_booked() {
    let resp = await fetch('api/books?' + new URLSearchParams({
        order: 0,
        offset: lastBook_booked,
        only: 3,
    }))
    console.log(resp)
    if (resp.ok) {
        let data = await resp.json()
        all_loaded_booked = data.all_loaded
        parseBooks(data.books)
    } else
        toastBootstrap.show()
}

loadBooks_booked()

parseBooks = (books) => {
    console.log(books)
    lastBook_booked += books.length
    let books_dom = ''
    for (let book of books) {
        books_dom += book_card_dom(
            book.id, book.name, book.author, book.year,
            book.preview_url, book.preview_ratio, book.is_liked)
    }
    container_booked.innerHTML += books_dom
}

window.addEventListener(
    "scroll",
    () => {
        if (all_loaded_booked) return
        if (Math.abs(de_booked.scrollHeight - de_booked.clientHeight - de_booked.scrollTop) < 150) {
            loadBooks_booked()
            console.log('asdf')
        }
    },
    {
        passive: true
    }
)

openBook = (bookId) => {
    window.open('/book/' + bookId, '_blank').focus()
}