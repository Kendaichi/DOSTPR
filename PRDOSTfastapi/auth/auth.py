from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models
from passlib.context import CryptContext
from jose import jwt, JWTError
from dotenv import load_dotenv
import os

load_dotenv()


router = APIRouter(
    prefix="/auth",
    tags=['auth']
)


class registerUser(BaseModel):
    office: str
    email: str
    password: str


class userLogin(BaseModel):
    email: str
    password: str


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


models.Base.metadata.create_all(bind=engine)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


@router.post("/register/")
async def register_user(users: registerUser, db: Session = Depends(get_db)):
    # Check if the email is already in use
    existing_user = db.query(models.users).filter(
        models.users.email == users.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already in use")

    # Hash the password before storing it in the database
    hashed_password = pwd_context.hash(users.password)

    # check if the password is the same
    # password_correct = pwd_context.verify("Hakdog", hashed_password)

    # Create a new user in the database
    new_user = models.users(
        office=users.office,
        email=users.email,
        password=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"succes": "Account Created"}


@router.post("/login/")
async def login_user(users: userLogin, db: Session = Depends(get_db)):
    # Query the user by email
    user = db.query(models.users).filter(
        models.users.email == users.email).first()

    if not user:
        return {"Message": "Email not Found"}

    # Check if the provided password matches the stored hashed password
    password_correct = pwd_context.verify(
        users.password, user.password)
    if not password_correct:
        return {"Message": "Incorrect Password"}

    # Determine the user's role
    if user.is_admin:
        user_role = "admin"
    elif user.is_requisitioner:
        user_role = "requisitioner"
    elif user.is_supply:
        user_role = "supply"
    else:
        user_role = "not_assigned"

    # If the password is correct, generate a JWT token
    token_data = {"sub": user.email}
    try:
        access_token = jwt.encode(
            token_data, os.getenv("SECRET_KEY"), algorithm=os.getenv("ALGORITHM"))
    except JWTError:
        raise HTTPException(status_code=500, detail="JWT encoding error")

    # Return the response including the user's specific role
    # return {"access_token": access_token, "token_type": "bearer"}

    if (user_role is not "not_assigned"):
        response = {
            "Message": "logged in successfully",
            "access_token": access_token,
            "token_type": "bearer",
            "email": user.email,
            "office": user.office,
            "id": user.user_id,
            "role": user_role
        }
        return response
    else:
        return {"Message": "This user doesn't have the priviledge to use this system. Please contact your administrator."}
