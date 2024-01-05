from fastapi import APIRouter,  HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from pydantic import BaseModel
from typing import List
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session
import json


router = APIRouter(
    prefix="/pr",
    tags=["Purchase Requests"]
)


class Item(BaseModel):
    unit: str
    item_name: str
    item_description: str
    item_quantity: int
    unit_cost: int
    total: int


class PRBase(BaseModel):
    office: str
    purpose: str
    source_of_fund: str
    Requested_by: str
    Desig_Req: str
    Recommending: str
    Desig_Reco: str
    Approved_By: str
    Desig_Appr: str
    items: List[Item]


class PRSigBase(BaseModel):
    purpose: str
    source_of_fund: str
    Requested_by: str
    Desig_Req: str
    Recommending: str
    Desig_Reco: str
    Approved_By: str
    Desig_Appr: str


class PRIteBase(BaseModel):
    items: List[Item]


class Office(BaseModel):
    office: str


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


models.Base.metadata.create_all(bind=engine)


@router.get("/get-pr")
async def fetch_pr(db: Session = Depends(get_db),
                   # payload: dict = Depends(verify_token)
                   ):
    try:
        prs = db.query(models.temp_PR).all()
        return {"message": "Succesfully Fetched Data", "pr": prs}
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error fetching PRs: {str(e)}")


@router.get("/get-pr/{pr_id}")
async def fetch_pr_by_id(pr_id: int, db: Session = Depends(get_db),
                         #   payload: dict = Depends(verify_token)
                         ):
    try:
        pr = db.query(models.temp_PR).filter(
            models.temp_PR.temp_id == pr_id).first()
        if pr:
            return {"message": "PR Fetched Successfully", "pr": pr}
        else:
            raise HTTPException(status_code=404, detail="PR not found")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error fetching PR: {str(e)}")


@router.post("/get-pr-by-office")
async def fetch_pr_by_office(office_data: Office, db: Session = Depends(get_db)):
    try:
        prs = db.query(models.temp_PR).filter(
            models.temp_PR.office == office_data.office).all()
        return {"message": "Successfully Fetched Data", "pr": prs}
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error fetching PRs by office: {str(e)}"
        )


@router.post("/create-pr")
async def create_pr(pr: PRBase, db: Session = Depends(get_db),
                    # payload: dict = Depends(verify_token)
                    ):
    try:
        # Convert items to a list of dictionaries
        items_as_dicts = [item.model_dump() for item in pr.items]

        # Convert items to a JSON string
        items_json = json.dumps(items_as_dicts)

        temp_pr = models.temp_PR(
            office=pr.office,
            purpose=pr.purpose,
            source_of_fund=pr.source_of_fund,
            Requested_by=pr.Requested_by,
            Desig_Req=pr.Desig_Req,
            Recommending=pr.Recommending,
            Desig_Reco=pr.Desig_Reco,
            Approved_By=pr.Approved_By,
            Desig_Appr=pr.Desig_Appr,
            json_items=items_json)

        db.add(temp_pr)
        db.commit()
        db.refresh(temp_pr)
        return {"message": "Added Successfully"}
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An error occurred: {str(e)}")


@router.put("/edit-prSig/{pr_id}")
async def edit_prSig(pr_id: int, pr_data: PRSigBase, db: Session = Depends(get_db)):
    try:
        temp_pr = db.query(models.temp_PR).filter(
            models.temp_PR.temp_id == pr_id
        ).first()

        if temp_pr:
            temp_pr.purpose = pr_data.purpose
            temp_pr.source_of_fund = pr_data.source_of_fund
            temp_pr.Requested_by = pr_data.Requested_by
            temp_pr.Desig_Req = pr_data.Desig_Req
            temp_pr.Recommending = pr_data.Recommending
            temp_pr.Desig_Reco = pr_data.Desig_Reco
            temp_pr.Approved_By = pr_data.Approved_By
            temp_pr.Desig_Appr = pr_data.Desig_Appr

            db.commit()
            db.refresh(temp_pr)
            return {"message": "PR Updated Successfully", "pr": temp_pr}
        else:
            raise HTTPException(status_code=404, detail="PR not Found")

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An error occurred: {str(e)}"
        )


@router.put("/edit-prIte/{pr_id}")
async def edit_prIte(pr_id: int, pr_data: PRIteBase, db: Session = Depends(get_db)):
    try:
        temp_pr = db.query(models.temp_PR).filter(
            models.temp_PR.temp_id == pr_id
        ).first()

        if temp_pr:
            items_as_dicts = [item.model_dump() for item in pr_data.items]
            items_json = json.dumps(items_as_dicts)
            temp_pr.json_items = items_json
            db.commit()
            db.refresh(temp_pr)
            return {"message": "PR Updated Successfully", "pr": temp_pr}
        else:
            raise HTTPException(status_code=404, detail="PR not Found")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An error occurred: {str(e)}"
        )


@router.put("/submit/{pr_id}")
async def submit(pr_id: int, db: Session = Depends(get_db),
                 #    payload: dict = Depends(verify_token)
                 ):

    temp_pr = db.query(models.temp_PR).filter(
        models.temp_PR.temp_id == pr_id).first()

    if temp_pr:

        main_pr = models.main_PR(
            office=temp_pr.office,
            purpose=temp_pr.purpose,
            source_of_fund=temp_pr.source_of_fund,
            Requested_by=temp_pr.Requested_by,
            Desig_Req=temp_pr.Desig_Req,
            Recommending=temp_pr.Recommending,
            Desig_Reco=temp_pr.Desig_Reco,
            Approved_By=temp_pr.Approved_By,
            Desig_Appr=temp_pr.Desig_Appr,
            json_items=temp_pr.json_items,
            temp_id=pr_id,
            status="pending",
        )

        db.add(main_pr)

        temp_pr.is_submitted = True
        db.commit()
        db.refresh(temp_pr)
        db.refresh(main_pr)
        return {"message": "PR Submitted", "pr": temp_pr}
    else:
        raise HTTPException(status_code=404, detail="PR not found")


@router.delete("/delete-pr/{pr_id}")
async def delete_pr(pr_id: int, db: Session = Depends(get_db),
                    # payload: dict = Depends(verify_token)
                    ):
    temp_pr = db.query(models.temp_PR).filter(
        models.temp_PR.temp_id == pr_id).first()
    if temp_pr:
        db.delete(temp_pr)
        db.commit()
        return {"Message": "PR Deleted Succesfully"}
    else:
        raise HTTPException(status_code=404, detail="PR not found")
