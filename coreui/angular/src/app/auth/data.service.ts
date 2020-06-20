import { Customers } from './../views/customers/customers';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable,  } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable, throwError, Subject } from 'rxjs';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Products } from '../views/products/products';
import { Supliers } from '../views/suplier/suplier';
import { Purchase } from '../views/purchase/purchase';
import { Stocks } from '../views/stock-register/stock';
import { AuthService } from './auth.service';
import { ProfileUser } from '../views/profile/profile';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class DataService  {
 Pdf = new Subject<Blob>();





  private invoiceUrl = 'http://localhost:3000/api/invoice';

  private deliveryUrl = 'http://localhost:3000/api/delivery';

  private billsUrl = 'http://localhost:3000/api/bill';

  private salessUrl = 'http://localhost:3000/api/sales';

  private userurl = 'http://localhost:3000/user/created';

  private userUrl = 'http://localhost:3000/user';




  constructor(  private http: HttpClient) {  }




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

   // get all users





  updateUser(id: any, user: any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.put(`${this.userUrl}/edit/${id}`, user, { headers: headers })
    .pipe(map((res: Response) => res));
  }




  createInvoice(invoice): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.post(`${this.invoiceUrl}`, invoice)
    .pipe(map((res: Response) => res));
  }


  editInvoice(id:any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.get(`${this.invoiceUrl}/${id}` , { headers: headers })
    .pipe(map((res: Response) => res));
  }

  updateInvoice(id: any, product: any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.put(`${this.invoiceUrl}/edit/${id}`, product, { headers: headers })
    .pipe(map((res: Response) => res));
  }

  deleteInvoice(id): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.delete(`${this.invoiceUrl}/${id}`, { headers: headers })
    .pipe(map((res: Response) => res));
  }


  getInvoiceList(userId): Observable<[]> {
    return this.http.get<[]>(`${this.invoiceUrl}/${userId}`);
  }

  /// deliveryChallan


  createChallan(delivery): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.post(`${this.deliveryUrl}`, delivery)
    .pipe(map((res: Response) => res));
  }


  editChallan(id:any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.get(`${this.deliveryUrl}/${id}` , { headers: headers })
    .pipe(map((res: Response) => res));
  }

  updateChallan(id: any, product: any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.put(`${this.deliveryUrl}/edit/${id}`, product, { headers: headers })
    .pipe(map((res: Response) => res));
  }

  deleteChallan(id): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.delete(`${this.deliveryUrl}/${id}`, { headers: headers })
    .pipe(map((res: Response) => res));
  }


  getChallanList(userId): Observable<[]> {
    return this.http.get<[]>(`${this.deliveryUrl}/${userId}`);
  }

  /// bills api call


  createBill(bill): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.post(`${this.billsUrl}`, bill)
    .pipe(map((res: Response) => res));
  }


  editBill(id:any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.get(`${this.billsUrl}/${id}` , { headers: headers })
    .pipe(map((res: Response) => res));
  }

  updateBill(id: any, product: any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.put(`${this.billsUrl}/edit/${id}`, product, { headers: headers })
    .pipe(map((res: Response) => res));
  }

  deleteBill(id): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.delete(`${this.billsUrl}/${id}`, { headers: headers })
    .pipe(map((res: Response) => res));
  }


  getBillsList(userId): Observable<[]> {
    return this.http.get<[]>(`${this.billsUrl}/${userId}`);
  }

  /// sales order api
  createSales(bill): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.post(`${this.salessUrl}`, bill)
    .pipe(map((res: Response) => res));
  }


  editSales(id:any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.get(`${this.salessUrl}/${id}` , { headers: headers })
    .pipe(map((res: Response) => res));
  }

  updateSales(id: any, product: any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.put(`${this.salessUrl}/edit/${id}`, product, { headers: headers })
    .pipe(map((res: Response) => res));
  }

  deleteSales(id): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.delete(`${this.salessUrl}/${id}`, { headers: headers })
    .pipe(map((res: Response) => res));
  }


  getSalessList(userId): Observable<[]> {
    return this.http.get<[]>(`${this.salessUrl}/${userId}`);
  }
}



