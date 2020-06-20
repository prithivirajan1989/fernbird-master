import { Component, OnInit } from '@angular/core';
import { Resume, Experience, Delivery, Skill } from './challan';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ProfileUser } from '../../profile/profile';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DataService } from '../../../auth/data.service';
import { DatePipe } from '@angular/common';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-create-delivery-challan',
  templateUrl: './create-delivery-challan.component.html',
  styleUrls: ['./create-delivery-challan.component.css']
})
export class CreateDeliveryChallanComponent implements OnInit {
  Users: ProfileUser;
  
  resume = new Resume();
  total:number;

  products = ['Mango', 'Apple', 'Orange', 'Grapes'];

  challantypes = ['Supply', 'Job Work', 'Product Delivery'];

  ammount: number;
  
  challanDate;

  constructor(private toastr: ToastrService,  private router: Router, private service: DataService,private datePipe: DatePipe) {
    this.resume = JSON.parse(sessionStorage.getItem('resume')) || new Resume();
    if (!this.resume.experiences || this.resume.experiences.length === 0) {
      this.resume.experiences = [];
      this.resume.experiences.push(new Experience());
    }
    if (!this.resume.delivery || this.resume.delivery.length === 0) {
      this.resume.delivery = [];
      this.resume.delivery.push(new Delivery());
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
      challanNo: this.resume.challanNo,
      challanDate: this.resume.challanDate,
      challanType: this.resume.challanType,
      userId:this.Users.id
     
    };

   this.service.createChallan(data)
   .subscribe(data => console.log(data), error => console.log(error));
   this.gotoList();
  }

  getUser() {
    const ls = localStorage.getItem('user');
    this.Users = JSON.parse(ls);
  }

  gotoList() {
    // this.router.navigateByUrl('/customers');
    this.router.navigateByUrl('/deliverychallan')
  .then(() => {
    this.toastr.success('Delivery Challan Added Successfully');
  });
}


  addExperience() {
    this.resume.experiences.push(new Experience());
  }

  addEducation() {
    this.resume.delivery.push(new Delivery());
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
    this.challanDate = this.datePipe.transform(this.resume.challanDate,'dd-MM-yyyy');
    sessionStorage.setItem('resume', JSON.stringify(this.resume));
    return {
      
      content: [
        {
          columns : [
              { qr: 'Customer Name : ' + this.resume.name + ', Contact No : ' + this.resume.contactNo + ', Email: ' + this.resume.email, fit : 80,
              margin: [0, 0, 0, 0], alignment: 'right', }
              
              // {
              // text: `(${this.resume.name})`,
              // alignment: 'right',
              // }
          ]
        },
       
        {
          text: `DELIVERY CHALLAN`,
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [30, 50, 50, 50]
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
              text: ' Delivery To: ',
              style: 'name'
            },{
              text: ' Name: ' + this.resume.name,
             
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
            
            // {
            //   text: 'Techinfo: ' + this.resume.socialProfile,
            //   link: this.resume.socialProfile,
            //   color: 'blue',
            // }
            ],
            {
              columns: [
                [{
                  text: ` Challan No:   ${this.resume.challanNo}`,
                  alignment: 'right',
                  style: 'name',
                  margin: [3, 3, 5, 5]
                },
                {
                  text: `Challan Date :  ${this.challanDate}`,
                  alignment: 'right',
                  style: 'name',
                  margin: [3, 3, 5, 5]
                },
                {
                  text: `Challan Type : ${this.resume.challanType}`,
                  alignment: 'right',
                  style: 'name',
                  margin: [3, 3, 5, 20]
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
        this.getEducationObject(this.resume.delivery),

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
          text: 'Terms & Conditions',
          style: 'header',
          alignment: 'left',
          margin: [0, 50, 0, 20],
        },
        {
          text: ` ${this.resume.otherDetails} `,
          alignment: 'left',
        },
        {
          text: `Authorized Signature ____________	`,
          style: 'sign',
         
         
        },
       
      ],
      info: {
        title: this.resume.name + '_Delivery_Challan',
        author: this.resume.name,
        subject: 'Delivery Challan',
        keywords: 'Delivery, ONLINE Delivery',
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
            margin: [100, 100, 0, 100],
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

  onInput(event,delivery){
    console.log(delivery)
    delivery.forEach(d => {
      d.ammount=((d.quantity!=null?d.quantity:0)*(d.rate!=null?d.rate:0))
      // d.ammount= d.ammount-(d.ammount*(d.discount!=null?d.discount:0)/100)
      d.ammount = (d.ammount -(d.discount!=null?d.discount:0));
    });
    this.total=delivery.reduce((sum, item) => +sum + +item.ammount, 0);
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

  getEducationObject(delivery: Delivery[]) {

    // delivery.forEach(d => {
    //   d.ammount=((d.quantity!=null?d.quantity:0)*(d.rate!=null?d.rate:0))
    //   d.ammount= d.ammount-(d.ammount*(d.discount!=null?d.discount:0)/100)
    // });
    // this.total=delivery.reduce((sum, item) => +sum + +item.ammount, 0);

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
          ...delivery.map(ed => {
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
