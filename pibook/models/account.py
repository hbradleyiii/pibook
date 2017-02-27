#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# name:             account.py
# author:           Harold Bradley III
# email:            harold@bradleystudio.net
# created on:       02/27/2017
#

"""
pibook.models
~~~~~~~~~~~~~

This module contains the account model.
"""

import db
from sqlalchemy import Column, Date, Integer, String


class Account(db.Base):
    """The account database model.

    TODO: description
    """

    __tablename__ = 'account'

    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    description = Column(String)
    date_open = Column(Date, nullable=False, default=datetime.datetim.now)

    def __str__(self):
        return 'Account [' + str(self.name) + ']'

    def __repr__(self):
        return "<Account (name='%s', description='%s', date_open='%s')>" % \
                (self.name, self.description, self.date_open)
