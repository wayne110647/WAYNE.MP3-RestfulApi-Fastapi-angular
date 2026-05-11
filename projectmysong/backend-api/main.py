from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.controllers import router as song_controller
from db.database import engine, Base
from fastapi.staticfiles import StaticFiles

# สร้าง Table อัตโนมัติ (เหมือนตอนมึง Install Module ใน Odoo)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Wayne Store API")

# เปิด CORS เพื่อให้ Angular (Port 4200) คุยกับ FastAPI (Port 8000) ได้
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ลงทะเบียน Controller
app.include_router(song_controller, prefix="/api", tags=["Songs"])
app.mount("/api/music", StaticFiles(directory="music"), name="music")

@app.get("/")
def root():
    return {"message": "API is running, let's go Pump!"}