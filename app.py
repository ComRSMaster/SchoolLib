import datetime

import sqlalchemy
from flask import Flask, render_template, abort, redirect, request, jsonify
from flask_restful import Api
import json

from sqlalchemy import select, insert, delete
from sqlalchemy.orm import declarative_base, configure_mappers
from sqlalchemy_searchable import make_searchable, SearchQueryMixin, search
from werkzeug.security import generate_password_hash, check_password_hash

import books_api
import users_api
from data import db_session
from data.books import Book
from data.grades import Grade
from data.likes import Like
from data.booked_list import Booked_list
from data.users import User
from loginform import LoginForm, AddUser
from flask_login import LoginManager, login_user, login_required, logout_user, current_user

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret_key'  # todo поменять ключ и вынести его в .env
app.config['PERMANENT_SESSION_LIFETIME'] = datetime.timedelta(
    days=3000
)

api = Api(app)

api.add_resource(books_api.BooksListResource, '/api/books', endpoint='books_list')
api.add_resource(books_api.BookResource, '/api/book/<int:book_id>', endpoint='book')
api.add_resource(users_api.LikeResource, '/api/like', endpoint='like')
api.add_resource(users_api.OrderResource, '/api/order', endpoint='order')

# Base = declarative_base()
# make_searchable(Base.metadata)
# configure_mappers()
# class ArticleQuery(, SearchQueryMixin):
#     pass


login_manager = LoginManager()
login_manager.init_app(app)

db_session.global_init("db/library.db")


# grades = [Grade(name=i) for i in ['10Х', '10Ф', 'Директор', 'Завуч', 'Библиотекарь', 'Выпускник', 'В другой школе']]
# db_sess = db_session.create_session()
# db_sess.add_all(grades)
# db_sess.commit()

@login_manager.user_loader
def load_user(user_id):
    db_sess = db_session.create_session()
    return db_sess.query(User).get(user_id)


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html', title='Главная')


@app.route('/favourite')
def favourite():
    if current_user.is_authenticated:
        return render_template('favourite.html', title='Избранное')
    return redirect('/login')


@app.route('/about')
def about():
    return render_template('about.html', title='О проекте')


@app.route('/booked')
def booked():
    if current_user.is_authenticated:
        return render_template('booked.html')
    return redirect('/login')


@app.route('/change', methods=['GET', 'POST'])
def change():
    if current_user.is_authenticated:
        form = AddUser()
        form.password()
        db_sess = db_session.create_session()
        user = db_sess.query(User).filter(User.username == form.name.data).first()
        print(user)
        if form.validate_on_submit():
            if not user:
                rows = db_sess.query(User).count()
                query = (
                    insert(User).values(id=rows+1, name=form.name.data, username=form.login.data, hashed_password=generate_password_hash(form.password.data), grade_id=form.class_numb.data, is_admin=form.is_admin.data)
                )
                db_sess.execute(query)
                db_sess.commit()
                print('added', 'rows + 1', current_user.get_id(), id)
                return jsonify(success=True)
        print(1)
    return render_template('change.html', form=form, title='Изменени данных')

@app.route('/admin')
def admin():
    print(current_user.get_id())
    session = db_session.create_session()
    query_us = select(User.id, User.name, User.username, User.grade_id).order_by(User.id)
    query_us = session.execute(query_us).fetchall()

    query_books = select(Book.id, Book.name, Book.author, Book.year, Book.description, Book.left).order_by(Book.id)
    query_books = session.execute(query_books).fetchall()

    query_booked = select(Booked_list.id, Booked_list.user_id, Booked_list.book_id).order_by(Booked_list.id)
    query_booked = session.execute(query_booked).fetchall()
    return render_template('admin.html', title='Админка', items=query_us, itemsbooks=query_books, itemsbooked=query_booked)


@app.route('/profile')
def profile():
    if current_user.is_authenticated:
        return render_template('profile.html', title='Профиль')
    return redirect('/login')


@app.route('/book/<int:book_id>')
def book_view(book_id):
    session = db_session.create_session()
    book = session.query(Book).get(book_id)
    session = db_session.create_session()
    if not book:
        abort(404)
        return
    print(book, book_id)
    books = session.execute(select(Like.user_id, Like.book_id).order_by(Like.book_id).offset(0).limit(25).filter(Like.book_id == book.id, Like.user_id == current_user.get_id())).fetchall()
    print(books)
    if not books:
        return render_template('book_page.html', title=book.name, book=book, bookliked=False)
    else:
        return render_template('book_page.html', title=book.name, book=book, bookliked=True)


@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    form.password()
    if form.validate_on_submit():
        db_sess = db_session.create_session()
        user = db_sess.query(User).filter(User.username == form.username.data).first()
        if user and user.check_password(form.password.data):
            login_user(user, remember=True)
            return redirect("/profile")
        form.password.errors.append('Неправильный логин или пароль')
    return render_template('login.html', title='Авторизация', form=form)


@app.route('/logout')
# @login_required
def logout():
    if current_user.is_authenticated:
        logout_user()
        return redirect('/profile')
    else:
        return redirect('/login')


@app.errorhandler(404)
def error_404(e):
    return render_template('404.html', title='Страница не найдена'), 404


@app.route('/searching', methods=['GET', 'POST'])
def search():
    if request.method == 'GET':
        return render_template('404.html', title='Страница не найдена'), 404
    elif request.method == 'POST':
        try:
            data = request.json
            if 'value' in data:
                inputvalue = validate(data['value'])
                session = db_session.create_session()
                # print(validate(data['order']))
                if validate(data['order']) == '1':
                    order = Book.author
                elif validate(data['order']) == '2':
                    order = Book.year
                else:
                    order = Book.name
                # print(order)
                query = select(Book.id, Book.name, Book.author, Book.year,
                               Book.preview_url, Book.preview_ratio
                               ).order_by(order).offset(0).limit(25)
                query = query.filter(Book.name.like('%' + inputvalue + '%')).order_by(order)
                books = session.execute(query).fetchall()
                # print(books)
                # print(inputvalue)
                return jsonify({'all_loaded': len(books) < 25, 'books': [dict(item._mapping) for item in books]})
            else:
                raise KeyError('Value key not found')
        except (KeyError, json.JSONDecodeError) as e:
            return jsonify({'error': 'Invalid data format'}), 400


@app.route('/apifavor', methods=['GET', 'POST'])
def api_favor():
    if current_user.is_authenticated:
        if request.method == 'GET':
            return render_template('404.html', title='Страница не найдена'), 404
        elif request.method == 'POST':
            try:
                data = request.json
                session = db_session.create_session()
                # print(data)
                if 'id' in data:
                    if validate(data['del']) == '0':
                        id = validate(data['id'])[4:]
                        rows = session.query(Like).count()
                        query = (
                            insert(Like).values(id=rows+1, user_id=current_user.get_id(), book_id=id)
                        )
                        session.execute(query)
                        session.commit()
                        print('added', 'rows + 1', current_user.get_id(), id)
                        return jsonify(success=True)
                    else:
                        id = validate(data['id'])[4:]
                        query = (
                            delete(Like).where(Like.user_id == current_user.get_id(), Like.book_id == id)
                        )
                        session.execute(query)
                        session.commit()
                        print('removed', current_user.get_id(), id)
                        return jsonify(success=True)
                else:
                    raise KeyError('Value key not found')
            except (KeyError, json.JSONDecodeError) as e:
                return jsonify({'error': 'Invalid data format'}), 400
    else:
        return redirect('/login')


def validate(value):
    return value


@app.route('/bebra', methods=['GET', 'POST'])
def bebra():
    if current_user.is_authenticated:
        return render_template('bebra.html', title='Беееебра')
    return redirect('/login')


if __name__ == '__main__':
    app.run(port=8080, host='localhost', debug=True)
