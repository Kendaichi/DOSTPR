from fastapi import APIRouter,  HTTPException, Depends
from pydantic import BaseModel
from typing import List
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session
import json
from sqlalchemy.orm import joinedload


router = APIRouter(
    prefix="/submitted",
    tags=["Supply Purchase Requests"]
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


class Office(BaseModel):
    office: str


class UpdateStatus(BaseModel):
    status: str


class SupplierModel(BaseModel):
    sup_name: str
    sup_add: str
    prices: str


class AocBase(BaseModel):
    # suppliers: List[SupplierModel]
    pr_id: int


class SupplierBase(BaseModel):
    suppliers: List[SupplierModel]


class WinnersBase(BaseModel):
    winners: str


class PoBase(BaseModel):
    aoc_id: int


class EditPo(BaseModel):
    mode_of_procurement: str
    place_of_delivery: str
    date_of_delivery: str
    delivery_term: str
    payment_term: str


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


models.Base.metadata.create_all(bind=engine)


@router.get("/get-submitted-pr")
async def fetch_pr(db: Session = Depends(get_db),
                   # payload: dict = Depends(verify_token)
                   ):
    try:
        prs = db.query(models.main_PR).all()
        return {"message": "Succesfully Fetched Data", "pr": prs}
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error fetching PRs: {str(e)}")


@router.get("/get-submitted-pr/{pr_id}")
async def fetch_pr_by_id(pr_id: int, db: Session = Depends(get_db),
                         #   payload: dict = Depends(verify_token)
                         ):
    try:
        pr = db.query(models.main_PR).filter(
            models.main_PR.pr_id == pr_id).first()
        if pr:
            return {"message": "PR Fetched Successfully", "pr": pr}
        else:
            raise HTTPException(status_code=404, detail="PR not found")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error fetching PR: {str(e)}")


@router.put("/status/{pr_id}")
async def set_Status(pr_id: int, status_data: UpdateStatus, db: Session = Depends(get_db),):
    try:
        pr = db.query(models.main_PR).filter(
            models.main_PR.pr_id == pr_id).first()
        if pr:
            pr.status = status_data.status
            db.commit()
            db.refresh(pr)
        else:
            raise HTTPException(status_code=404, detail="PR Not Found")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error Occurred: {str(e)}")


@router.delete("/delete-pr/{pr_id}")
async def delete_pr(pr_id: int, db: Session = Depends(get_db),
                    # payload: dict = Depends(verify_token)
                    ):
    pr = db.query(models.main_PR).filter(
        models.main_PR.pr_id == pr_id).first()

    if pr:
        temp_pr = db.query(models.temp_PR).filter(
            models.temp_PR.temp_id == pr.temp_id).first()

        if temp_pr:
            temp_pr.is_submitted = False
            db.commit()
            db.delete(pr)
            db.commit()
            return {"Message": "PR Deleted Succesfully"}
        else:
            db.delete(pr)
            db.commit()
            return {"Message": "PR Deleted Succesfully"}
    else:
        raise HTTPException(status_code=404, detail="PR not found")


@router.post("/add-aoc")
async def create_aoc(aoc: AocBase, db: Session = Depends(get_db)):
    try:
        # suppliers_json = json.dumps([s.model_dump() for s in aoc.suppliers])
        aoc = models.Aoc(
            # suppliers=suppliers_json,
            pr_id=aoc.pr_id
        )
        db.add(aoc)
        db.commit()
        db.refresh(aoc)
        return {"message": "Added Successfully"}
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An error occurred: {str(e)}")


@router.get("/fetch-aoc")
async def get_all_main_pr_with_aoc(db: Session = Depends(get_db)):
    aoc = (
        db.query(models.Aoc)
        .options(joinedload(models.Aoc.pr))
        .all()
    )
    if aoc:
        return {"message": "AOCs Fetched Successfully", "aoc": aoc}
    else:
        raise HTTPException(status_code=404, detail="No AOCs found")


@router.get("/get-aocDetails/{aoc_id}")
async def get_aoc_detail(aoc_id: int, db: Session = Depends(get_db)):
    try:
        aoc = (
            db.query(models.Aoc)
            .filter(models.Aoc.aoc_id == aoc_id)
            .options(joinedload(models.Aoc.pr))
            .first()
        )

        if aoc:
            return {"message": "AOC Details Fetched Successfully", "aoc": aoc}
        else:
            raise HTTPException(status_code=404, detail="AOC not found")

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error fetching AOC details: {str(e)}"
        )


@router.put("/edit-AocSuppliers/{aoc_id}")
async def edit_aocSup(aoc_id: int, aoc_data: SupplierBase, db: Session = Depends(get_db)):
    try:
        aoc = db.query(models.Aoc).filter(
            models.Aoc.aoc_id == aoc_id
        ).first()

        if aoc:
            supplier_as_dicts = [supplier.model_dump()
                                 for supplier in aoc_data.suppliers]
            supplier_as_json = json.dumps(supplier_as_dicts)
            aoc.suppliers = supplier_as_json
            db.commit()
            db.refresh(aoc)
            return {"message": "Aoc Updated Succesfully", "aoc": aoc}
        else:
            raise HTTPException(status_code=404, detail="AOC not Found")

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An error Occured: {str(e)}"
        )


@router.put("/edit-AocWinners/{aoc_id}")
async def edit_aocWin(aoc_id: int, aoc_winners: WinnersBase, db: Session = Depends(get_db)):
    try:
        aoc = db.query(models.Aoc).filter(
            models.Aoc.aoc_id == aoc_id
        ).first()

        if aoc:
            aoc.winners = aoc_winners.winners
            db.commit()
            db.refresh(aoc)
            return {"message": "Aoc winners updated successfully"}
        else:
            raise HTTPException(status_code=404, detail="AOC not Found")

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An error Occured: {str(e)}"
        )


@router.post("/add-po")
async def create_po(po: PoBase, db: Session = Depends(get_db)):
    try:
        po = models.Po(
            aoc_id=po.aoc_id
        )
        db.add(po)
        db.commit()
        db.refresh(po)
        return {"message": "Added Succesfully"}
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An error occured: {str(e)}"
        )


@router.get("/fetch_po")
async def fetch_po(db: Session = Depends(get_db)):
    po = (
        db.query(models.Po)
        .options(joinedload(models.Po.aoc).load_only(models.Aoc.suppliers, models.Aoc.winners))
        .all()
    )

    if po:
        return {"message": "POs Fetched Successfully", "po": po}
    else:
        raise HTTPException(status_code=404, detail="No POs found")


@router.get("/get-poDetails/{po_id}")
async def get_po_details(po_id: int, db: Session = Depends(get_db)):
    try:
        po = (
            db.query(models.Po)
            .filter(models.Po.po_id == po_id)
            .options(joinedload(models.Po.aoc))
            .first()
        )

        if po:

            pr = (
                db.query(models.main_PR)
                .filter(models.main_PR.pr_id == po.aoc.pr_id)
                .first()
            )

            if pr:
                return {"message": "PO Details Fetched Succesfully", "po": po, "pr": pr}
        else:
            raise HTTPException(status_code=404, detail=f"PO not Found")

    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(
            status_code=500, detail=f"Error Fetching PO Details: {str(e)}"
        )


@router.put("/edit-po/{po_id}")
async def edit_po(po_id: int, edited_po: EditPo, db: Session = Depends(get_db)):
    try:
        # Retrieve the existing Po object from the database
        existing_po = db.query(models.Po).filter(
            models.Po.po_id == po_id).first()

        if existing_po is None:
            raise HTTPException(status_code=404, detail="PO not found")

        # Update the fields based on the values in edited_po
        existing_po.mode_of_procurement = edited_po.mode_of_procurement
        existing_po.place_of_delivery = edited_po.place_of_delivery
        existing_po.date_of_delivery = edited_po.date_of_delivery
        existing_po.delivery_term = edited_po.delivery_term
        existing_po.payment_term = edited_po.payment_term

        # Commit the changes to the database
        db.commit()

        return {"message": "PO updated successfully"}

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An error occurred: {str(e)}")
