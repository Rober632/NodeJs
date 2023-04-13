import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexJsComponent } from './index.js.component';

describe('IndexJsComponent', () => {
  let component: IndexJsComponent;
  let fixture: ComponentFixture<IndexJsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexJsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexJsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
