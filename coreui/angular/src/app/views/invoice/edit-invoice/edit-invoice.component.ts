import { Component, OnInit } from '@angular/core';
import { Resume, Experience, Invoice, Skill } from '../create-invoice/invoice';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.css']
})
export class EditInvoiceComponent  {

  resume = new Resume();

  products = ['Mango', 'Apple', 'Orange', 'Grapes'];

  constructor() {
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
    sessionStorage.setItem('resume', JSON.stringify(this.resume));
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
                  text: 'DATE : ' + this.resume.date,
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
                text: 'Sub Total',
                alignment: 'center',
                style: 'tableHeader'
              },
              {
                text: ` ${this.resume.name}`,
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
                text: ' Total',
                alignment: 'center',
                style: 'tableHeader'
              },
              {
                text: ` ${this.resume.name}`,
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
            text: 'Qty',
            style: 'tableHeader'
          },
          {
            text: 'Rate',
            style: 'tableHeader'
          },
          {
            text: 'Discount',
            style: 'tableHeader'
          },
          {
            text: 'Amount',
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
