import { ProfileUser } from './profile';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ValidateService } from './../../auth/validate.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  @ViewChild('primaryModal') public primaryModal: ModalDirective;

   editProfileEmail: boolean = false;
   editProfileName: boolean = false;
   editProfileNumber: boolean = false;
   editProfilePassword: boolean = false;
   editProfileImg: boolean = false;
   editbutton: boolean = true;
   editProfile: boolean = true;


  Users: ProfileUser;
  password: string;
  loading = true;
  selectedFile: File;
  imgUrl: string;

  constructor(
    private _auth: AuthService,
    private validate: ValidateService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.editbutton = false;
    this.Users = this._auth.getUser();
    this.getImg();

  }



  getImg() {
    if (this.Users.image == null) {
      this.imgUrl = '../../../assets/img/avatars/5.jpg';
    } else {
      this.imgUrl = this.Users.image;
    }
    this.loading = false;
  }

  onProfileClose() {
    this.editProfileNumber = false;
    this.editProfileName = false;
    this.editProfileEmail = false;
    this.editProfilePassword = false;
    this.editProfile = true;
    this.editProfileImg = false;
    this.editbutton = false;
  }

  onProfileEdit() {
    this.editProfileNumber = true;
    this.editProfileName = true;
    this.editProfileEmail = true;
    this.editProfilePassword = true;
    this.editProfile = false;
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
      this.imgUrl = event.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  onProfileImageSubmit() {
    this._auth.updateProfileImage(this.Users.id, this.selectedFile).subscribe((data) => {
      console.log(data);

      if (data.success) {
        localStorage.removeItem('user');
        this._auth.storeProfileData(data.user);
        this.toastr.success(data.msg);
        this.ngOnInit();
        this.imgUrl = data.user.image;
        window.location.reload();

        this.onProfileClose();
      } else {
        this.toastr.error(data.msg);
      }
    });
  }

  onProfileSubmit() {
    const user = {
      name: this.Users.name,
      email: this.Users.email,
      mobilenumber: this.Users.mobilenumber,
      password: this.password,
    };

    const id = this.Users.id;

    if (!this.validate.validateProfile(user)) {
      this.toastr.warning('Please fill all fields');

      return false;
    }

    if (!this.validate.validateEmail(user.email)) {
      this.toastr.warning('Please Enter A Valid Email');

      return false;
    }

    this._auth.updateProfile(id, user).subscribe((data) => {
      if (data.success) {
        localStorage.removeItem('user');
        this._auth.storeProfileData(data.user);
        this.toastr.success(data.msg);

        this.onProfileClose();
        this.primaryModal.hide();
        this.ngOnInit();
      } else {
        this.toastr.error(data.msg);
      }
    });
  }
}
