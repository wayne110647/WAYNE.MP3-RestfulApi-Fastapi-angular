from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import SessionLocal
from api import crud
from schemas import song_schema
from fastapi import File, UploadFile, Form # สามทหารเสือสำหรับจัดการไฟล์
import shutil # ตัวนี้เอาไว้ก๊อปไฟล์จาก Memory ลง Hard Drive
import os # ตัวนี้เอาไว้เช็ก/สร้างโฟลเดอร์เก็บเพลง

router = APIRouter()

# Dependency สำหรับสร้าง DB Session ในแต่ละ Request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/songs", response_model=list[song_schema.Song])
def get_songs_controller(db: Session = Depends(get_db)):
    return crud.get_songs(db)

@router.post("/songs", response_model=song_schema.Song)
def create_song_controller(
    title: str = Form(...), 
    artist: str = Form(...), 
    albumCover: str = Form(...), 
    file: UploadFile = File(...), # ตัวแสบอยู่นี่
    db: Session = Depends(get_db)
):
    # แล้วค่อยส่งค่าไปให้ crud ทำงานต่อ
    return crud.create_song(db=db, title=title, artist=artist, albumCover=albumCover, file=file)

@router.delete("/songs/{song_id}")
def delete_song_controller(song_id: int, db: Session = Depends(get_db)):
    success = crud.delete_song(db, song_id)
    if not success:
        raise HTTPException(status_code=404, detail="Song not found")
    return {"message": "Success"}

@router.patch("/songs/{song_id}")
def update_song_controller(song_id: int, title: str = Form(...), db: Session = Depends(get_db)):
    updated_song = crud.update_song_title(db, song_id=song_id, new_title=title)
    if not updated_song:
        return {"message": "ไม่เจอเพลงนี้ว่ะพี่"}
    return updated_song