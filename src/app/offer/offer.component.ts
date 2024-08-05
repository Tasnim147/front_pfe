import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OfferService } from '../service/OfferService'; // Assurez-vous que ce service est bien importé et créé
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-offer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {
  offers: any[] = [];
  offerForm: FormGroup;
  isEditing: boolean = false;
  currentOfferId: number | null = null;

  constructor(
    private offerService: OfferService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.offerForm = this.fb.group({
      type: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
      price: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadOffers();
  }

  loadOffers(): void {
    this.offerService.getOffers().subscribe(
      (response) => {
        this.offers = response;
      },
      (error) => {
        console.error('Erreur lors du chargement des offres', error);
      }
    );
  }

  addOffer(): void {
    if (this.offerForm.valid) {
      this.offerService.createOffer(this.offerForm.value).subscribe(
        (response) => {
          this.loadOffers();
          this.offerForm.reset();
          this.snackBar.open('Offre ajoutée avec succès!', 'Fermer', {
            duration: 3000,
          });
        },
        (error:any) => {
          console.error('Erreur lors de l\'ajout de l\'offre', error);
          this.snackBar.open('Erreur lors de l\'ajout de l\'offre', 'Fermer', {
            duration: 3000,
          });
        }
      );
    } else {
      this.snackBar.open('Veuillez remplir le formulaire correctement', 'Fermer', {
        duration: 3000,
      });
    }
  }

  updateOffer(): void {
    if (this.offerForm.valid && this.currentOfferId !== null) {
      this.offerService.updateOffer(this.currentOfferId, this.offerForm.value).subscribe(
        (response) => {
          this.loadOffers();
          this.resetForm();
          this.snackBar.open('Offre mise à jour avec succès!', 'Fermer', {
            duration: 3000,
          });
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de l\'offre', error);
          this.snackBar.open('Erreur lors de la mise à jour de l\'offre', 'Fermer', {
            duration: 3000,
          });
        }
      );
    }
  }

  editOffer(offer: any): void {
    this.isEditing = true;
    this.currentOfferId = offer.id;
    this.offerForm.patchValue({
      type: offer.type,
      name: offer.name,
      description: offer.description,
      price: offer.price
    });
  }

  deleteOffer(id: number): void {
    this.offerService.deleteOffer(id).subscribe(
      () => {
        this.loadOffers();
        this.snackBar.open('Offre supprimée avec succès!', 'Fermer', {
          duration: 3000,
        });
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'offre', error);
        this.snackBar.open('Erreur lors de la suppression de l\'offre', 'Fermer', {
          duration: 3000,
        });
      }
    );
  }

  resetForm(): void {
    this.isEditing = false;
    this.currentOfferId = null;
    this.offerForm.reset();
  }
}
