from flask import Flask, Blueprint

book_api = Blueprint('book_api', __name__)

books = [
    {
        'id': i,
        'name': 'Название книги',
        'author': 'Название автора',
        'year': 1234 + i,
        'preview': 'https://img3.labirint.ru/rc/97a0faacd383913a014649bc82c620cd/363x561q80/books86/850859/cover.jpg'
                   '?1649262315',
        'liked': i % 2 == 0
    } for i in range(50)
]


@book_api.route('/like/<int:book_id>', methods=['POST'])
def unlike(book_id):
    print('li', book_id)
    return '', 200


@book_api.route('/unlike/<int:book_id>', methods=['POST'])
def two_params(book_id):
    print('un', book_id)
    return '', 200


@book_api.route('/get_books', methods=['GET'])
def get_books():
    return books
