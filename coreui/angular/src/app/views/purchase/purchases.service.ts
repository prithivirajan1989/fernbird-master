import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PurchasesService {
  private purchaseUrl = 'http://localhost:3000/purchases';
  constructor(private http: HttpClient) {}


  createPurchase(purchase: any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.post(`${this.purchaseUrl}`, purchase, { headers: { 'Creator': '' }})
    .pipe(map((res: Response) => res));
  }


  editPurchase(id:any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.get(`${this.purchaseUrl}/${id}` , { headers: headers })
    .pipe(map((res: Response) => res));
  }

  updatePurchase(id: any, product: any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.put(`${this.purchaseUrl}/edit/${id}`, product, { headers: headers })
    .pipe(map((res: Response) => res));
  }

  deletePurchase(id): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.delete(`${this.purchaseUrl}/${id}`, { headers: headers })
    .pipe(map((res: Response) => res));
  }


  getPurchaseList(): Observable<[]> {
    return this.http.get<[]>(`${this.purchaseUrl}`, { headers: { 'Creator': '' }});
  }
}
