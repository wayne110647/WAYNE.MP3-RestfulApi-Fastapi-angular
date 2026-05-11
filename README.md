อันนี้เป็นโปรเจค Mp3 ใช้ Angular + fastapi (Restfulapi) ในการทำสามารถคลิ๊กเข้าไปทดสอบได้

📝 คำอธิบายโปรเจกต์ (ภาษาไทย)
WAYNE.MP3 - ระบบเครื่องเล่นเพลง Full-stack (FastAPI + Angular)

โปรเจกต์นี้คือเครื่องเล่นเพลงเว็บแอปพลิเคชันที่ผสมผสานดีไซน์ยุค 90s/Y2K เข้ากับเทคโนโลยีสมัยใหม่ โดยเน้นการจัดการข้อมูลผ่าน RESTful API อย่างมีประสิทธิภาพ

Frontend: ใช้ Angular จัดการ UI ที่ซับซ้อนและการควบคุมระบบเสียง (Audio Control) แบบ Real-time

Backend: ใช้ FastAPI (Python) เป็นหัวใจหลักในการส่งข้อมูลเพลงและจัดการ Logic ต่างๆ ผ่าน API ที่รวดเร็ว

Concept: แรงบันดาลใจจาก Sony Walkman และงานภาพสไตล์ Wong Kar-wai เพื่อสร้างประสบการณ์การฟังเพลงที่แตกต่าง

graph LR
    subgraph "Frontend (Angular)"
    A[User Interface / Walkman Design] --> B[Audio Service]
    B --> C[HTTP Client]
    end

    subgraph "Backend (FastAPI)"
    C -- "JSON Request" --> D[RESTful API Endpoints]
    D -- "Logic / Processing" --> E[Database / Music Storage]
    E -- "Data / Stream" --> D
    end

    D -- "JSON Response / MP3 Stream" --> C
    C --> B
    B --> A

    —
    📝 Project Description (English Version)
WAYNE.MP3 - A Full-stack Music Experience (FastAPI + Angular)

This project is a modern web-based music player inspired by 90s/Y2K aesthetics, specifically the iconic Sony Walkman series. It demonstrates a seamless integration between a high-performance FastAPI backend and a reactive Angular frontend.

Frontend: Developed with Angular (TypeScript), featuring a custom-built audio controller, real-time seek bar, and dynamic volume management.

Backend: Powered by FastAPI (Python), providing a robust RESTful API to serve music data and stream audio files with minimal latency.

Concept: Blending vintage hardware vibes with modern software architecture to deliver a unique user experience.


graph TD
    subgraph "Client Side (Frontend)"
    A["Angular Application (UI/UX)"] 
    B["Audio Control Service"] 
    C["REST API Client (HttpClient)"]
    end

    subgraph "Server Side (Backend)"
    D["FastAPI Server"] 
    E["Audio Data Streamer"] 
    F["Music Files / Database"]
    end

    %% Interaction Flow
    A <--> B
    B <--> C
    C -- "HTTP GET/POST (JSON)" --> D
    D <--> E
    E <--> F
    D -- "Stream Audio / JSON Response" --> C



    
