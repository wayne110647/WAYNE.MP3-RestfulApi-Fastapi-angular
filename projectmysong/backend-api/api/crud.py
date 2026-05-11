from sqlalchemy.orm import Session
from db import models
from schemas import song_schema
from fastapi import UploadFile, File, Form
import shutil
import os

def get_songs(db: Session):
    return db.query(models.Song).all()



def create_song(db: Session, title: str = Form(...), artist: str = Form(...), albumCover: str = Form(...), file: UploadFile = File(...)):
    # 1. สร้างโฟลเดอร์เก็บเพลงถ้ายังไม่มี
    music_path = "music"
    if not os.path.exists(music_path):
        os.makedirs(music_path)
    
    # 2. เซฟไฟล์ MP3 ลงเครื่อง
    file_location = f"{music_path}/{file.filename}"
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # 3. บันทึกข้อมูลลง DB (เปลี่ยนจาก song.dict() เป็นระบุฟิลด์เอง)
    db_song = models.Song(
        title=title,
        artist=artist,
        albumCover=albumCover,
        songFile=file.filename # เอาชื่อไฟล์ไปเก็บไว้ใช้เปิดฟัง
    )
    
    db.add(db_song)
    db.commit()
    db.refresh(db_song)
    return db_song


def delete_song(db: Session, song_id: int):
    db_song = db.query(models.Song).filter(models.Song.id == song_id).first()
    if db_song:
        db.delete(db_song)
        db.commit()
        return True
    return False

def update_song_title(db: Session, song_id: int, new_title: str):
    # 1. หาเพลงที่ต้องการก่อน
    db_song = db.query(models.Song).filter(models.Song.id == song_id).first()
    if db_song:
        # 2. เปลี่ยนชื่อมันซะ!
        db_song.title = new_title
        db.commit() # เซฟลง DB
        db.refresh(db_song) # อัปเดตข้อมูลในตัวแปร
    return db_song