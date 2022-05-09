from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from preloaded_models import *
from functions import *
from get_custom_model_data import get_custom_model_data

# uvicorn main:app --reload

app = FastAPI()

origins = [
    "http://fluxbalanceanalysis.com",
    "https://fluxbalanceanalysis.com",
    "https://fba.garrettroell.com",
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return "This is the server for fba.garrettroell.com"


@app.get("/ecoli_reactions_T")
async def ecoli_reactions_T():
    return textbook_reactions(transpose=True)


@app.get("/ecoli_metabolites_T")
async def ecoli_metabolites_T():
    return textbook_metabolites(transpose=True)


@app.get("/scerevisiae_metabolites_T")
async def scerevisiae_metabolites_T():
    return scerevisiae_metabolites(transpose=True)


@app.get("/scerevisiae_reactions_T")
async def scerevisiae_reactions_T():
    return scerevisiae_reactions(transpose=True)


@app.post("/optimize_model")
async def optimize_model(data: dict):
    return find_optimal_fluxes(data)


@app.post("/upload_model")
async def upload_model(data: dict):
    return get_custom_model_data(data)
    # print(data)
    # return {"data": data}