import sqlalchemy
from sqlalchemy import orm

from .db_session import SqlAlchemyBase


# 10Х, 10Ф, Директор, Завуч, Библиотекарь, Выпускник, В другой школе...
class Grade(SqlAlchemyBase):
    __tablename__ = 'grades'

    id = sqlalchemy.Column(sqlalchemy.Integer,
                           primary_key=True, autoincrement=True)
    name = sqlalchemy.Column(sqlalchemy.String)


users = orm.relationship("User", back_populates='grade')
