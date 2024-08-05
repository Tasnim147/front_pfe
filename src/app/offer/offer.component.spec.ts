import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OfferService } from '../service/OfferService';

describe('OfferService', () => {
  let service: OfferService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]  // Make sure to include HttpClientTestingModule
    });
    service = TestBed.inject(OfferService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
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

  it('should retrieve offers by type from the API via GET', () => {
    const dummyOffers = [
      { id: 1, type: 'Type1', name: 'Offer1', description: 'Description1', price: 100 },
      { id: 2, type: 'Type1', name: 'Offer2', description: 'Description2', price: 200 }
    ];

    service.getOffersByType('Type1').subscribe(offers => {
      expect(offers.length).toBe(2);
      expect(offers).toEqual(dummyOffers);
    });

    const request = httpMock.expectOne(`${service['apiUrl']}/type/Type1`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyOffers);
  });

  it('should add an offer via POST', () => {
    const newOffer = { id: 3, type: 'Type3', name: 'Offer3', description: 'Description3', price: 300 };

    service.createOffer(newOffer).subscribe(offer => {
      expect(offer).toEqual(newOffer);
    });

    const request = httpMock.expectOne(`${service['apiUrl']}`);
    expect(request.request.method).toBe('POST');
    request.flush(newOffer);
  });

  it('should retrieve an offer by id from the API via GET', () => {
    const dummyOffer = { id: 1, type: 'Type1', name: 'Offer1', description: 'Description1', price: 100 };

    service.getOfferById(1).subscribe(offer => {
      expect(offer).toEqual(dummyOffer);
    });

    const request = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyOffer);
  });

  it('should update an offer via PUT', () => {
    const updatedOffer = { id: 1, type: 'Type1', name: 'Updated Offer', description: 'Updated Description', price: 150 };

    service.updateOffer(updatedOffer.id, updatedOffer).subscribe(offer => {
      expect(offer).toEqual(updatedOffer);
    });

    const request = httpMock.expectOne(`${service['apiUrl']}/${updatedOffer.id}`);
    expect(request.request.method).toBe('PUT');
    request.flush(updatedOffer);
  });

  it('should delete an offer via DELETE', () => {
    const offerId = 1;
  
    service.deleteOffer(offerId).subscribe(response => {
      expect(response).toBeNull(); // Change `undefined` to `null`
    });
  
    const request = httpMock.expectOne(`${service['apiUrl']}/${offerId}`);
    expect(request.request.method).toBe('DELETE');
    request.flush(null); // Ensure `null` is flushed
  });
  
});
