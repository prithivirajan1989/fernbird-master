import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class SupliersSercice {

  private suplierUrl = 'http://localhost:3000/supliers';
  constructor(private http: HttpClient) {}



  createSuplier(suplier: any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.post(`${this.suplierUrl}`, suplier , { headers: { 'Creator': '' }})
    .pipe(map((res: Response) => res));
  }


  editSuplier(id:any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.get(`${this.suplierUrl}/${id}` , { headers: headers })
    .pipe(map((res: Response) => res));
  }

  updateSuplier(id: any, product: any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.put(`${this.suplierUrl}/edit/${id}`, product, { headers: headers })
    .pipe(map((res: Response) => res));
  }

  deleteSuplier(id): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.delete(`${this.suplierUrl}/${id}`, { headers: headers })
    .pipe(map((res: Response) => res));
  }


  getSupliersList(): Observable<[]> {
    return this.http.get<[]>(`${this.suplierUrl}` , { headers: { 'Creator': '' }});
  }
}
