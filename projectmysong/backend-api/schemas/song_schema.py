from pydantic import BaseModel

class SongBase(BaseModel):
    title: str
    artist: str
    albumCover: str
    songFile: str

class SongCreate(SongBase):
    pass

class Song(SongBase):
    id: int
    class Config:
        orm_mode = True # สำคัญสลัด เพื่อให้ Pydantic อ่านข้อมูลจาก SQLAlchemy ได้