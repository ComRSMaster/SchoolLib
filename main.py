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
    return render_template('index.html', tabs=tabs)


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
    app.run(port=8080, host='127.0.0.1', debug=True)
