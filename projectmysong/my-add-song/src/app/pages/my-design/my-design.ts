import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';



@Component({
  selector: 'app-my-design',
  standalone: true,
  imports: [UpperCasePipe,CommonModule],
  templateUrl: './my-design.html',
  styleUrl: './my-design.css',
})
export class MyDesign implements OnInit {

  songs: any[] = [];
  selectedSong: any = null;
  audio = new Audio(); // 1. สร้างตัวแปร Audio ทิ้งไว้เลย
  isPlaying = false;

  constructor(private http: HttpClient , private cdr: ChangeDetectorRef) {} // 3. Inject HttpClient

  ngOnInit() {
    this.fetchSongs(); // 4. พอเปิดหน้าปุ๊บ ให้ไปดึงเพลงมาทันที
  }

  fetchSongs() {
    this.http.get<any[]>('http://127.0.0.1:8000/api/songs').subscribe((data) => {
      this.songs = data;
      if (this.songs.length > 0) {
        this.selectSong(this.songs[0]); // เลือกเพลงแรก
      }
      this.cdr.detectChanges();
    });
  }

  progress = 0;

seekSong(event: any) {
  const seekTime = event.target.value;
  this.audio.currentTime = seekTime;
}

// 2. ฟังก์ชันแปลงเวลา (วินาที -> 0:00) เอาไว้โชว์สวยๆ
formatTime(time: number): string {
  if (!time) return '0:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

selectSong(song: any) {
  this.selectedSong = song;
  const songUrl = `http://127.0.0.1:8000/api/music/${song.songFile}`;
  this.audio.src = songUrl;
  this.audio.load();

  // 💡 ดึงเวลาเพลงมาทำหลอด Progress
  this.audio.ontimeupdate = () => {
    this.progress = (this.audio.currentTime / this.audio.duration) * 100;
  };
  
  // เมื่อเพลงจบ ให้รีเซ็ต
  this.audio.onended = () => {
    this.isPlaying = false;
    this.progress = 0;
  };

  this.audio.ontimeupdate = () => {
    // Angular จะรับรู้การเปลี่ยนแปลงเวลาเองผ่าน Binding ใน HTML
  };
}

togglePlay() {
  if (!this.selectedSong) return;

  if (this.isPlaying) {
    this.audio.pause();
  } else {
    this.audio.play();
  }
  this.isPlaying = !this.isPlaying;
}

// ฟังก์ชันปรับเสียง (0.0 ถึง 1.0)
changeVolume(event: any) {
  const volumeValue = event.target.value;
  this.audio.volume = volumeValue;
}

}




