from flask import Flask, render_template, abort

from api import book_api, books

app = Flask(__name__)
app.register_blueprint(book_api)

tabs = {
    'index': 'Главная',
    'favourite': 'Избранное',
    'profile': 'Профиль',
    'admin': 'Админка',
}


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html', tabs=tabs, books=books)


@app.route('/favourite')
def favourite():
    return render_template('favourite.html', tabs=tabs)


@app.route('/profile')
def profile():
    return render_template('profile.html', tabs=tabs)


@app.route('/about')
def about():
    return render_template('about.html', tabs=tabs)


@app.route('/admin')
def admin():
    return render_template('admin.html', tabs=tabs)


@app.route('/book/<int:book_id>')
def like(book_id):
    try:
        return render_template('book_page.html', tabs=tabs, book=books[book_id])
    except KeyError:
        abort(404)


@app.errorhandler(404)
def two_params():
    return render_template('404.html', tabs=tabs), 404


if __name__ == '__main__':
    app.run(port=8080, host='localhost', debug=True)
