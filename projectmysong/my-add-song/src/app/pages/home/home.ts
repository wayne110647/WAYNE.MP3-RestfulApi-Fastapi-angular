import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  constructor(private router: Router) {}

  // 1. ฟังก์ชันเมื่อเมาส์ "เริ่ม" แตะ
  onHoverStart() {
    console.log('User is hovering on the album stack!');
    // ใส่ Logic เพิ่มเติมที่นี่ (เช่น เปลี่ยนสีพื้นหลัง หรือเริ่มเล่น Effect)
  }

  // 2. ฟังก์ชันเมื่อเมาส์ "ออกจาก" พื้นที่แตะ (ตัวที่หายไป)
  onHoverEnd() {
    console.log('Hover Ended: Return to normal state');
    // ใส่ Logic เพื่อ Reset ค่าต่างๆ กลับเป็นปกติ
  }

  // 3. ฟังก์ชันหลักเมื่อมีการ "คลิก"
  handleAlbumAction() {
    console.log('Album Function Triggered!');
    // นำทางไปหน้า MyDesign ตามที่ออกแบบไว้ใน Mockup
    this.router.navigate(['/mydesign']);
  }
}