import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OfferService } from '../service/OfferService';

describe('OfferService', () => {
  let service: OfferService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OfferService] // Assurez-vous que le service est bien dans les providers
    });
    service = TestBed.inject(OfferService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Vérifiez qu'il n'y a pas de requêtes HTTP en attente
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve offers from the API via GET', () => {
    const dummyOffers = [
      { id: 1, type: 'Type1', name: 'Offer1', description: 'Description1', price: 100 },
      { id: 2, type: 'Type2', name: 'Offer2', description: 'Description2', price: 200 }
    ];

    service.getOffers().subscribe(offers => {
      expect(offers.length).toBe(2);
      expect(offers).toEqual(dummyOffers);
    });

    const request = httpMock.expectOne(`${service['apiUrl']}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyOffers);
  });

  // Ajoutez d'autres tests ici comme vous l'avez fait
});
