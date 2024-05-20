import wtforms.fields
from flask_wtf import FlaskForm
from sqlalchemy import select
from wtforms import StringField, PasswordField, SubmitField, SelectField
from wtforms.validators import DataRequired, InputRequired

from data import db_session
from data.grades import Grade


def get_grades():
    session = db_session.create_session()
    query_us = select(Grade.id, Grade.name)
    grades = map(tuple, session.execute(query_us).fetchall())
    return grades


class LoginForm(FlaskForm):
    username = StringField('Логин', validators=[DataRequired()])
    password = PasswordField('Пароль', validators=[DataRequired()])
    submit = SubmitField('Войти')


class AddUser(FlaskForm):
    class Meta(FlaskForm.Meta):
        user_id = None

    name = StringField('Имя пользователя', validators=[DataRequired()])
    login = StringField('Логин пользователя', validators=[DataRequired()])
    password = StringField('Пароль')
    class_numb = SelectField('Класс', choices=get_grades, validators=[DataRequired()])
    is_admin = wtforms.fields.BooleanField('Права администрации')
    submit = SubmitField('Сохранить')


class AddBook(FlaskForm):
    class Meta(FlaskForm.Meta):
        book_id = None

    name = StringField('Название книги', validators=[DataRequired()])
    author = StringField('Автор', validators=[DataRequired()])
    year = StringField('Год выпуска', validators=[DataRequired()])
    description = StringField('Описание', validators=[DataRequired()])
    left = StringField('Осталось', validators=[DataRequired()])
    submit = SubmitField('Сохранить')
