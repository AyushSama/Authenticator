import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageaccountdetailsComponent } from './manageaccountdetails.component';

describe('ManageaccountdetailsComponent', () => {
  let component: ManageaccountdetailsComponent;
  let fixture: ComponentFixture<ManageaccountdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageaccountdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageaccountdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
