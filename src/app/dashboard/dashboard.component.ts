import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/modal/user';
import { users } from '../shared/modal/users';
import { BehaviorSubject } from 'rxjs';
import { URLHelper } from '../URLHelper';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Role } from '../shared/modal/role';
import { environment } from 'src/environments/environment';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  urls = URLHelper.urls;
  currentURLs = URLHelper.urls;
  public form:FormGroup;
  userdetails:any;
  currentUser:users;
  usernames;
  // logoType= environment.logo;
  // imgSrc;
  constructor(private auth: AuthService,private fb:FormBuilder) {
    // if(this.logoType === '3QiLabs'){
    //  this.imgSrc='../../assets/3qi-labs-logo.png';
    // }else{
    //    this.imgSrc='../../assets/ooba-logo.svg';
    // }
      // console.log('con');
      // this.userdetails = this.auth.userDetails();
      // console.log('from services',this.userdetails.json().user_type);
     this.userdetails= JSON.parse(localStorage.getItem('users'));
    //  console.log('sssw',this.userdetails);
  
  }
  selectedIndex = -1;

  setSelected(id: number) {
    this.selectedIndex = id;
    // console.log(this.selectedIndex);
  }

  get isAdmin() {
    // console.log('is aadmin',this.userdetails.user_type);

    return this.userdetails.user_type === 'admin';
    
  }

  get isNormal(){
    return this.userdetails.user_type === 'normal';
  }

  ngOnInit() {
    // console.log('ngon');
    this.usernames=this.userdetails.username
  }

  onSignout(): boolean {
    this.auth.logoutUser();
    // console.log('signed out');
    return false;
  }
}
