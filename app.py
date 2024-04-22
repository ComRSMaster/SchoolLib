from flask import Flask, render_template, abort

app = Flask(__name__)

tabs = {
    'index': 'Главная',
    'favourite': 'Избранное',
    'profile': 'Профиль',
    'admin': 'Админка',
}
books = [
    {
        'id': i,
        'name': 'Название книги',
        'author': 'Название автора',
        'year': 1234 + i,
        'preview': 'https://img3.labirint.ru/rc/97a0faacd383913a014649bc82c620cd/363x561q80/books86/850859/cover.jpg'
                   '?1649262315',
        'liked': i % 2 == 0
    } for i in range(10)
]


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
    if book_id > len(books):
        abort(404)
    return render_template('book_page.html', tabs=tabs, book=books[book_id])


@app.route('/like/<int:book_id>/', methods=['POST'])
def unlike(book_id):
    print('li', book_id)
    return '', 200


@app.route('/unlike/<int:book_id>/', methods=['POST'])
def two_params(book_id):
    print('un', book_id)
    return '', 200


@app.errorhandler(404)
def two_params(book_id):
    return render_template('404.html', tabs=tabs), 404


if __name__ == '__main__':
    app.run(port=8080, host='localhost', debug=True)
