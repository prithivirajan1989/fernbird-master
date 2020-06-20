import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class StocksService {
  private stockUrl = 'http://localhost:3000/stocks';

  constructor(private http: HttpClient) {}

  createStock(stock:any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.post(`${this.stockUrl}`, stock, { headers: { 'Creator': '' }})
    .pipe(map((res: Response) => res));
  }


  editStock(id:any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.get(`${this.stockUrl}/${id}` , { headers: headers })
    .pipe(map((res: Response) => res));
  }

  updateStock(id: any, product: any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.put(`${this.stockUrl}/edit/${id}`, product, { headers: headers })
    .pipe(map((res: Response) => res));
  }

  deleteStock(id): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.delete(`${this.stockUrl}/${id}`, { headers: headers })
    .pipe(map((res: Response) => res));
  }


  getStockList(): Observable<[]> {
    return this.http.get<[]>(`${this.stockUrl}`, { headers: { 'Creator': '' }});
  }
}
