import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetHandleComponent } from './bottom-sheet-handle.component';

describe('BottomSheetHandleComponent', () => {
  let component: BottomSheetHandleComponent;
  let fixture: ComponentFixture<BottomSheetHandleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomSheetHandleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomSheetHandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
