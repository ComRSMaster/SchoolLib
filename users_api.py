from flask import jsonify, request, abort, redirect
from flask_restful import Resource
from marshmallow import Schema, fields, ValidationError
from flask_login import LoginManager, login_user, login_required, logout_user, current_user


class UserResource(Resource):
    def get(self, user_id):
        return jsonify({'success': 'TODO'})
        # session = db_session.create_session()
        # book = session.query(Book).get(book_id)
        # print(book)
        # return jsonify(book.to_dict(
        #     only=('id', 'name', 'author', 'description', 'year',
        #           'preview_url', 'preview_ratio', 'is_liked', 'left')))

    def delete(self, user_id):
        return jsonify({'success': 'TODO'})

    def post(self, user_id):
        return jsonify({'success': 'TODO'})

    def put(self, user_id):
        return jsonify({'success': 'TODO'})


class LikeResource(Resource):
    class LikeSchema(Schema):
        book_id = fields.Int(required=True)
        is_like = fields.Bool(default=True)

    LIMIT = 25
    schema = LikeSchema()

    def get(self):
        if not current_user.is_authenticated:
            return redirect('/login')
        try:
            args = self.schema.load(request.args)
        except ValidationError as err:
            abort(400, err)
            print(args, current_user)
        return '', 200


class OrderResource(Resource):
    def post(self, book_id):
        print(book_id)
        return '', 200
