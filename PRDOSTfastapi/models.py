from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, JSON, DateTime
from sqlalchemy.orm import relationship
from database import Base
import datetime


class users(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    office = Column(String)
    email = Column(String)
    password = Column(String)
    is_admin = Column(Boolean, default=False)
    is_requisitioner = Column(Boolean, default=False)
    is_supply = Column(Boolean, default=False)


class temp_PR (Base):
    __tablename__ = "temporary_prs"

    temp_id = Column(Integer, primary_key=True, index=True)
    office = Column(String)
    purpose = Column(String)
    source_of_fund = Column(String)
    Requested_by = Column(String)
    Desig_Req = Column(String)
    Recommending = Column(String)
    Desig_Reco = Column(String)
    Approved_By = Column(String)
    Desig_Appr = Column(String)
    json_items = Column(JSON)
    is_submitted = Column(Boolean, default=False)
    created_At = Column(DateTime, default=datetime.datetime.utcnow().date())


class main_PR (Base):
    __tablename__ = "main_prs"

    pr_id = Column(Integer, primary_key=True, index=True)
    temp_id = Column(Integer)
    office = Column(String)
    purpose = Column(String)
    source_of_fund = Column(String)
    Requested_by = Column(String)
    Desig_Req = Column(String)
    Recommending = Column(String)
    Desig_Reco = Column(String)
    Approved_By = Column(String)
    Desig_Appr = Column(String)
    json_items = Column(JSON)
    submitted_at = Column(DateTime, default=datetime.datetime.utcnow().date())
    status = Column(String)

    aoc = relationship("Aoc", back_populates="pr", uselist=False)


class Aoc (Base):
    __tablename__ = "aoc"

    aoc_id = Column(Integer, primary_key=True, index=True)
    pr_id = Column(Integer, ForeignKey('main_prs.pr_id'))
    winners = Column(JSON)
    suppliers = Column(JSON)

    pr = relationship("main_PR", back_populates="aoc")
    po = relationship("Po", back_populates="aoc", uselist=False)


class Po (Base):
    __tablename__ = "po"

    po_id = Column(Integer, primary_key=True, index=True)
    aoc_id = Column(Integer, ForeignKey('aoc.aoc_id'))
    mode_of_procurement = Column(String)
    place_of_delivery = Column(String)
    date_of_delivery = Column(String)
    delivery_term = Column(String)
    payment_term = Column(String)

    aoc = relationship("Aoc", back_populates="po")
