import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  private apiUrl = 'https://dev-api.evitalrx.in/v1/catalog/';
  private key = 'NAQ5XNukAVMPGdbJkjJcMUK9DyYBeTpu';

  constructor(private http: HttpClient) { }

  searchMedicines(query: string): Observable<any> {
    const body = {
      searchstring: query,
      apikey: this.key
    };

    return this.http.post(`${this.apiUrl}/medicines/search`, body);
  }
  addPatient(patient: any): Observable<any> {
    const url = "https://dev-api.evitalrx.in/v1/fulfillment/patients/add ";
    const key = "wFIMP75eG1sQEh8vVAdXykgzF4mLhDw3";
    const body = {
      ...patient,
      apikey: key
    };
    return this.http.post(`${url}`,body);
  }

  placeOrder(order: any): Observable<any> {
    const url = "https://dev-api.evitalrx.in/v1/fulfillment/orders/place_order";
    const body = {
      ...order,
      apikey: 'wFIMP75eG1sQEh8vVAdXykgzF4mLhDw3'
    };
    return this.http.post(`${url}`,body);
  }

}
