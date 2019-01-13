import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobDetailComponent } from './mob-detail.component';

describe('MobDetailComponent', () => {
  let component: MobDetailComponent;
  let fixture: ComponentFixture<MobDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
