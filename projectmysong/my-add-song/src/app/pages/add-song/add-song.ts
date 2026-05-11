import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-add-song',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-song.html',
  styleUrl: './add-song.css',
})
export class AddSong {
newSong = {
    title: '',
    artist: '',
    albumCover: ''
  };
  
  // 2. ตัวแปรเก็บไฟล์ binary
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  // 3. ฟังก์ชันดักจับไฟล์ตอนเลือก
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  // 4. ฟังก์ชันส่งของ (ยิงไปหา @app.post("/songs") ที่เราแก้กันไว้)
  uploadSong() {
    if (!this.selectedFile || !this.newSong.title) {
      alert("กรอกข้อมูลให้ครบก่อนพี่!");
      return;
    }

    const formData = new FormData();
    // ชื่อ key (ฝั่งซ้าย) ต้องตรงกับใน Python นะพี่
    formData.append('title', this.newSong.title);
    formData.append('artist', this.newSong.artist);
    formData.append('albumCover', this.newSong.albumCover);
    formData.append('file', this.selectedFile);

    this.http.post('http://127.0.0.1:8000/api/songs', formData).subscribe({
      next: (res) => {
        alert("แอดเพลงสำเร็จ! เดี๋ยวเครื่อง Walkman จะมีเพลงใหม่แล้ว");
        // ล้างฟอร์ม
        this.newSong = { title: '', artist: '', albumCover: '' };
        this.selectedFile = null;
      },
      error: (err) => {
        console.error(err);
        alert("ระเบิดจั๊บพี่! เช็ก Backend ด่วน");
      }
    });
  }


}

