import random

from flask import Blueprint

from data import db_session
from data.books import Book

book_api = Blueprint('book_api', __name__)


def get_book(book_id):
    # то что в get_books + расширенная информация: description, left - осталось в библиотеке
    # preview_ratio = width / height
    return {
        'id': book_id,
        'name': 'Название книги',
        'author': 'Название автора',
        'description': 'Очень длинное описание книги. Эта книга про очень длинное описание книги.',
        'year': random.randint(1000, 2024),
        'preview_url': 'https://www.centrmag.ru/catalog/ev_27_5_22_2_3d_p.jpg' if book_id % 2 == 1 else
        'https://img3.labirint.ru/rc/97a0faacd383913a014649bc82c620cd/363x561q80/books86/850859/cover.jpg?1649262315',
        'preview_ratio': 500 / 634 if book_id % 2 == 1 else 363 / 479,
        'is_liked': random.randint(1, 4) == 1,
        'left': random.randint(1, 4) == 1
    }


@book_api.route('/like/<int:book_id>', methods=['POST'])
def like(book_id):
    print('li', book_id)
    return '', 200


@book_api.route('/unlike/<int:book_id>', methods=['POST'])
def unlike(book_id):
    print('un', book_id)
    return '', 200


@book_api.route('/book_book/<int:book_id>', methods=['POST'])
def book_book(book_id):
    print('bb', book_id)
    return '', 200


@book_api.route('/get_books', methods=['GET'])
def get_books():
    # preview_ratio = width / height

    db_sess = db_session.create_session()
    books = db_sess.query(Book)
    # books = [
    #     {
    #         'id': i,
    #         'name': 'Название книги',
    #         'author': 'Название автора',
    #         'year': 1234 + i,
    #         'preview_url': 'https://www.centrmag.ru/catalog/ev_27_5_22_2_3d_p.jpg' if i % 2 == 1 else
    #         'https://img3.labirint.ru/rc/97a0faacd383913a014649bc82c620cd/363x561q80/books86/850859/cover.jpg?1649262315',
    #         'preview_ratio': 500 / 634 if i % 2 == 1 else 363 / 479,
    #         'is_liked': random.randint(1, 4) == 1
    #     } for i in range(30)
    # ]

    return books
