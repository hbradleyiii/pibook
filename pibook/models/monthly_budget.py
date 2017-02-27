#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# name:             monthly_budget.py
# author:           Harold Bradley III
# email:            harold@bradleystudio.net
# created on:       02/26/2017
#

"""
pibook.models
~~~~~~~~~~~~~

This module contains the monthly budget model.
"""

from . import Category
import db
from random import randint
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship


class MonthlyBudget(db.Base):
    """The monthly budget database model.

    TODO: description
    """

    __tablename__ = 'monthly_budget'

    id = Column(Integer, primary_key=True)
    year = Column(String)  # TODO: Change this
    month = Column(String)  # TODO: Change this
    category = relationship('Category', remote_side=Category.id)
    amount = Column(Integer, nullable=False)
    description = Column(String)

    def __str__(self):
        return 'Monthly Budget: (' + str(self.category) + ') $' + \
            str(self.amount)

    def __repr__(self):
        return "<MonthlyBudget (year='%s', month='%s', category='%s', \
            amount='%s', description='%s')>" % (self.year, self.month,
            self.category, self.amount, self.description)
