from flask import jsonify, request, abort
from flask_login import current_user
from flask_restful import Resource
from marshmallow import Schema, fields, ValidationError
from sqlalchemy import select

from data import db_session
from data.books import Book
from data.likes import Like
from data.booked_list import Booked_list
from data.borrowed import Borrowed

class BookResource(Resource):
    def get(self, book_id):
        session = db_session.create_session()
        book = session.query(Book).get(book_id)
        return jsonify(book.to_dict(
            only=('id', 'name', 'author', 'description', 'year',
                  'preview_url', 'preview_ratio', 'is_liked', 'left')))

    def delete(self, book_id):
        return jsonify({'success': 'TODO'})

    def post(self, book_id):
        return jsonify({'success': 'TODO'})

    def put(self, book_id):
        return jsonify({'success': 'TODO'})


class BooksListResource(Resource):
    class BooksListSchema(Schema):
        # order 0 - по алфавиту, 1 - по автору, 2 - по году
        order = fields.Int(default=0)
        offset = fields.Int(default=0)
        # only 0 - все, 1 - избранные, 2 - забронированные
        only = fields.Int(default=0)

    LIMIT = 25
    schema = BooksListSchema()

    def get(self):
        try:
            args = self.schema.load(request.args)
        except ValidationError as err:
            abort(400, err)

        session = db_session.create_session()
        if args['order'] == 1:
            order = Book.author
        elif args['order'] == 2:
            order = Book.year
        else:
            order = Book.name
        query = select(Book.id, Book.name, Book.author, Book.year,
                       Book.preview_url, Book.preview_ratio
                       ).order_by(-order).offset(args['offset']).limit(self.LIMIT)
        if 'only' in args.keys() and args['only'] == 1:
            query = query.join(Like, Like.book_id == Book.id).filter(Like.user_id == current_user.get_id())
        if 'only' in args.keys() and args['only'] == 2:
            query = query.join(Booked_list, Booked_list.book_id == Book.id).filter(Booked_list.user_id == current_user.get_id())
        if 'only' in args.keys() and args['only'] == 3:
            query = query.join(Borrowed, Borrowed.book_id == Book.id).filter(Borrowed.user_id == current_user.get_id())
        books = session.execute(query).fetchall()
        if order == Book.year:
            return jsonify({'all_loaded': len(books) < self.LIMIT, 'books': [dict(item._mapping) for item in books[::-1]]})
        return jsonify({'all_loaded': len(books) < self.LIMIT, 'books': [dict(item._mapping) for item in books]})
