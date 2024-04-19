from flask import Flask, render_template

app = Flask(__name__)

tabs = {
    'index': 'Главная',
    'favourite': 'Избранное',
    'profile': 'Профиль',
    'admin': 'Админка',
}


@app.route('/')
@app.route('/index')
def index():
    books = [
        {'id': i,
         'name': 'Название книги',
         'author': 'Название автора',
         'year': '1234',
         'preview': 'https://img3.labirint.ru/rc/97a0faacd383913a014649bc82c620cd/363x561q80/books86/850859/cover.jpg?1649262315'
         }
        for i in range(10)
    ]
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


if __name__ == '__main__':
    app.run(port=8080, host='localhost', debug=True)
