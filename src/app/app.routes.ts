import { Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { OfferComponent } from './offer/offer.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: 'product', component: ProductComponent },
  { path: 'offer', component: OfferComponent },
  { path: 'home', component: HomeComponent }, // Ajout de la route pour /home
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirection vers /home par défaut
  { path: '**', redirectTo: '/home' } // Redirection pour toutes les autres routes non définies
];
