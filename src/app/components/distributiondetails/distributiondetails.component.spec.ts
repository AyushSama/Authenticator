import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributiondetailsComponent } from './distributiondetails.component';

describe('DistributiondetailsComponent', () => {
  let component: DistributiondetailsComponent;
  let fixture: ComponentFixture<DistributiondetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistributiondetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistributiondetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
