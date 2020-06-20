import {Injectable} from '@angular/core';
import { Customers } from './customers';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root',
})

export class CustomersService {
  private customers: Customers[] = [];

  // customer api call

  private customerurl = 'http://localhost:3000/customers';

  constructor(private http: HttpClient) { }

  public exportAsExcelFile(json: any[], excelFileName: string): void {

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet',worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    // const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, '' + new Date().getTime() + EXCEL_EXTENSION);
  }




  createCustomer(customers): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.post(`${this.customerurl}`, customers, { headers: { 'Creator': '' }})
    .pipe(map((res: Response) => res));
  }


  editCustomer(id: string): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.get(`${this.customerurl}/${id}` , { headers: headers })
    .pipe(map((res: Response) => res));
  }

  updateCustomer(id: string, user: any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.put(`${this.customerurl}/edit/${id}`, user, { headers: headers })
    .pipe
    (map(
      (res: Response) => res));
  }

  deleteCustomer(id: string): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.delete(`${this.customerurl}/${id}`, { headers: headers })
    .pipe(map((res: Response) => res));
  }


  getCustomerList(): Observable<Customers[]> {
    return this.http.get<Customers[]>(`${this.customerurl}` , { headers: { 'Creator': '' }}).pipe(tap(customers => {
    this.customers = customers;

    }));
  }


}
