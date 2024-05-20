import wtforms.fields
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired


class LoginForm(FlaskForm):
    username = StringField('Логин', validators=[DataRequired()])
    password = PasswordField('Пароль', validators=[DataRequired()])
    submit = SubmitField('Войти')


class AddUser(FlaskForm):
    name = StringField('Имя пользователя', validators=[DataRequired()])
    login = StringField('Логин пользователя', validators=[DataRequired()])
    password = StringField('Пароль', validators=[DataRequired()])
    class_numb = wtforms.fields.IntegerField('Класс', validators=[DataRequired()])
    is_admin = wtforms.fields.BooleanField('Права администрации', validators=[DataRequired()])
    submit = SubmitField('Создать аккаунт')
