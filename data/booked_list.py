import sqlalchemy
from .db_session import SqlAlchemyBase


class Booked_list(SqlAlchemyBase):
    __tablename__ = 'booked_list'

    id = sqlalchemy.Column(sqlalchemy.Integer,
                           primary_key=True, autoincrement=True)
    user_id = sqlalchemy.Column(
        sqlalchemy.Integer, sqlalchemy.ForeignKey("users.id"), index=True)
    book_id = sqlalchemy.Column(
        sqlalchemy.Integer, sqlalchemy.ForeignKey("books.id"))
