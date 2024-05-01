from flask import jsonify, request, abort
from flask_restful import Resource
from marshmallow import Schema, fields, ValidationError
from sqlalchemy import select

from data import db_session
from data.books import Book


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
                       ).order_by(order).offset(args['offset']).limit(self.LIMIT)
        books = session.execute(query).fetchall()
        return jsonify({'all_loaded': len(books) < self.LIMIT, 'books': [dict(item._mapping) for item in books]})
