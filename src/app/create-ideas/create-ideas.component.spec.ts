import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateIdeasComponent } from './create-ideas.component';

describe('CreateIdeasComponent', () => {
  let component: CreateIdeasComponent;
  let fixture: ComponentFixture<CreateIdeasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateIdeasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateIdeasComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
