import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserIdleService } from 'angular-user-idle';
import {ToastrService} from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap';
import { AuthService } from './auth/auth.service';
@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: `
  <div bsModal #dangerModal="bs-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-danger" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">You are inactive!!</h4>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" (click)="cancel()">Cancel</button>
        <button type="button" (click)="stop()" class="btn btn-danger">Active</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div>
             <router-outlet></router-outlet>
             `
})
export class AppComponent implements OnInit {
  @ViewChild('dangerModal') public dangerModal: ModalDirective;
  constructor(private router: Router,private userIdle: UserIdleService, private toastr: ToastrService, private _auth: AuthService,) { }

  ngOnInit() {

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });


     // Start watching when user idle is starting.
     this.userIdle.onTimerStart().subscribe(count => console.log(count));

     // Start watch when time is up.
     this.userIdle.onTimeout().subscribe(() => {
      this.dangerModal.show();

    });
   }

   stop() {
    this.dangerModal.hide();
    this.userIdle.stopTimer();


   }

  //  stopWatching() {
  //    this.userIdle.stopWatching();
  //  }

  //  startWatching() {
  //    this.userIdle.startWatching();
  //  }

  //  restart() {
  //    this.userIdle.resetTimer();
  //  }

   cancel(){
     this._auth.logout();
     this.dangerModal.hide();

   }
  }



