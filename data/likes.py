import sqlalchemy
from .db_session import SqlAlchemyBase


class Like(SqlAlchemyBase):
    __tablename__ = 'likes'

    id = sqlalchemy.Column(sqlalchemy.Integer,
                           primary_key=True, autoincrement=True)
    user_id = sqlalchemy.Column(
        sqlalchemy.Integer, sqlalchemy.ForeignKey("users.id"), index=True)
    book_id = sqlalchemy.Column(
        sqlalchemy.Integer, sqlalchemy.ForeignKey("books.id"))
