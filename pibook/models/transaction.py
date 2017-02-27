#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# name:             transaction.py
# author:           Harold Bradley III
# email:            harold@bradleystudio.net
# created on:       02/26/2017
#

"""
pibook.models
~~~~~~~~~~~~~

This module contains the transaction model.
"""

from . import Account, Category, MonthlyBudget
import db
from sqlalchemy import Column, Date, Integer, String
from sqlalchemy.orm import relationship, backref


class Transaction(db.Base):
    """The transaction database model.

    TODO: description
    """

    __tablename__ = 'transaction'

    id = Column(Integer, primary_key=True)
    date = Column(Date, nullable=False, default=datetime.datetim.now)
    amount = Column(Integer, nullable=False)
    description = Column(String)
    account = relationship('Account', remote_side=Account.id,
                           backref='transactions')
    category = relationship('Category', remote_side=Category.id,
                            backref='transactions')
    reconciled = Column(Boolean)

    def __init__(self, date=None, amount=None, account=None,
                 category=None, reconciled=None):
        if date:
            self.date = date

        if amount:
            self.amount = amount

        if account:
            self.account = account

        if category:
            self.account = category

        if reconciled:
            self.reconciled = True
        else:
            self.reconciled = False

    def __str__(self):
        return 'Transaction [' + str(self.id) + '] Amount: $' + \
            str(self.amount) + ' Account: ' + str(self.account)

    def __repr__(self):
        return "<Transaction (date='%s', amount='%s', account='%s', \
            category='%s', reconciled='%s')>" % (self.date, self.amount,
            self.account, self.category, self.reconciled)
