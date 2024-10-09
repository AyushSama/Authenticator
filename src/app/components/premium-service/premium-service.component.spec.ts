import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumServiceComponent } from './premium-service.component';

describe('PremiumServiceComponent', () => {
  let component: PremiumServiceComponent;
  let fixture: ComponentFixture<PremiumServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PremiumServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PremiumServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
