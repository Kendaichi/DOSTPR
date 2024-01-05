from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import routers.pr as pr
import auth.auth as auth
import routers.supply as supply


app = FastAPI()

origins = [
    "http://localhost:5173",
    "https://6srqqqzf-5173.asse.devtunnels.ms",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(supply.router)
app.include_router(pr.router)
app.include_router(auth.router)
