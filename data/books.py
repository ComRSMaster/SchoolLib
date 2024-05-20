import sqlalchemy

from .db_session import SqlAlchemyBase
# from flask import Flask
# from sqlalchemy_utils.types import TSVectorType
# from sqlalchemy_searchable import SearchQueryMixin, make_searchable




class Book(SqlAlchemyBase):
    __tablename__ = 'books'

    id = sqlalchemy.Column(sqlalchemy.Integer,
                           primary_key=True, autoincrement=True)
    name = sqlalchemy.Column(sqlalchemy.String)
    author = sqlalchemy.Column(sqlalchemy.String)
    description = sqlalchemy.Column(sqlalchemy.String, nullable=True)
    year = sqlalchemy.Column(sqlalchemy.SmallInteger)
    preview_url = sqlalchemy.Column(sqlalchemy.String, nullable=True)
    preview_ratio = sqlalchemy.Column(sqlalchemy.Float, nullable=True)
    left = sqlalchemy.Column(sqlalchemy.Integer)
