#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# name:             category.py
# author:           Harold Bradley III
# email:            harold@bradleystudio.net
# created on:       02/27/2017
#

"""
pibook.models
~~~~~~~~~~~~~

This module contains the category model.
"""

import db
from sqlalchemy import Column, Integer, String


class Category(db.Base):
    """The category database model.

    TODO: description
    """

    __tablename__ = 'category'

    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    description = Column(String)

    def __str__(self):
        return 'Category [' + str(self.name) + ']'

    def __repr__(self):
        return "<Category (name='%s', description='%s')>" % (self.name,
                                                        self.description)
