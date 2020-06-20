import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeliveryChallanComponent } from './edit-delivery-challan.component';

describe('EditDeliveryChallanComponent', () => {
  let component: EditDeliveryChallanComponent;
  let fixture: ComponentFixture<EditDeliveryChallanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDeliveryChallanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDeliveryChallanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
