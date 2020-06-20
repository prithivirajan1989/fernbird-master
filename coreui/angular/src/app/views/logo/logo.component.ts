import { ProfileUser} from '../profile/profile';
import { Component, OnInit, ViewChild  } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {

  

  private editProfileEmail: boolean = false;
  private editProfileName: boolean = false;
  private editProfileNumber: boolean = false;
  private editProfilePassword: boolean = false;
  private editProfileImg: boolean = false;
  private editbutton: boolean = true;
  private editProfile: boolean = true;

  Users: ProfileUser;



  selectedFile: File;
  brandUrl: string;




  constructor(private _auth: AuthService,
   
     private toastr: ToastrService) { }

  ngOnInit() {
     this.getUser();
     this.getImg();
   
  }

 getUser() {
   const ls = localStorage.getItem('user');
   this.Users = JSON.parse(ls);
   console.log(this.Users);
 }

 getImg() {
  if (this.Users.brandlogo == null) {
    this.brandUrl = '../../../assets/img/avatars/5.jpg';

   } else {
     this.brandUrl = this.Users.brandlogo;
   }
 }





onProfileClose() {
  
  this.editProfileImg = false;
  this.editbutton = true;
}

onProfileEdit() {
 
  this.editProfileImg = false;
  this.editbutton = true;
}

onProfileImageEdit() {
  this.editProfileImg = true;
  this.editbutton = false;
}



onFileSelected(file: FileList) {

  this.selectedFile = file.item(0);

  console.log(this.selectedFile);

   const reader = new FileReader();
   reader.onload = (event: any) => {
    this.brandUrl = event.target.result;
   };
   reader.readAsDataURL(this.selectedFile);

}


onProfileImageSubmit() {

  const id = this.Users.id;

  this._auth.updateBrandlogo(id, this.selectedFile)
  .subscribe(
  data => {
    console.log(data);

    if (data.success) {
      localStorage.removeItem('user');
      this._auth.storeProfileData(data.user);
      this.toastr.success(data.msg);
      this.ngOnInit();
      this.brandUrl = data.user.brandlogo;
      window.location.reload();
      this.onProfileClose();
        } else {
          this.toastr.error(data.msg);
        
  }
  });
}




}
