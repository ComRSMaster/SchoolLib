import datetime

import sqlalchemy
from flask import Flask, render_template, abort, redirect
from flask_restful import Api

import books_api
import users_api
from data import db_session
from data.books import Book
from data.grades import Grade
from data.users import User
from loginform import LoginForm
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
    return render_template('favourite.html', title='Избранное')


@app.route('/about')
def about():
    return render_template('about.html', title='О проекте')


@app.route('/admin')
def admin():
    return render_template('admin.html', title='Админка')


@app.route('/profile')
def profile():
    if current_user.is_authenticated:
        return render_template('profile.html', title='Профиль')
    return redirect('/login')

@app.route('/book/<int:book_id>')
def book_view(book_id):
    session = db_session.create_session()
    book = session.query(Book).get(book_id)
    if not book:
        abort(404)
    return render_template('book_page.html', title=book['name'], book=book)


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
@login_required
def logout():
    logout_user()
    return redirect('/profile')


@app.errorhandler(404)
def error_404():
    return render_template('404.html', title='Страница не найдена'), 404


if __name__ == '__main__':
    app.run(port=8080, host='localhost', debug=True)
