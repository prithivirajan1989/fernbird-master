import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DataService } from '../../auth/data.service';
import { ToastrService } from 'ngx-toastr';
import { ProfileUser } from '../profile/profile';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { Industries, Industry } from './data';

@Component({
  selector: 'app-org-profile',
  templateUrl: './org-profile.component.html',
  styleUrls: ['./org-profile.component.css']
})
export class OrgProfileComponent implements OnInit, AfterViewInit {
   editProfileImg: boolean = false;
   editbutton: boolean = true;


  selectedFile: File;
  brandUrl: string;

  Users: ProfileUser;
  
  detailForm: FormGroup;

   bussinessLocations = ['India'];

  industries: Industry[] = Industries;


  public bankFilterCtrl: FormControl = new FormControl();

  public filteredBanks: ReplaySubject<Industry[]> = new ReplaySubject<Industry[]>(1);

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  protected _onDestroy = new Subject<void>();

  @Input() placeholderLabel = '';
 
  @Input() noEntriesFoundLabel = 'No data Found';
  
  constructor(  private toastr: ToastrService,private fb: FormBuilder,private actiroute: ActivatedRoute, private router: Router, private service: DataService) {
    this.detailForm = this.fb.group({
      organizationName: ['', Validators.required],
      industry: ['', Validators.required],
      bussinessLocation: ['', Validators.required],
      street1: ['', Validators.required],
      street2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
      phone: ['', Validators.required],
    });
    
    this.getUser();
   }
  ngOnInit() {
    

    // load the initial bank list
    this.filteredBanks.next(this.industries.slice());

    // listen for search field value changes
    this.bankFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks();
      });

  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  protected setInitialValue() {
    this.filteredBanks
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: Industry, b: Industry) => a && b && a.id === b.id;
      });
  }


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




  


  

  onProfileSubmit() {

    // const user = {
    //   name: this.Users.name,
    //   email: this.Users.email,
    //   mobilenumber: this.Users.mobilenumber,
    //   password: this.password
  
    // };
  
    // const id = this.Users.id;
  
  
  console.log(this.detailForm.value)
  
    // this.service.updateProfile(id, user)
    // .subscribe(
    //   data => {
  
    //     if (data.success) {
    //           localStorage.removeItem('user');
    //           this.toastr.success(data.msg);
    //           this.ngOnInit();
    //         } else {
    //           this.toastr.error(data.msg);
            
    //   }
    //   });
  
  
  
  }





  onFileSelected(file: FileList) {

    this.selectedFile =  file.item(0);
  
    console.log(this.selectedFile);
  
     const reader = new FileReader();
     reader.onload = (event: any) => {
      this.brandUrl = event.target.result;
     };
     reader.readAsDataURL(this.selectedFile);
  
  }

  
 getUser() {
  const ls = localStorage.getItem('user');
  this.Users = JSON.parse(ls);
  this.brandUrl = this.Users.brandlogo;
}

onProfileImageEdit() {
  this.editProfileImg = true;
  this.editbutton = false;
}


onProfileClose() {
  
  this.editProfileImg = false;
  this.editbutton = true;
  this.brandUrl = this.Users.brandlogo;
  
}




  

}
