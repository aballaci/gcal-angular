import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressShortComponent } from './address-short.component';

describe('AddressShortComponent', () => {
  let component: AddressShortComponent;
  let fixture: ComponentFixture<AddressShortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressShortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
