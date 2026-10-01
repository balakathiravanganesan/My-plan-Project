import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoriteChildComponent } from './favorite-child.component';

describe('FavoriteChildComponent', () => {
  let component: FavoriteChildComponent;
  let fixture: ComponentFixture<FavoriteChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteChildComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoriteChildComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
