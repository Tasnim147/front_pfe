import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component'; // Importez le NavbarComponent
import { FooterComponent } from './footer/footer.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, MatSnackBarModule], // Imports as needed
  templateUrl: './app.component.html',  // Use only one of these
  styleUrls: ['./app.component.css']    // Correct the property name
})
export class AppComponent {
  title = 'my-angular-frontend';
}

