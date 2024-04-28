let toastLiveExample = document.getElementById('liveToast')
let toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
let container = document.getElementById('books-container')
let de = document.documentElement

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
                <div onclick="event.stopPropagation();">
                    <input type="checkbox" id="heart${id}" class="btn-check" autocomplete="off"
                           ${is_liked ? 'checked' : ''}
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

async function loadBooks() {
    let resp = await fetch('/get_books')
    console.log(resp)

    parseBooks(await resp.json())
    //     .then(r => {
    //     if (r.ok) {
    //         parseBooks(r.json())
    //     } else {
    //         toastBootstrap.show()
    //     }
    //     console.log(r)
    // }).catch(e => {
    //     console.log(e)
    //     toastBootstrap.show()
    // });
}

loadBooks()

parseBooks = (books) => {
    window.onload = () => {
        console.log('load')
    }
    console.log(books)
    let books_dom = ''
    for (let book of books) {
        books_dom += book_card_dom(
            book.id, book.name, book.author, book.year,
            book.preview_url, book.preview_ratio, book.is_liked)
    }
    container.innerHTML += books_dom
}

window.addEventListener(
    "scroll",
    () => {
        if (Math.abs(de.scrollHeight - de.clientHeight - de.scrollTop) < 150) {
            loadBooks()
            console.log('asdf')
        }
    },
    {
        passive: true
    }
)

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
    fetch(btn.checked ? '/like/' : '/unlike/' + btn.dataset.bookId, {
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
