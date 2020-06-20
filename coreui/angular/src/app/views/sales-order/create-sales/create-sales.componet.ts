import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { Resume, Experience, Products, Skill } from '../sales';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { DataService } from '../../../auth/data.service';
import { ProfileUser } from '../../profile/profile'
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Industries, Industry } from './data';
import { AuthService } from '../../../auth/auth.service';
import { CustomersService } from '../../customers/customers.service';
import { Customers } from '../../customers/customers';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-sales-create',
  templateUrl: './create-sales.component.html',
  styleUrls: ['./create-sales.component.css']
})
export class CreateSalesOrderComponent implements OnInit, AfterViewInit, OnDestroy {

  resume = new Resume();
  custMode = false;
  products = ['Mango', 'Apple', 'Orange', 'Grapes'];

  PaymentType = ['Card', 'Check', 'Cash', 'Credit'];

  ammount: number;

  Users: ProfileUser;

  total: number;



  salesOrderDate;
  shipmentDate;

 protected customers: Customers[] = [];
  protected industries: Industry[] = Industries;


  public bankFilterCtrl: FormControl = new FormControl();
  public customerCtrl: FormControl = new FormControl();

  public filteredBanks: ReplaySubject<Industry[]> = new ReplaySubject<Industry[]>(1);
  public filteredCustomers: ReplaySubject<Customers[]> = new ReplaySubject<Customers[]>(1);
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  @ViewChild('singleSelect', { static: true }) singlSelect: MatSelect;

  protected _onDestroy = new Subject<void>();
  protected onDestroy = new Subject<void>();



  constructor(private toastr: ToastrService,
    private customerService: CustomersService,
     private _service: AuthService,
     private router: Router,
     private service: DataService,
     private datePipe: DatePipe,
    ) {
    this.resume = JSON.parse(sessionStorage.getItem('resume')) || new Resume();
    if (!this.resume.experiences || this.resume.experiences.length === 0) {
      this.resume.experiences = [];
      this.resume.experiences.push(new Experience());
    }
    if (!this.resume.products || this.resume.products.length === 0) {
      this.resume.products = [];
      this.resume.products.push(new Products());
    }
    if (!this.resume.skills || this.resume.skills.length === 0) {
      this.resume.skills = [];
      this.resume.skills.push(new Skill());
    }


  }






  ngOnInit() {
    this.Users = this._service.getUser();
    this.customerService.getCustomerList().subscribe(data => {
      this.customers = data;
      this.filteredCustomers.next(data.slice());
    });

    this.filteredBanks.next(this.industries.slice());

    // listen for search field value changes
    this.bankFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks();
      });
      this.customerCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterCustomers();
      });
  }



  ngAfterViewInit() {
    // this.setInitialValue();
    // // this.setInitialCustomerValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  onSelect(id: string) {
    let selectedCustomer: Customers;
   selectedCustomer = this.customers.find(cust => cust._id === id);
   if (selectedCustomer) {
     this.custMode = true;
   }
   this.resume.address = `${selectedCustomer.address},${selectedCustomer.state}, ${selectedCustomer.city}`
   this.resume.contactNo = selectedCustomer.contactNumber;
   this.resume.name = selectedCustomer.customerName;
  }


  // protected setInitialValue() {
  //   this.filteredBanks
  //     .pipe(take(1), takeUntil(this._onDestroy))
  //     .subscribe(() => {
  //       this.singleSelect.compareWith = (a: Industry, b: Industry) => a && b && a.id === b.id;
  //     });
  // }

  // protected setInitialCustomerValue() {
  //   this.filteredCustomers
  //     .pipe(take(1), takeUntil(this.onDestroy))
  //     .subscribe(() => {
  //       this.singleSelect.compareWith = (a: Customers, b: Customers) => a && b && a._id === b._id;
  //     });
  // }


  protected filterBanks() {
    if (!this.industries) {
      return;
    }
    // get the search keyword
    let search = this.bankFilterCtrl.value;
    if (!search) {
      this.filteredBanks.next(this.industries.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredBanks.next(
      this.industries.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
    );
  }


  protected filterCustomers() {
    if (!this.customers) {
      return;
    }
    // get the search keyword
    let search = this.customerCtrl.value;
    if (!search) {
      this.filteredCustomers.next(this.customers.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredCustomers.next(
      this.customers.filter(cust => cust.customerName.toLowerCase().indexOf(search) > -1)
    );
  }




  getUser() {
    const ls = localStorage.getItem('user');
    this.Users = JSON.parse(ls);
  }

  // onCustomerClick(id){
  //   this._service.editCustomer(id)
  //   .subscribe(
  //     data => {
  //       console.log(data)
  //       this.resume.address = data.address;
  //       this.resume.contactNo = data.contactNumber
  //       this.resume.contactNo = data.contactNumber

  //     }
  //   )
  // }

  invoiceGenerated(){

    const data = {
    customerName: this.resume.name,
      customerNo: this.resume.contactNo,
      customerEmail: this.resume.email,
      salesOrderNo: this.resume.saleOrderNo,
      salesOrderDate: this.resume.salesOrderDate,
      shipmentDate: this.resume.shipmentDate,
      salesPerson: this.resume.salesPerson,
      userId:this.Users.id

    };

   this.service.createSales(data)
   .subscribe(data => console.log(data), error => console.log(error));
   this.gotoList();
  }

  gotoList() {
    // this.router.navigateByUrl('/customers');
    this.router.navigateByUrl('/salesorder')
  .then(() => {
    this.toastr.success('Sales Order Added Successfully');
  });
}

  addExperience() {
    this.resume.experiences.push(new Experience());
  }

  addEducation() {
    this.resume.products.push(new Products());
  }

  generatePdf(action = 'open') {
    console.log(pdfMake);
    const documentDefinition = this.getDocumentDefinition();

    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;

      default: pdfMake.createPdf(documentDefinition).open(); break;
    }

  }


  resetForm() {
    this.resume = new Resume();
  }

  getDocumentDefinition() {
     this.salesOrderDate = this.datePipe.transform(this.resume.salesOrderDate,'dd-MM-yyyy');
    this.shipmentDate = this.datePipe.transform(this.resume.shipmentDate,'dd-MM-yyyy');
    return {

      content: [
        {
          columns : [
              { qr: 'Customer Name : ' + this.resume.name
               + ', Contact No : ' + this.resume.contactNo
               + ', Email: ' + this.resume.email  +
               ', Sales Person: ' + this.resume.salesPerson ,
               fit : 100, margin: [0, 0, 0, 0], alignment: 'right', },

              // {
              // text: `(${this.resume.name})`,
              // alignment: 'right',
              // }
          ]
        },
        {
          text: `SALES  ORDER`,
          bold: true,
          fontSize: 20,
          alignment: 'center',
          wordspacing: 10,
          margin: [0, 0, 50, 5]
        },
        {
          text: `Order No :  ${this.resume.saleOrderNo}`,
          alignment: 'right',
          fontSize: 18,
          margin: [0, 10, 0, 0 ]
        },
        {

        },
        // {
        //   text: ` #95/4, PERUNDURAI ROAD, NEAR SKODA SHOWROOM , SENGODAMPALAYAM, THINDAL(P.O), ERODE-638012, TAMILNADU
        //   Ph No: +91 81488 93530, +91 93444 34888 `,
        //   bold: true,
        //   fontSize: 7,
        //   alignment: 'center',
        //   margin: [0, 0, 0, 20]
        // },
        {
          columns: [
            [{
              text: ' Customer Name: ' + this.resume.name,
              style: 'name'
            },
            {
              text: 'Address : ' + this.resume.address
            },
            {
              text: 'Email : ' + this.resume.email,
            },
            {
              text: 'Contant No : ' + this.resume.contactNo ,
            },
            {
              text: '----------------------------------------- ',
            },

          {
            text: `Order Date :  ${this.salesOrderDate       } `,
            alignment: 'left',
            fontSize: 11,
            bold: true,
            margin: [0, 5, 5,0]
          },
          {
            text: `Shipment Date: ${this.shipmentDate}`,
            alignment: 'left',
            bold: true,
            fontSize: 11,
            margin: [0, 5, 5,0]
          },
          {
            text: `Payment Type : ${this.resume.paymentType}`,
            alignment: 'left',
            fontSize: 11,
            bold: true,
            margin: [0, 5, 5, 0]
          },

            // {
            //   text: 'Techinfo: ' + this.resume.socialProfile,
            //   link: this.resume.socialProfile,
            //   color: 'blue',
            // }
            ],
            // {
            //   columns: [
            //     [,



            //     ],

            //   ]
            // },

          ]
        },

        // {
        //   text: 'Skills',
        //   style: 'header'
        // },
        // {
        //   columns : [
        //     {
        //       ul : [
        //         ...this.resume.skills.filter((value, index) => index % 3 === 0).map(s => s.value)
        //       ]
        //     },
        //     {
        //       ul : [
        //         ...this.resume.skills.filter((value, index) => index % 3 === 1).map(s => s.value)
        //       ]
        //     },
        //     {
        //       ul : [
        //         ...this.resume.skills.filter((value, index) => index % 3 === 2).map(s => s.value)
        //       ]
        //     }
        //   ]
        // },
        // {
        //   text: 'Experience',
        //   style: 'header'
        // },
        // this.getExperienceObject(this.resume.experiences),

        {
          text: 'Product Details',
          style: 'header'
        },
        this.getEducationObject(this.resume.products),
       {
        table: {
          widths: [470, 47,],
          body: [
            [{
              text: 'Sub Total ₹',
              alignment: 'center',
              style: 'tableHeader'
            },
            {
              text: ` ${this.total}`,
              style: 'tableHeader'
            },

            ],


          ]
        }
      },
      {
        table: {
          widths: [470, 47,],
          body: [
            [{
              text: ' Total ₹',
              alignment: 'center',
              style: 'tableHeader'
            },
            {
              text: ` ${this.total}`,
              style: 'tableHeader'
            },

            ],


          ]
        }
      },


        // {
        //   columns: [

        //     [{
        //       text:` `,
        //       style:'subtotal'
        //     },{
        //       text: ` Sub Total :   ${this.ammount}`,
        //       alignment: 'right',
        //       margin: [10, 0, 5,30]
        //     },
        //     {
        //       text: `Total :     ${this.ammount}`,
        //       alignment: 'right',
        //       margin: [10, 0, 0,50]
        //     },
        //     ],

        //   ]
        // },



        {
          text: '(Assuring you of our best services at all times.)',
          alignment: 'left',
          margin: [0, 150, 0, 10],
          // style: 'header'
        },
        // {
        //   text: ` ${this.resume.otherDetails} `
        // },
        {
          text: `Sales Person,

          (${this.resume.salesPerson})	`,
          style: 'sign'
        },

      ],

      info: {
        title: this.resume.name + '_SalesOrder',
        author: this.resume.name,
        subject: 'Sales Order',
        keywords: 'Sales Order',
      },
        styles: {
          header: {
            fontSize: 13,
            bold: true,
            margin: [0, 20, 0, 10],
          },
          name: {
            fontSize: 12,
            bold: true
          },
          jobTitle: {
            fontSize: 10,
            bold: true,
            italics: true
          },
          sign: {
            margin: [0, 0, 0, 100],
            alignment: 'right',
            italics: true
          },
          tableHeader: {
            bold: true,
          },
          subtotal: {
            margin: [0, 0, 0, 0],
            alignment: 'right',
            italics: true
          },
        }
    };
  }

  getExperienceObject(experiences: Experience[]) {

    const exs = [];

    experiences.forEach(experience => {
      exs.push(
        [{
          columns: [
            [{
              text: experience.jobTitle,
              style: 'jobTitle'
            },
            {
              text: experience.employer,
            },
            {
              text: experience.jobDescription,
            }],
            {
              text: 'Experience : ' + experience.experience + ' Months',
              alignment: 'right'
            }
          ]
        }]
      );
    });

    return {
      table: {
        widths: ['*'],
        body: [
          ...exs
        ]
      }
    };
  }

  onInput(event,products){
    console.log(products)
    products.forEach(d => {
      d.ammount=((d.quantity!=null?d.quantity:0)*(d.rate!=null?d.rate:0))
      // d.ammount= d.ammount-(d.ammount*(d.discount!=null?d.discount:0)/100)
      d.ammount = (d.ammount -(d.discount!=null?d.discount:0));
    });
    this.total=products.reduce((sum, item) => +sum + +item.ammount, 0);
  }

  getEducationObject(products: Products[]) {
    return {
      table: {
        widths: [300 , '*', '*', '*','*'],
        body: [
          [{
            text: 'Item & Description',
            style: 'tableHeader'
          },
          {
            text: 'Qty (kg)',
            style: 'tableHeader'
          },
          {
            text: 'Rate ₹',
            style: 'tableHeader'
          },
          {
            text: 'Discount ₹',
            style: 'tableHeader'
          },
          {
            text: 'Amount ₹',
            style: 'tableHeader'
          },

          ],
          ...products.map(ed => {

            return  [ed.itemDetails, ed.quantity, ed.rate, ed.discount, ed.ammount]

          })

        ]
      }
    };
  }

  getProfilePicObject() {
    if (this.resume.profilePic) {
      return {
        image: this.resume.profilePic ,
        width: 55,
        alignment : 'center'
      };
    }
    return null;
  }

  fileChanged(e) {
    const file = e.target.files[0];
    this.getBase64(file);
  }

  getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      this.resume.profilePic = reader.result as string;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  addSkill() {
    this.resume.skills.push(new Skill());
  }



}
