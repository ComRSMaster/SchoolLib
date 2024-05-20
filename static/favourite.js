//let toastBootstrap = bootstrap.Toast.getOrCreateInstance(document.getElementById('liveToast'))
let container_favor = document.getElementById('booksContainer-like')
//let orderInput = document.getElementById('orderInput')
let de_favor = document.documentElement

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
let lastBook_favor = 0,
    all_loaded_favor = false
    orderInput = 0

async function loadBooks_favor() {
    let resp = await fetch('api/books?' + new URLSearchParams({
        order: 0,
        offset: lastBook_favor,
        only: 1,
    }))
    console.log(resp)
    if (resp.ok) {
        let data = await resp.json()
        all_loaded_favor = data.all_loaded
        parseBooks(data.books)
    } else
        toastBootstrap.show()
}

loadBooks_favor()

parseBooks = (books) => {
    console.log(books)
    lastBook_favor += books.length
    let books_dom = ''
    for (let book of books) {
        books_dom += book_card_dom(
            book.id, book.name, book.author, book.year,
            book.preview_url, book.preview_ratio, book.is_liked)
    }
    container_favor.innerHTML += books_dom
}
orderInput.onchange = () => {
    all_loaded_favor = false
    lastBook_favor = 0
    container_favor.innerHTML = ''
    loadBooks_favor()
}
window.addEventListener(
    "scroll",
    () => {
        if (all_loaded_favor) return
        if (Math.abs(de_favor.scrollHeight - de_favor.clientHeight - de_favor.scrollTop) < 150) {
            loadBooks_favor()
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