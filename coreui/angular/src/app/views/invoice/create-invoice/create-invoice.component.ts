import { Component, OnInit } from '@angular/core';
import { Resume, Experience, Invoice, Skill } from './invoice';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Router } from '@angular/router';
import { DataService } from '../../../auth/data.service';
import { ToastrService } from 'ngx-toastr';
import { ProfileUser } from '../../profile/profile';
import { DatePipe } from '@angular/common';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css']
})
export class CreateInvoiceComponent implements OnInit {


  Users: ProfileUser;

  total:number;

  resume = new Resume();

  products = ['Mango', 'Apple', 'Orange', 'Grapes'];

  Date;

  constructor( private toastr: ToastrService,  private router: Router, private service: DataService,private datePipe: DatePipe) {
    this.resume = JSON.parse(sessionStorage.getItem('resume')) || new Resume();
    if (!this.resume.experiences || this.resume.experiences.length === 0) {
      this.resume.experiences = [];
      this.resume.experiences.push(new Experience());
    }
    if (!this.resume.invoice || this.resume.invoice.length === 0) {
      this.resume.invoice = [];
      this.resume.invoice.push(new Invoice());
    }
    if (!this.resume.skills || this.resume.skills.length === 0) {
      this.resume.skills = [];
      this.resume.skills.push(new Skill());
    }


  }

  ngOnInit(){
    this.getUser()
  }

  invoiceGenerated(){

    const data = {
      customerName: this.resume.name,
      customerNo: this.resume.contactNo,
      customerEmail: this.resume.email,
      customerGstn: this.resume.gstIn,
      invoiceNumber: this.resume.invoiceNumber,
      invoiceDate: this.resume.date,
      userId:this.Users.id

    };

   this.service.createInvoice(data)
   .subscribe(data => console.log(data), error => console.log(error));
   this.gotoList();
  }

  getUser() {
    const ls = localStorage.getItem('user');
    this.Users = JSON.parse(ls);
  }

  gotoList() {
    // this.router.navigateByUrl('/customers');
    this.router.navigateByUrl('/invoice')
  .then(() => {
    this.toastr.success('Invoice Added Successfully');
  });
}

  addExperience() {
    this.resume.experiences.push(new Experience());
  }

  addEducation() {
    this.resume.invoice.push(new Invoice());
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
    this.Date = this.datePipe.transform(this.resume.date,'dd-MM-yyyy');
    sessionStorage.setItem('resume', JSON.stringify(this.resume));
    console.log(this.resume);
    return {

      content: [
        [
          this.getProfilePicObject()
        ],
        {
          text: 'Mass Agro',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 10]
        },
        {
          text: ` #95/4, PERUNDURAI ROAD, NEAR SKODA SHOWROOM , SENGODAMPALAYAM, THINDAL(P.O), ERODE-638012, TAMILNADU
          Ph No: +91 81488 93530, +91 93444 34888 `,
          bold: true,
          fontSize: 7,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            [{
              text: ' Name: ' + this.resume.name,
              style: 'name'
            },
            {
              text: 'Address : ' + this.resume.address
            },
            {
              text: 'Email : ' + this.resume.email,
            },
            {
              text: 'Contant No : ' + this.resume.contactNo,
            },
            {
              text: 'Techinfo: ' + this.resume.socialProfile,
              link: this.resume.socialProfile,
              color: 'blue',
            }
            ],
            {
              columns: [
                [{
                  text: ' GSTIN: ' + this.resume.gstIn,
                  alignment: 'right',
                  margin: [0, 0, 0,0]
                },
                {
                  text: 'INVOICE : ' + this.resume.invoiceNumber,
                  alignment: 'right',
                  margin: [0, 0, 0,0]
                },
                {
                  text: 'DATE : ' + this.Date,
                  alignment: 'right',
                  margin: [0, 0, 0,0]
                },
                {
                  text: 'TRANSPORT : ' + this.resume.transport,
                  alignment: 'right',
                  margin: [0, 0, 0,0]
                },
                {
                  text: 'LR NO : ' + this.resume.lrNo,
                  alignment: 'right',
                  margin: [0, 0, 0,0]
                },
                {
                  text: 'FROM : ' + this.resume.from,
                  alignment: 'right',
                  margin: [0, 0, 0,0]
                },
                {
                  text: 'TO : ' + this.resume.to,
                  alignment: 'right',
                  margin: [0, 0, 0,0]
                },

                ],

              ]
            },

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
        this.getEducationObject(this.resume.invoice),
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
        {
          text: 'Bank Details',
          style: 'header'
        },
        {
          text: ` BANK DETAILS:
          NAME: MAAS AGRO
          ACCOUNT NUMBER : 919020034692939
          BANK: AXIS BANK
          BRANCH: ERODE
          IFSC CODE: UTIB0000118`
        },
        {
          text: 'FOR MAAS AGRO LLP.,',
          style: 'sign'
        },
        {
          columns : [
              { qr: this.resume.name + ', Contact No : ' + this.resume.contactNo, fit : 100 },
              {
              text: `(${this.resume.name})`,
              alignment: 'right',
              }
          ]
        }
      ],
      info: {
        title: this.resume.name + '_INVOICE',
        author: this.resume.name,
        subject: 'INVOICE',
        keywords: 'INVOICE, ONLINE INVOICE',
      },
        styles: {
          header: {
            fontSize: 12,
            bold: true,
            margin: [0, 20, 0, 10],
          },
          name: {
            fontSize: 12,
            bold: true
          },
          jobTitle: {
            fontSize: 14,
            bold: true,
            italics: true
          },
          sign: {
            margin: [0, 50, 0, 10],
            alignment: 'right',
            italics: true
          },
          tableHeader: {
            bold: true,
          }
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

  onInput(event,invoice){
    console.log(invoice)
    invoice.forEach(d => {
      d.ammount = ((d.quantity != null ? d.quantity : 0) * ( d.rate != null ? d.rate : 0));
      // d.ammount= d.ammount-(d.ammount*(d.discount!=null?d.discount:0)/100)
      d.ammount = (d.ammount - ( d.discount != null ? d.discount :0));
    });
    this.total = invoice.reduce((sum, item) => +sum + +item.ammount, 0);
  }

  getEducationObject(invoice: Invoice[]) {
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
          ...invoice.map(ed => {

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
