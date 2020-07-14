import {Injectable} from '@angular/core'
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Products } from './products';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  private products: Products[] = [];
  private productUrl = 'http://localhost:3000/products';

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

  createProducts(product): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.post(`${this.productUrl}`, product,  { headers: { 'Creator': '' }})
    .pipe(map((res: Response) => res));
  }


  editProducts(id:any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.get(`${this.productUrl}/${id}` , { headers: headers })
    .pipe(map((res: Response) => res));
  }

  updateProducts(id: any, product: any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.put(`${this.productUrl}/edit/${id}`, product, { headers: headers })
    .pipe(map((res: Response) => res));
  }

  deleteProducts(id): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.delete(`${this.productUrl}/${id}`, { headers: headers })
    .pipe(map((res: Response) => res));
  }


  // getProductsList(): Observable<Products[]> {
  //   return this.http.get<Products[]>(`${this.productUrl}`,  { headers: { 'Creator': '' }});
  // }

  getProductsList(): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.productUrl}` , { headers: { 'Creator': '' }}).pipe(tap(products => {
    this.products = this.products;

    }));
  }

}
