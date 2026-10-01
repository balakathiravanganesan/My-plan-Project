import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodaysIdeaChildComponent } from './todays-idea-child.component';

describe('TodaysIdeaChildComponent', () => {
  let component: TodaysIdeaChildComponent;
  let fixture: ComponentFixture<TodaysIdeaChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodaysIdeaChildComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodaysIdeaChildComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
