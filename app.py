import datetime

from flask import Flask, render_template, abort, redirect

from api import book_api, get_book
from data import db_session
from data.users import User
from loginform import LoginForm
from flask_login import LoginManager

app = Flask(__name__)
app.register_blueprint(book_api)
app.config['SECRET_KEY'] = 'yandexlyceum_secret_key'  # todo поменять ключ и вынести его в .env
app.config['PERMANENT_SESSION_LIFETIME'] = datetime.timedelta(
    days=3000
)

login_manager = LoginManager()
login_manager.init_app(app)

db_session.global_init("db/library.db")

tabs = {
    'index': 'Главная',
    'favourite': 'Избранное',
    'profile': 'Профиль',
    'admin': 'Админка',
}


@login_manager.user_loader
def load_user(user_id):
    db_sess = db_session.create_session()
    return db_sess.query(User).get(user_id)


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html', title='Главная', tabs=tabs)


@app.route('/favourite')
def favourite():
    return render_template('favourite.html', title='Избранное', tabs=tabs)


@app.route('/about')
def about():
    return render_template('about.html', title='О проекте', tabs=tabs)


@app.route('/admin')
def admin():
    return render_template('admin.html', title='Админка', tabs=tabs)


@app.route('/profile')
def profile():
    return render_template('profile.html', title='Профиль', tabs=tabs)


@app.route('/book/<int:book_id>')
def like(book_id):
    try:
        book = get_book(book_id)
        return render_template('book_page.html', title=book['name'], tabs=tabs, book=book)
    except KeyError:
        abort(404)


@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        return redirect('/profile')
    return render_template('login.html', title='Авторизация', tabs=tabs, form=form)


@app.errorhandler(404)
def error_404():
    return render_template('404.html', title='Страница не найдена', tabs=tabs), 404


if __name__ == '__main__':
    app.run(port=8080, host='localhost', debug=True)
