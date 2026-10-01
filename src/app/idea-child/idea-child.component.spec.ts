import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdeaChildComponent } from './idea-child.component';

describe('IdeaChildComponent', () => {
  let component: IdeaChildComponent;
  let fixture: ComponentFixture<IdeaChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdeaChildComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IdeaChildComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
