import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobMenuBottomComponent } from './mob-menu-bottom.component';

describe('MobMenuBottomComponent', () => {
  let component: MobMenuBottomComponent;
  let fixture: ComponentFixture<MobMenuBottomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobMenuBottomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobMenuBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
