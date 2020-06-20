import { Component, OnInit, Input } from '@angular/core';
import { Products } from '../../products/products';
import { Stocks } from '../../stock-register/stock';
import { Customers } from '../../customers/customers';
import { CustomersService } from '../../customers/customers.service';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styleUrls: ['./doughnut.component.css'],

})
export class DoughnutComponent implements OnInit {
@Input() products: Products[];
@Input() stocks: Stocks[];
@Input() customersStates = [];
  public doughnutChartLabels: string[] = ['Total Products', 'Total Stocks', 'Total Customers',];
  public doughnutChartData: number[] = [];
  public doughnutChartType = 'doughnut';
  constructor(private customerService: CustomersService) { }

  ngOnInit(): void {
   console.log()
    this.doughnutChartData.push(30);
    this.doughnutChartData.push(20);


  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
