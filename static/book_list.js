let searchbutton = document.getElementById('search-button')
//let toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
let searchinput = document.getElementById('floatingInputGrid')
let container = document.getElementById('booksContainer')
let orderInput = document.getElementById('orderInput')

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
let lastBook = 0,
    all_loaded = false

async function loadBooks() {
    let resp = await fetch('api/books?' + new URLSearchParams({
        order: orderInput.value,
        offset: lastBook,
    }))
    console.log(resp)
    if (resp.ok) {
        let data = await resp.json()
        all_loaded = data.all_loaded
        parseBooks(data.books)
    } else
        toastBootstrap.show()
}

//async function loadwait() {
//    console.log(resp)
//    if (respx.ok) {
//        let data = await respx.json()
//        all_loaded = data.all_loaded
//        parseBooks(data.books)
//    } else
//        toastBootstrap.show()
//}
loadBooks()

parseBooks = (books) => {
    console.log(books)
    lastBook += books.length
    let books_dom = ''
    for (let book of books) {
        books_dom += book_card_dom(
            book.id, book.name, book.author, book.year,
            book.preview_url, book.preview_ratio, book.is_liked)
    }
    container.innerHTML += books_dom
}
orderInput.onchange = () => {
    all_loaded = false
    lastBook = 0
    container.innerHTML = ''
    loadBooks()
}
searchbutton.onclick = async() => {
    let books_dom = ''
    let all_loaded = false
    let lastBook = 0
    container.innerHTML = ''
    let inputValue = searchinput.value;
    let resp = await fetch('/searching', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'value': inputValue, 'order': orderInput.value}),
      })
    if (resp.ok) {
        let data = await resp.json()
        all_loaded = data.all_loaded
        parseBooks(data.books)
    } else
        toastBootstrap.show()
}

//searchbutton.addEventListener('click', () => {
//    let inputValue = searchinput.value;
//    let resp = fetch('/searching', {
//        method: 'POST',
//        headers: {'Content-Type': 'application/json'},
//        body: JSON.stringify({'value': inputValue})
//      })
//    loadwait(resp)
//    if (resp.ok) {
//    let data = resp.json()
//    all_loaded = data.all_loaded
//    parseBooks(data.books)
//    } else
//        toastBootstrap.show()

//    if (resp.ok) {
//        console.log(inputValue)
//    } else {
//        console.log('bebraaaa')
//    }
//})

window.addEventListener(
    "scroll",
    () => {
        if (all_loaded) return
        if (Math.abs(de.scrollHeight - de.clientHeight - de.scrollTop) < 150) {
            loadBooks()
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