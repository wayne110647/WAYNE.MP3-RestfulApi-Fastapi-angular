import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDesign } from './my-design';

describe('MyDesign', () => {
  let component: MyDesign;
  let fixture: ComponentFixture<MyDesign>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyDesign],
    }).compileComponents();

    fixture = TestBed.createComponent(MyDesign);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
