import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsdataComponent } from './reportsdata.component';

describe('ReportsdataComponent', () => {
  let component: ReportsdataComponent;
  let fixture: ComponentFixture<ReportsdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsdataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
