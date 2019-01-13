import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobFilterComponent } from './mob-filter.component';

describe('MobFilterComponent', () => {
  let component: MobFilterComponent;
  let fixture: ComponentFixture<MobFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
