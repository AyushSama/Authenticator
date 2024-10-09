import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SCPLComponent } from './scpl.component';

describe('SCPLComponent', () => {
  let component: SCPLComponent;
  let fixture: ComponentFixture<SCPLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SCPLComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SCPLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
