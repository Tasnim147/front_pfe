import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component'; // Assurez-vous que HomeComponent est standalone
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, HttpClientTestingModule] // Utilisez imports au lieu de declarations
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
