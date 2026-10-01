import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewAllChildComponent } from './view-all-child.component';

describe('ViewAllChildComponent', () => {
  let component: ViewAllChildComponent;
  let fixture: ComponentFixture<ViewAllChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAllChildComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewAllChildComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
