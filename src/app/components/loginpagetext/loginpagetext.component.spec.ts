import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginpagetextComponent } from './loginpagetext.component';

describe('LoginpagetextComponent', () => {
  let component: LoginpagetextComponent;
  let fixture: ComponentFixture<LoginpagetextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginpagetextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginpagetextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
