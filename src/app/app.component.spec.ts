import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component'; // Assurez-vous que AppComponent est standalone
import { RouterOutlet } from '@angular/router'; // Importez RouterOutlet si nécessaire
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importez HttpClientTestingModule
import { NavbarComponent } from './navbar/navbar.component'; // Importez le NavbarComponent
import { FooterComponent } from './footer/footer.component';
import { RouterTestingModule } from "@angular/router/testing";
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterOutlet,
        HttpClientTestingModule, // Ajoutez HttpClientTestingModule
        RouterTestingModule,
        NavbarComponent,
        FooterComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Welcome to Orange'); // Ajustez selon votre contenu
  });
});
